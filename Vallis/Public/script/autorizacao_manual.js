/**
 *------------------------------------------------------------------------------------------------------------
 **************************** Inicio da regra de negócio de Autorização Manual. ******************************
 *------------------------------------------------------------------------------------------------------------
 */

// Botão que abre o modal do 'card__manul'
  function OpenModalManual() {
    const modalManual = document.querySelector('.modal__manual');
    const noneCards = document.querySelectorAll('.conteiner__option');

    modalManual.style.display = 'flex';
    noneCards.forEach(card => {
      card.style.display = 'none';
    });
  }

// Botão que fecha o modal do 'card__manual'
  function CloseModalManual() {
    const closeManual = document.querySelector('.modal__manual');
    const noneCards = document.querySelectorAll('.conteiner__option');

    closeManual.style.display = 'none';
    noneCards.forEach(card => {
      card.style.display = 'flex';
    });
  }

// Método GET para pegar a lista de loja cadastradas.
  async function getStore() {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        authorizationToken: token,
        'content-type': 'application/json'
      };
      const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/loja', { headers });
      return response.data;
    } catch (error) {
      if (error.response)
        console.error(error.response.data.message);
      else
        console.error('Erro:', error);
//      alert('Erro ao retornar fornecedor');
      throw error;
    }
  }

// Preenche um elemento '<select__store>' gerando um dropdown com a lista de lojas.
  async function storeListSelect(storesSelect) {
    try {
      const stores = await getStore();

      stores.forEach(function (loja) {
        const option = document.createElement('option');
        option.value = loja.id_loja;
        option.textContent = `${loja.sigla} - ${loja.descricao}`;

        storesSelect.appendChild(option);
      });

      return storesSelect;
    } catch (error) {
      console.error('Erro ao preencher lista de lojas:', error);
      throw error;
    }
  }

// Método GET para pegar a lista de fornecedores.
  async function getSupplier() {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        authorizationToken: token,
        'Content-type': 'application/json'
      };
      const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers });
      return response.data;

    } catch (error) {
      if (error.response)
        console.error(error.response.data.message);
      else
        console.error('Erro:', error);
//      alert('Erro ao retornar fornecedor');
      throw error;
    }
  }

// Preenche um elemento '<select__supplier>' gerando um dropdown com a lista de fornecedores.
  async function supplierListSelect(suppliersSelect) {
    try {
      const suppliers = await getSupplier();

      suppliers.forEach(function (fornecedor) {
        const option = document.createElement('option');
        option.value = fornecedor.id_fornecedor;
        option.textContent = fornecedor.razao_social;

        suppliersSelect.appendChild(option);
      });

      return suppliersSelect;

    } catch (error) {
      console.error('Erro ao preencher lista de fornecedores:', error);
      throw error;
    }
  }

// Máscara do input número da nota fiscal numberNF__input.
  function applyNFMask() {
    const numberNF = document.querySelectorAll('.numberNF__input');
    numberNF.forEach(input => {
      input.addEventListener('input', function (e) {
        let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 9); // Ensure the value is at most 9 digits long

        if (value.length > 3) {
          value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if (value.length > 6) {
          value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }

        input.value = value;
      });
    });
  }

// Máscara do input valor da nota fiscal value__input.
  function applyCurrencyMask() {
    const reaisInputs = document.querySelectorAll('.value__input');

    reaisInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        let value = this.value.replace(/\D/g, '');
        value = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        this.value = value;
      });
    });
  }
 
// Variável global para armazenar o arquivo PDF em Base64
  let pdfBase64 = null;

// Botão que abre o explorador de arquivos do OS para seleção de arquivo PDF.
  function fileUpload() {
    const button = document.querySelector('.export__button');
    const fileNameElement = document.querySelector('.file__name');

    button.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const fileName = file.name;
                if (fileName.endsWith('.pdf')) {
                    fileNameElement.textContent = fileName; // Exibir o nome do arquivo no elemento <div class="file__name"></div>

                    // Converter o arquivo para Base64
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        pdfBase64 = event.target.result.split(',')[1]; // Armazenar apenas os dados Base64 (remover cabeçalho "data:application/pdf;base64,")
                    };
                    reader.readAsDataURL(file);
                } else {
//                    alert('Por favor, selecione um arquivo com a extensão .pdf.');
                }
            }
        });

        input.click();
    });
  }


