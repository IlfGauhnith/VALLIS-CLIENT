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
//DATA DE EMISSÃO 

// Input do campo valor R$ da Autorização de Pagamento.
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

  

// Ao carregar o DOM abre e fecha o modal manual e Armazena a lista de fornecedores e lojas. 
  document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector('.card__manual').addEventListener('click', OpenModalManual);
  document.querySelector('.close__modal__manual').addEventListener('click', CloseModalManual);
//data
//Mascara valor 
  applyCurrencyMask();
//Upload de PDF
  fileUpload();
  
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
    
  });
  

/**
*------------------------------------------------------------------------------------------------------------
************************** Conclusão da regra de negócio de Autorização Manual. *****************************
*------------------------------------------------------------------------------------------------------------ 
*/
