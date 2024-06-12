class DuplicatePayment extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =
                `<style>
/* Esse CSS pertece a um componente.
 * O componente ele é responsavel pelas linhas geradas pelo select de parcelas
 * a quantidade de parcelas será igual a quantidade de componentes renderizados
 * dentor da duplicada.
 */ 

 /* Elemento total da linha */
  .component__paymentComponent {
    width: 79rem;
    height: 6rem;
    background-color: #ddb892;
    margin: 0.5rem;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

/* Todos os elementos que incluie Value => */
.element__valueComponent {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-left: 1.4rem;
}

.value__titleComponent {
  font-size: 1.5rem;
  color: #7f5539;
  margin-left: 1rem;
}

.value__nfComponent {
  align-items: center;
  background-color: #ede0d4;
  border: none;
  display: flex;
  font-size: 1.2rem;
  height: 2.5rem;
  justify-content: center;
  outline: none;
  width: 10rem;
  border-radius: 1.2rem;

}

.value__inputComponent {
  width: 85%;
  color: #7f5539;
  border: none;
  background-color: #ede0d4;
  outline: none;

  font-size: 1.2rem;
  font-family: "Fredoka", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.value__inputComponent::placeholder {
  color: #7f5539;
  
  font-size: 1.2rem;
  font-family: "Fredoka", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

/* Todos os elementos que incluie file => */
.element__fileComponent {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-left: 2rem;
}

.file__titleComponent {
  font-size: 1.5rem;
  color: #7f5539;
  margin-left: 1rem;
}

.export__fileComponent {
  align-items: center;
  background-color: #ede0d4;
  border: none;
  display: flex;
  font-size: 1.5rem;
  height: 2.5rem;
  justify-content: flex-start;
  outline: none;
  width: 20rem;
  border-radius: 1.2rem;
}

.export__buttonComponent {
  background-color: #9c6644;
  color: #ede0d4;
  width: 6rem;
  height: 100%;
  border-radius: 1.2rem 0rem 0rem 1.2rem;
  outline: none;
  border: none;

  font-size: 1.2rem;
  font-family: "Fredoka", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.export__buttonComponent:hover {
  font-size: 1.3rem;
  background-color: #7a5237;
  transition: 0.4s;
  transition-delay: 0.2s ;
}

.file__containerComponent {
  width: 13.5rem; 
  height: 100%; 
  overflow: hidden; 
  position: relative; 
  display: flex;
  align-items: center;
  margin-left: 0.2rem;
}

.file__nameComponent {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  position: absolute; 
  color: #7f5539;
  } 
  
.file__nameComponent:hover {
  animation: slideText 8s linear infinite;    
}

@keyframes slideText {
  0% {
    transform: translateX(0); 
  }
  100% {
    transform: translateX(-100%); 
  }
}

/* Todos os elementos que incluie Data => */  
.element__dataComponent {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin: 0.5rem;
}

.data__titleComponent {
  font-size: 1.5rem;
  color: #7f5539;
  margin-left: 1rem;
}

.data__docComponent {
  align-items: center;
  background-color: #ede0d4;
  border: none;
  display: flex;
  font-size: 1.5rem;
  height: 2.5rem;
  justify-content: center;
  outline: none;
  width: 13rem;
  border-radius: 1.2rem;
}

.data__inputComponent {
  border: none;
  background-color: #ede0d4;
  width: 88%;
  outline: none;
  color: #7f5539;

  font-size: 1.2rem;
  font-family: "Fredoka", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.data__inputComponent::-webkit-calendar-picker-indicator {
  filter: invert(40%);
}

/* Todos os elementos que incluie Payment => */
.element__paymentComponent {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-left: 2rem;
}

.payment__titleComponent {
  font-size: 1.5rem;
  color: #7f5539;
  margin-left: -0.3rem;
}

.number__paymentComponent {
  align-items: center;
  background-color: #ede0d4;
  border: none;
  display: flex;
  font-size: 1.2rem;
  height: 2.5rem;
  justify-content: center;
  outline: none;
  width: 5.5rem;
  border-radius: 1.2rem;
}

.payment__inputComponent {
  width: 80%;
  color: #7f5539;
  border: none;
  background-color: #ede0d4;
  outline: none;
  border-radius: 1.2rem 0 0 1.2rem;
  margin-left: 0.5rem;

  font-size: 1.2rem;
  font-family: "Fredoka", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
/* Final do CSS do componente para a duplicata */
                </style>
                <div class="component__paymentComponent">
                    <div class="element__valueComponent">
                        <div class="value__titleComponent">Valor da NF</div>
                        <div class="value__nfComponent">
                            <input class="value__inputComponent" type="text" placeholder="R$ 0,00">
                        </div>
                    </div>
                    <div class="element__fileComponent">
                        <div class="file__titleComponent">Exportar arquivo</div>
                        <div class="export__fileComponent">
                            <button class="export__buttonComponent" type="file" accept="application/pdf">Arquivo</button>
                            <div class="file__containerComponent">
                                <div class="file__nameComponent"></div>
                            </div>
                        </div>
                    </div>
                    <div class="element__dataComponent">
                        <div class="data__titleComponent">Vencimento</div>
                        <div class="data__docComponent">
                            <input class="data__inputComponent" type="date">
                        </div>  
                    </div>
                    <div class="element__paymentComponent">
                        <div class="payment__titleComponent">Parcela:</div>
                        <div class="number__paymentComponent">
                            <div class="payment__inputComponent"></div>
                        </div>
                    </div>
                </div>`;
              }

              connectedCallback() {
                  // Emitindo um evento customizado quando o componente é conectado
                  const event = new CustomEvent('componentLoaded');
                  this.dispatchEvent(event);
              }
          }
          
          customElements.define('duplicate-payment', DuplicatePayment);