
//Este componete define a classe em JavaScript `SideBarNav`, que herda a funcionalidade de `HTMLElement`.
  class SideBarNav extends HTMLElement {
//Esse construtor está chamando a classe pai.
    constructor() {
      super();
    }

/*
  Existem quatro retornos de chamada de ciclo de vida especiais para elementos personalizados que podemos usar para anexar marcação de cabeçalho à página:
  connectedCallback, attributeChangeCallback, disconnectedCallback and adoptedCallback.
  Desses retornos de chamada,connectedCallback é um dos mais comumente usados.
  connectedCallback é executado sempre que seu elemento personalizado é inserido no DOM.
*/
  connectedCallback() {
    this.innerHTML = 

/* ************************************************************************************************************************************************************ */
/* **************************************** NÃO ESQUEÇA DO ACENTO GRAVE  ANTES DA TAG <style> E DEPOIS DA TAG </html> ***************************************** */
/* ************************************************************************************************************************************************************ */

/* ******************************************************************* Inicio da tag style. ******************************************************************* */
` <style>
  .footer__copyright {
    color: #ede0d4;
    display: flex;
    font-size: 0.8rem;
    height: 2rem;
    justify-content: center;
    letter-spacing: 0.06rem;
    margin: 0 0.3rem 0 0.3rem;
    text-align: center;
  }
  .suport:focus, .developer:focus, .resouces:focus {
    box-shadow: inset 0  -1px 0 0 #ede0d4;
  }
  .suport:hover, .developer:hover, .resouces:hover {
    color: #ede0d4;
    transition-delay: 0.5s;
    transition: 0.6s;
  }
  .suport, .developer, .resouces {
    color: #999;
    display: flex;
    font-size: 1rem;
    outline: none;
    text-decoration: none;
    margin: 0.5rem 0 0.2rem 0 ;
    cursor: pointer;
    letter-spacing: 0.1rem;
  }
  .footer__info {
    display: flex; 
    align-items: center;
    justify-content: center;
    width: 100%; 
    height: 8rem;
    flex-direction: column;
  }
/**/
  .vallis__logo {
    height: auto;
    margin: 1.5rem 0 0 0;
    width: 6rem;
  }
  .mini__footer {
    display: flex;
    justify-content: center;
  } 
/* Todos os elementos que estão no mini__footer */
  .element__mini__footer {
    position: absolute;
    background: #333;
    bottom: 0;
    font-family: sans-serif;
    height: 15rem;
    left: 0;
    width: 100%;
    color: #999 ;
    flex-direction: column; 
  }
/* Para sair da conta */
  .button__logout {
    margin-left: 1.2rem ;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;  

    font-size: 3rem;
    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.1rem;
  }
/* Icon seta do botão */
  .element__icon {
    width: 100%;
    transition-duration: .4s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
/* Icon seta do botão */
  .element__icon svg {
    width: 1.5rem;
  }
/* Icon seta do botão */
  .element__icon svg path {
    fill: #7f5539;
  }
/* text do botão de sair da conta*/
  .text__logout {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: #7f5539;
    font-size: 1.2rem;
    transition-duration: 0.3s;
    font-weight: 400;
  }
/* Aumenta o tamanho do botão ao passar o mouse*/
  .button__logout:hover {
    width: 17rem;
    border-radius: 40px;
    transition-duration: 0.3s;
  }
/* Ajusta o ícone ao passar o mouse */
  .button__logout:hover .element__icon {
    width: 10%;
    transition-duration: 0.3s;
    padding-left: 1.2rem;
  }
/* Cria o efeito do botão quando o cursor estiver sobre */
  .button__logout:hover .text__logout {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 0.8rem;
  }
/* Elemento para o botão logout no sidebar */
  .element__logout {
    position: absolute;
    bottom: 16rem;
    height: 3rem;
    left: 0;
    width: 100%;
  }
/* Reseta o estilo. */
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
/* estilo do botão. */
  .button__sidebar {
    align-items: center;
    background: linear-gradient(to left top, #ddb892, #ede0d4);
    border-radius: 50%;
    border: 0.1rem  solid #ede0d4;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    display: flex;
    height: 3rem;
    justify-content: center;
    width: 3rem;
  }
/* defini o estilo dos linhas do menu. */
  .menu__icon {
    align-items: end;
    display: flex;
    flex-direction: column;
    height: 2rem;
    justify-content: space-between;
    padding: 0.26rem;
    transition: transform .4s;
    width: 2.2rem;
  }
/* Defini animação das linhas do menu. */
  .menu__icon span {
    background-color: #7f5539;
    border-radius: 0.125rem;
    box-shadow: 0 .5px 2px 0 hsla(0, 0%, 0%, .2);
    height: 0.250rem;
    transition: width .4s, transform .4s, background-color .4s;
    width: 100%;
  }
  .menu__icon :nth-child(2) {
    width: 100%;
  }
  .menu__icon :nth-child(3) {
    width: 100%;
  }
  .menu__icon:hover {
    transform: rotate(-90deg);
  }
  .menu__icon:hover span {
    background-color: ede0d4;
    transform: translateX(-0.65rem);
    width: 0.5rem;
  }
/* Defini a aparência do menu lateral (sidbar). */
  .sidenav {
    background: linear-gradient(to left top, #ddb892, #ede0d4);
    border-radius: 0 1.2rem 0 0 ;
    height: 100%; 
    left: 0;
    overflow: hidden; 
    position: fixed; 
    top: 0; 
    transition: 0.5s; 
    width: 0;
    z-index: 1; 
  }
/* Defini a aparência dos link do menu lateral (sidbar). */
  .sidenav a {
    color: #7f5539;
    display: flex;
    font-size: 1.5rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    text-decoration: none;
    letter-spacing: 0.06rem;
  }
  .sidenav a:first-of-type {
    margin-top: 5rem;
  }
/* Defini a aparência dos links ao passar o cursor sobre eles. */
  .sidenav a:hover {
    color: #c96644;
    cursor: pointer; 
    transition-delay: 0.5s;
    transition: 0.6s;
    transform: translateX( 1rem);
  }
/* Botão para fechar o sidebar */
  .button__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: 2rem;
    top: 20%;
    transform: translateY(-50%);
    background-color: transparent;
    color: #7f5539;

    font-size: 3rem;
    transition-duration: 0.3s;
    font-family: "Fredoka", sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 0.1rem;
  }
/* Icone do botão de fechar */
  .closebtn {
    width: 100%;
    transition-duration: 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
/* Texto do botão de fechar */
  .text__close {
    position: absolute;
    left: 0%;
    width: 0;
    opacity: 0;
    color: #7f5539;
    font-size: 1.2rem;
    transition-duration: 0.3s;
    font-weight: 400;
  }
/* Aumenta o tamanho do botão ao passar o mouse */
  .button__close:hover {
    width: 15rem;
    border-radius: 40px;
    transition-duration: 0.3s;
  }
/* Ajusta o ícone ao passar o mouse */
  .button__close:hover .closebtn {
    width: 10%;
    transition-duration: 0.3s;
    padding-left: 8rem;
  }
/* Cria o efeito do botão quando o cursor estiver sobre */
  .button__close:hover .text__close {
    opacity: 1;
    width: 50%;
    transition-duration: 0.3s;
    padding-left: 0.8rem;
  }

  .element__close {
    position: absolute;
    top: 1rem;
    width: 100%;
    height: 3rem;
    padding-left: 1rem;
  }

/* Quando abrir o menu lateral. Usando o ID main. */
  #main {
    transition: margin-left 0.8s;
    padding: 1rem;  
  
    .sidenav {padding-top: 1rem;}
    .sidenav a {font-size: 1.1rem;}
  }
/* ******************************************************************** Final da tag style. ******************************************************************* */
</style> 
<html>
<!-- ***************************************************************** Inicio das tag htlm. ******************************************************************* -->
<!-- Essa div cria os elementos do menu lateral que vai ser gerado ao clique no botão e referência as páginas que existem nos links do menu. -->
  <div id="mySidenav" class="sidenav">
    <div class="element__close">
      <button class="button__close" onclick="closeNav()">
        <div class="closebtn" >&times;</div>
        <div class="text__close">Fechar</div>
      </button>  
    </div>
<!-- Links da navegação das páginas Fornecedor, Cadastrara Autorização e Loja-->
    <a href="supplier.html">Fornecedor</a>
    <a href="cadastrar_autorizacao_pagamento.html">Cadastrar Autorização</a>
    <a href="store.html">Loja</a>
<!-- Esta div cria o elemento e botão para sair da conta -->
    <div class="element__logout">
        <button class="button__logout" onclick="logoutSession()">
          <div class="element__icon"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
          </div>
          <div class="text__logout">Sair da conta</div>
        </button>  
    </div>
<!-- Esta div cria os elementos do footer da sidebar  -->
    <div class="element__mini__footer">
      <div class="mini__footer">
        <img class="vallis__logo" src="../Public/Img/VALLIS_Logo.png" alt="Vallis">
      </div>
      <div class="footer__info">
        <div class="suport">SUPORTE</div>
        <div class="developer">DESENVOLVEDORES</div>
        <div class="resouces">RECURSOS</div>
      </div>
      <div class="footer__copyright">
        <div class="copyright">Copyright © 2024 Vallis Developer | All rights reserved </div>
      </div>
    </div>
  </div>
      
<!-- Elemento que abre o menu lateral (sidbar). -->
      <div class="button__sidebar">
        <span onclick="openNav()">
          <button class="menu__icon">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </span>
      </div>
</html>`;
/* ********************************************************************* Final das tag html. ******************************************************************** */

/* ************************************************************************************************************************************************************** */
/* ***************************************** NÃO ESQUEÇA DO ACENTO GRAVE ANTES DA TAG <style> E DEPOIS DA TAG </html> ******************************************* */
/* ************************************************************************************************************************************************************** */
}
}
/* ************************************************************  Definição do elemento pelo JavaScrip.  ********************************************************  */

/* Elemento do HTML <side-bar-nav>. Class = SideBarNav. */
customElements.define('side-bar-nav', SideBarNav);

/* Defina a largura da navegação lateral para 22rem e a margem esquerda do conteúdo da página para 1rem */
function openNav() {
  document.getElementById("mySidenav").style.width = "22.5rem";
  document.getElementById("main").style.marginLeft = "8rem";
}

/* Define a largura da navegação lateral como 0 e a margem esquerda do conteúdo da página como 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* Dispara o evento de logout do botão button__logout*/
function logoutSession() {
  const logoutEvent = new CustomEvent('logoutClicked');
  document.dispatchEvent(logoutEvent);
}

/* ******************************************************* Final do componente da barra lateral da apliacação. ************************************************** */


