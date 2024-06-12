/**
 *------------------------------------------------------------------------------------------------------------
 **************************** Inicio da regra de negócio de Autorização Manual. ******************************
 *------------------------------------------------------------------------------------------------------------ 
 */

// Botão que abre o modal do 'card__manul'
  function OpenModalManual() {
    const modalManual = document.querySelector('.modal__manual');
    const noneCards = document.querySelectorAll('.card__NFE , .card__XML , .card__manual');

      modalManual.style.display = 'flex';
      noneCards.forEach(card => {
        card.style.display = 'none';
      });
  }
// Botão que fecha o modal do 'card__manual'
  function CloseModalManual() {
    const closeManual = document.querySelector('.modal__manual');
    const noneCards = document.querySelectorAll('.card__NFE , .card__XML , .card__manual');

      closeManual.style.display = 'none';
      noneCards.forEach(card => {
          card.style.display = 'flex';
      });
  }
// Medoto Get para pegar a lista de loja cadastradas.
  async function getStore() {
    try {
        const token = sessionStorage.getItem('token');
        const headers = { 
          authorizationToken:token,
          'content-type': 'application/json'
        };
        const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/loja',  {headers: headers });
        return response.data;
    } catch (error) {
      if (error.response)
        console.error(error.response.data.message);
      else
        cosole.error('Erro:', error);
      alert('Erro ao retornar fornecedor');
      throw error;
    }
  }
// Preenche um elemento '<select__store>' gerando um dropdown com a lista de lojas.
  async function storeListSelect(storesSelect) {

    Array.from(window.Store)
      .forEach(function (loja) {
        const option = document.createElement('option');
        option.value = loja.id_loja;
        option.textContent = `${loja.sigla} - ${loja.descricao}`;

        storesSelect.appendChild(option);
      })
        return storesSelect;
  }

// Medoto GET para pegar a lista de fornecedores
  async function getSupplier() {
    try {
        const token = sessionStorage.getItem('token');
        const headers = {
          authorizationToken: token,
          'Content-type': 'application/json'
        }; 
        const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers });
        return response.data;
      
    } catch (error) {
      if (error.response)
        console.error(error.response.data.message);
      else 
        console.error('Erro:', error);
      alert('Erro ao retornar fornecedor');
      throw error; 
    }
  }
// Preenche um elemento '<select__supplier>' gerando um dropdown com a lista de fornecedores.
  async function supplierListSelect(suppliersSelect) {

    Array.from(window.Supplier)
      .forEach(function (fornecedor) {
        const option = document.createElement('option');
        option.value = fornecedor.id_fornecedor;
        option.textContent = fornecedor.razao_social;

        suppliersSelect.appendChild(option);
      });
    return suppliersSelect

  }

// Mascara do input número da nota fiscal numberNF__input.
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


//DATA DE EMISSÃO 

// Mascara do input valor do nota fiscal value__input.
  function applyCurrencyMask() {
    const reaisInputs = document.querySelectorAll('.value__input');

    reaisInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = (value/100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

            this.value = value;
        });
    });
  }

// Botão que abre o Explorador de Arquivos do OS
  function fileUpload() {
    document.querySelector('.export__button').addEventListener('click', function() {
      const input = document.createElement('input');
      input.type = 'file';

 
      input.addEventListener('change', function() {
        const file = input.files[0]; 
        const fileName = file.name; 

        
        if (fileName.endsWith('.pdf')) {
         
          document.querySelector('.file__name').textContent = fileName;
        } else {
          alert('Por favor, selecione um arquivo com a extensão .pdf.');
        }
      });

      input.click();
    });
  }
// Botão que seleciona o números de parcelas
  function populateSelect(selectElement, numberOfOptions) {
      for (let i = 1; i <= numberOfOptions; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = `${i}x`;
          selectElement.appendChild(option);
      }
  }

// Ao carregar o DOM abre e fecha o modal manual e Armazena a lista de fornecedores e lojas. 
  document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector('.card__manual').addEventListener('click', OpenModalManual);
  document.querySelector('.close__modal__manual').addEventListener('click', CloseModalManual);

// Mascara número da nota fiscal
  applyNFMask();
// Data
// Mascara valor 
  applyCurrencyMask();
//Upload de PDF
  fileUpload();
//Números de parcelas
 
  
    window.Supplier = await getSupplier();
    window.Store = await getStore();
    
// Preenche o dropdown com os fornecedores.
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
  Array.prototype.forEach.call(selectElements, function(selectElement) {
      populateSelect(selectElement, 12);
  });

// Logica da duplicata para adicionar linha pra valores parcelados.
// Seleciona os elementos HTML pelas classes
    const select = document.querySelector('.payment__input');
    const container = document.querySelector('.element__duplicate');
    const paymentComponent = document.querySelector('.manual__element');

// Verifica se os elementos existem
      if (select && container && paymentComponent) {
// Define a altura original do elemento paymentComponent
  const originalHeight = parseFloat(window.getComputedStyle(paymentComponent).height) / 10; // Convertendo para rem

// Adiciona um ouvinte de evento 'change' ao select
        select.addEventListener('change', () => {
    const count = parseInt(select.value); // Obtém o valor selecionado
      container.innerHTML = ''; // Limpa os componentes anteriores

// Se count for maior que 1, adiciona os componentes adicionais
      if (count > 1) {
        let additionalHeight = 0; // Inicializa a altura adicional como 0
        for (let i = 2; i <= count; i++) {
          const component = document.createElement('duplicate-payment');
          container.appendChild(component);
          additionalHeight += 6.5; // Adiciona +7rem para cada componente adicional
        }

// Define a altura do elemento paymentComponent somando a altura original com a altura adicional
          paymentComponent.style.height = originalHeight + additionalHeight + 'rem';
        }else {
// Se count for 1 ou menor, mantém a altura original
          paymentComponent.style.height = originalHeight + 'rem';
        }
      });

// Dispara o evento 'change' quando a página carrega para definir o estado inicial
      select.dispatchEvent(new Event('change'));
    } else {
      console.error('Elementos select, container ou paymentComponent não foram encontrados.');
    }
});  
/**
*------------------------------------------------------------------------------------------------------------
************************** Conclusão da regra de negócio de Autorização Manual. *****************************
*------------------------------------------------------------------------------------------------------------ 
*/


