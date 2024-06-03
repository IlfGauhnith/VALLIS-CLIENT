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
//
async function supplierListSelect(supplierSelect) {

  Array.from(window.Supplier)
      .forEach(function (fornecedor) {
          const option = document.createElement('option');
          option.value = fornecedor.id_fornecedor;
          option.textContent = fornecedor.razao_social;

          
          supplierSelect.appendChild(option);
        });
        
        return supplierSelect
        
      }
      
      
      document.addEventListener("DOMContentLoaded", async function () {
        document.querySelector('.card__manual').addEventListener('click', OpenModalManual);
        document.querySelector('.close__modal__manual').addEventListener('click', CloseModalManual);
        
        window.Supplier = await getSupplier();
});