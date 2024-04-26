document.addEventListener("DOMContentLoaded", function() {

    const addButton = document.querySelector('.add__supplier');
  
    const modal = document.querySelector('.modal');
  
    const closeButton = document.querySelector('.botao__fechar');
  
    addButton.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  function mascara_CNPJ(value) {

    value = value.replace(/[^0-9]/g, '');
    if (value.length > 14) {
        value = value.slice(0, 14);
    }

    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    
    return value;
}

document.addEventListener('DOMContentLoaded', function() {
    const CNPJInput = document.getElementById('mascara__CNPJ');

    CNPJInput.addEventListener('input', function() {
        
        let currentValue = CNPJInput.value;

        let mascaraValue = mascara_CNPJ(currentValue);
        
        CNPJInput.value = mascaraValue;
    });
});

function limitarCaracteres() {
  var maxLength = 200;
  var inputElement = document.getElementById("razao__social");

  if (inputElement) {
      inputElement.addEventListener("input", function() {
          if (this.value.length > maxLength) {
              this.value = this.value.slice(0, maxLength);
          }
      });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  limitarCaracteres(); 
});

//************************************** POST API  ****************************************/


document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("add").addEventListener("click", function() {
      const cnpj = document.getElementById("mascara__CNPJ").value;
      const razao__social = document.getElementById("razao__social").value;
      
      const data = {
          cnpj: cnpj,
          razaoSocial: razao__social
      };

      axios.post('', data)
      .then(function(response) {
        
          document.getElementById("mascara__CNPJ").value = "";
          document.getElementById("razao__social").value = "";
          alert('Fornecedor adicionado com sucesso!');
          console.log(response.data);
      })
      .catch(function(error) {
          console.error('Erro:', error);
          alert('Erro ao adicionar fornecedor');
      });
  });
});