// Popula um elemento select com opções de 1 até numberOfOptions.
  function populateSelect(selectElement, numberOfOptions) {
    for (let i = 1; i <= numberOfOptions; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i}x`;
      selectElement.appendChild(option);
    }
  }

// DOMCONTENTLOADED 
    document.addEventListener("DOMContentLoaded", async function () {
    document.querySelector('.card__manual').addEventListener('click', OpenModalManual);
    document.querySelector('.close__modal__manual').addEventListener('click', CloseModalManual);

// Máscara número da nota fiscal
      applyNFMask();
// Máscara valor
      applyCurrencyMask();
// Upload de PDF
      fileUpload();

    window.Supplier = await getSupplier();
    window.Store = await getStore();

// Preenche o dropdown com as lojas.
      const storesSelect = document.querySelector('.select__store');
    if (storesSelect) {
      await storeListSelect(storesSelect);
    }

// Preenche o dropdown com os fornecedores.
      const suppliersSelect = document.querySelector('.select__supplier');
    if (suppliersSelect) {
      await supplierListSelect(suppliersSelect);
    }

// Quantidade de parcelas.
      const selectElements = document.getElementsByClassName('payment__input');
    Array.prototype.forEach.call(selectElements, function (selectElement) {
      populateSelect(selectElement, 12);
    });

// Lógica da duplicata para adicionar linhas para valores parcelados.
  const select = document.querySelector('.payment__input');
  const container = document.querySelector('.element__duplicate');
  const paymentComponent = document.querySelector('.manual__element');

  if (select && container && paymentComponent) {
    // Define a altura base original do paymentComponent em rem
    const baseHeight = 23; // 23rem

    select.addEventListener('change', () => {
      const count = parseInt(select.value);

      container.innerHTML = '';

      for (let i = 1; i <= count; i++) {
        const component = document.createElement('duplicate-payment');
        container.appendChild(component);

        component.setPaymentNumber(i, count);
      }

      // Calcula a nova altura total em rem
      const additionalHeight = count * 6.5; // Altura adicional total em rem
      const newHeight = baseHeight + additionalHeight;

      // Ajusta a altura do paymentComponent em rem
      paymentComponent.style.height = newHeight + 'rem';
    });

    // Dispara o evento 'change' inicialmente para configurar a interface com o valor inicial do select
    select.dispatchEvent(new Event('change'));
  } else {
    console.error('Elementos select, container ou paymentComponent não foram encontrados.');
  }
  
// Adicionar event listener para button__confirm
      const logButton = document.querySelector('.button__confirm');
    if (logButton) {
    logButton.addEventListener('click', async () => {
      const paymentComponents = document.querySelectorAll('duplicate-payment');
      const payments = [];
  
// Obtendo os valores dos selects de loja e fornecedor
      const selectedStoreId = document.querySelector('.select__store').value;
      const selectedSupplierId = document.querySelector('.select__supplier').value;
  
// Obtendo os valores da nota fiscal
      const notaFiscalNumero = document.querySelector('.numberNF__input').value.replace(/\D/g, '');
      const notaFiscalValor = parseFloat(document.querySelector('.value__input').value.replace(/[^\d.,]/g, '').replace(',', '.'));
      const notaFiscalDataEmissao = document.querySelector('.data__input').value;
  
// Criando o objeto de nota fiscal
      const notaFiscal = {
        numero: notaFiscalNumero,
        valor: notaFiscalValor,
        data_emissao: notaFiscalDataEmissao,
        base64_arquivo: pdfBase64  // Aqui vai o arquivo da nota fiscal, se houver
      };
  
// Criando o objeto com dados de fornecedor, loja, nota fiscal e duplicatas
      const paymentInfo = {
        id_fornecedor: selectedSupplierId,
        id_loja: selectedStoreId,
        nota_fiscal: notaFiscal,
        duplicata: []
      };
  
// Adicionando as duplicatas
      paymentComponents.forEach(component => {
        const details = component.getPaymentDetails();
        const duplicateData = {
          numero: parseInt(details.paymentOutput.split('/')[0]),
          valor: parseFloat(details.valueInput.replace(/[^\d.,]/g, '').replace(',', '.')),
          data_vencimento: details.dueDate,
          base64_arquivo: details.base64FileContent  
        };
        paymentInfo.duplicata.push(duplicateData);
      });
  
      payments.push(paymentInfo);
  
      const jsonOutput = JSON.stringify(payments, null, 2);
      console.log(jsonOutput);

    });
  } else {
    console.error('Elemento button__confirm não foi encontrado.');
  }

});

/**
 *------------------------------------------------------------------------------------------------------------
 ************************** Conclusão da regra de negócio de Autorização Manual. *****************************
 *------------------------------------------------------------------------------------------------------------
 */
