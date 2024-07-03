// Função para verificar o token armazenado na sessionStorage
function verificarToken() {
  const token = sessionStorage.getItem('token');
  const tokenExpiration = sessionStorage.getItem('tokenExpiration');

  if (!token || !tokenExpiration) {
    // Token ausente ou expirado, exibir modal ou mensagem
    exibirModalLogout();
  } else {
    const now = new Date().getTime();
    if (now >= tokenExpiration) {
      // Token expirado, remover token e exibir modal de logout
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');
      exibirModalLogout();
    } else {
      // Token ainda válido, ocultar modal ou mensagem (se necessário)
      ocultarModalLogout();
    }
  }
}

// Função para exibir modal ou mensagem de logout expirado
function exibirModalLogout() {
  const modalLogoutComponent = document.querySelector('logout-warning');
  if (modalLogoutComponent) {
    const modalLogout = modalLogoutComponent.shadowRoot.querySelector('.modal__logout');
    if (modalLogout) {
      modalLogout.style.display = 'block';
    }
  }

  const containerList = document.querySelectorAll('.conteiner__list');
  const containerOption = document.querySelectorAll('.conteiner__option');

  containerList.forEach(element => {
    element.style.display = 'none';
  });

  containerOption.forEach(element => {
    element.style.display = 'none';
  });
}

// Função para ocultar modal ou mensagem de logout expirado
function ocultarModalLogout() {
  const modalLogoutComponent = document.querySelector('logout-warning');
  if (modalLogoutComponent) {
    const modalLogout = modalLogoutComponent.shadowRoot.querySelector('.modal__logout');
    if (modalLogout) {
      modalLogout.style.display = 'none';
    }
  }

  const containerList = document.querySelectorAll('.conteiner__list');
  const containerOption = document.querySelectorAll('.conteiner__option');

  containerList.forEach(element => {
    element.style.display = 'flex'; // ou 'block', dependendo do estilo desejado
  });

  containerOption.forEach(element => {
    element.style.display = 'flex'; // ou 'block', dependendo do estilo desejado
  });
}

// Verificar o token ao carregar a página
  document.addEventListener('DOMContentLoaded', verificarToken);

// Verificar o token em intervalos regulares (opcional para garantir verificação contínua)
  setInterval(verificarToken, 10000); // Verificar a cada 10 segundos
