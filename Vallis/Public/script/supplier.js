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
  