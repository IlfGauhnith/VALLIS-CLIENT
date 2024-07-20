class confirmationDeleteSupplier extends HTMLElement {
    constructor() {
      super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = `<style>

/* Modal de confirmar ao deletar fornecedor. */
  .modal__delet {
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    height: 100%; 
    left: 0; 
    position: fixed; 
    top: 0; 
    width: 100%; 
  }

/* Elemento modal deletar fornecedor. */
  .modal__elementDelet {
    align-items: center;
    animation: animation__modal__excluir__supplier 2s cubic-bezier(0.645, 0.045, 0.355, 1.000) both;
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
  
/* Animação  exibida ao abrir o modal deletar fornecedor. */
    @keyframes animation__modal__excluir__supplier {
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
  .element__warningDelet {
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

/**/
  .element__questInf {
    width: 90%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }

/**/
  .element__buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
    width: 100%;
    height: 3rem;
  }
/**/
  .confirm__delet{
    --color: #b22525;
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

  .confirm__delet::before {
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

  .confirm__delet:hover {
    color: #ddb892;
    border: 0.2rem solid var(--color);
    transition: 0.3s;
    transition-delay: 0.2s;
    background-color: #b22525;
  }

  .confirm__delet:hover::before {
    top: -30px;
    left: -30px;
  }

/**/
  .close__delet{
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
  
  .close__delet::before {
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
  
  .close__delet:hover {
    color: #ddb892;
    border: 0.2rem solid var(--color);
    transition: 0.3s;
    transition-delay: 0.2s;
    background-color: #9c6644;
  }
  
  .close__delet:hover::before {
    top: -30px;
    left: -30px;
  }
</style>

<!-- MODAL DE CONFRIMAÇÃO PARA EXCLUIR FORNECEDOR. -->
  <div id="modal__delet" class="modal__delet">
    <div class="modal__elementDelet">
      <div class="element__warningDelet">Aviso
        <div class="element__questInf">
          <span>Excluir fornecedor  <span id="name__supplierDelet"></span>?</span>
        </div>
      </div>
      <div class="element__buttons">
        <input type="hidden" id="id__supplierDelet">
        <button class="confirm__delet">Excluir</button>
        <button class="close__delet">Cancelar</button>
      </div>
    </div>
  </div>
`;
    }
}   
    customElements.define('confirmation-delete-supplier', confirmationDeleteSupplier);