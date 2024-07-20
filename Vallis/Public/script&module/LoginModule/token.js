export function armazenarToken(token) {
    const expirationTime = new Date().getTime() + (60 * 60 * 1000);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('tokenStorage', expirationTime);
  
    setTimeout(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenStorage');
      exibirModalLogout();
    }, 60 * 60 * 1000);
  }
  
  function exibirModalLogout() {
    const modalLogoutComponent = document.querySelector('logout-warning');
    if (modalLogoutComponent) {
      const modalLogout = modalLogoutComponent.shadowRoot.querySelector('.modal__logout');
      if (modalLogout) {
        modalLogout.style.display = 'block';
      }
    }
  
    document.querySelectorAll('.conteiner__list').forEach(element => element.style.display = 'none');
    document.querySelectorAll('.conteiner__option').forEach(element => element.style.display = 'none');
  }

