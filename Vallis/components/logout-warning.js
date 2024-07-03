class LogoutAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `<style>
    
/**/
  .modal__logout {
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    height: 100%; 
    left: 0; 
    position: fixed; 
    top: 0; 
    width: 100%; 
  }

/* Elemento modal logout expirado. */
  .modal__elementLogout {
    align-items: center;
    animation: animation__modal__session__expired 2s cubic-bezier(0.645, 0.045, 0.355, 1.000) both;
    background: linear-gradient(to left top, #ddb892, #ede0d4);
    border-radius: 1.2rem;
    border: 0.1rem solid #9c6644;
    display: flex;
    flex-direction: column;
    height: 15rem;
    margin: 25% auto; 
    padding: 1.5;
    width: 30rem;

    font-size: 1.2rem;
    color: #7f5539;
    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  
/* Animação  exibida ao abrir o modal sessão expirada. */
    @keyframes animation__modal__session__expired {
      0% {
        transform: translateY(75rem);
      }
      50% {
        transform: translateY(-8rem) ;
      }
      100% {
        transform: translateY(0rem);
      }
    }
/**/
  .element__warningLogout {
    background: linear-gradient(to right bottom, #795137, #9c6644);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10rem;
    border-radius: 1rem 1rem 0 0;
    font-size: 2rem;
    color: #ddb892;
    flex-direction: column;
    letter-spacing: 0.2rem;
  }

  .sub__text {
    margin-top: 1.2rem ;
    font-size: 1rem;
    color: #ddb892;
    flex-direction: column;
    letter-spacing: 0.1rem;
  }

  .element__buttonLogout {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
    width: 100%;
    height: 3rem;
  }

  .back__loginPage{
    --color: #9c6644;
    align-items: center;
    background: transparent;
    border-radius: 1.2rem;
    border: 0.2rem solid #9c6644;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 2.9rem; 
    margin: 0.375rem 0.375rem 0 0;
    overflow: hidden;
    position: relative;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    width: 8rem; 
    z-index: 1;
  
    color: #9c6644;
    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
  }
  
  .back__loginPage::before {
    position: absolute;
    content: "";
    background: var(--color);
    width: 11rem;
    height: 9rem;
    z-index: -1;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: 0.5s all;
  }
  
  .back__loginPage:hover {
    color: #ddb892;
    border: 0.2rem solid var(--color);
    transition: 0.3s;
    transition-delay: 0.2s;
    background-color: #9c6644;
  }
  
  .back__loginPage:hover::before {
    top: -30px;
    left: -30px;
  }
    
</style> 
      <div class="modal__logout">
        <div class="modal__elementLogout">
          <div class="element__warningLogout">
            <span>Sessão expirada</span>
            <span class="sub__text">Click em 'OK' para voltar a pagina de login</span>
          </div>
          <div class="element__buttonLogout">
            <button class="back__loginPage">OK</button>
          </div>
        </div>
       </div>`;
  }

  connectedCallback() {
    // Adiciona um event listener para o evento 'logoutClicked'
    document.addEventListener('logoutClicked', () => {
        this.logoutSession();
    });

    // Adiciona um event listener para o botão dentro do shadow DOM
    this.shadowRoot.querySelector('.back__loginPage').addEventListener('click', () => {
        this.backLoginPage();
    });
}

logoutSession() {
    // Executa a ação de logout
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenStorage');
    this.showLogoutModal(); // Mostra o modal de logout
    window.location.href = 'login_page.html';
}

backLoginPage() {
    // Redireciona para a página de login
    window.location.href = 'login_page.html';
}

showLogoutModal() {
    // Exibe o modal de logout alterando o estilo do elemento .modal__logout
    this.shadowRoot.querySelector('.modal__logout').style.display = 'block';
}
}
  customElements.define('logout-warning', LogoutAlert);

