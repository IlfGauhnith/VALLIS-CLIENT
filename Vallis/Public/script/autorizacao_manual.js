
function OpenModalManual() {
  const modalManual = document.querySelector('.modal__manual');
  const noneCards = document.querySelectorAll('.card__NFE , .card__XML , .card__manual');

    modalManual.style.display = 'flex';
    noneCards.forEach(card => {
      card.style.display = 'none';
    });
}

function CloseModalManual() {
  const closeManual = document.querySelector('.modal__manual');
  const noneCards = document.querySelectorAll('.card__NFE , .card__XML , .card__manual');
    
    closeManual.style.display = 'none';
    noneCards.forEach(card => {
        card.style.display = 'flex';
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    document.querySelector('.card__manual').addEventListener('click', OpenModalManual);
    document.querySelector('.close__modal__manual').addEventListener('click', CloseModalManual);
    
});