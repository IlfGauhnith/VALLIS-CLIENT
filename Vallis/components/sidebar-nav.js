
//

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
  background:  #e6ccb2;
  border-radius: 50%;
  border: 2px  solid #ede0d4;
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
  transform: translateX(-10px);
  width: 0.5rem;
}

/* Defini a aparência do menu lateral (sidbar). */
  .sidenav {
    background: linear-gradient(to left top, #ddb892, #ede0d4);
    border-radius: 0rem 1.2rem 1.2rem 0rem ;
    height: 100%; 
    left: 0;
    overflow-x: auto; 
    padding-top: 60px; 
    position: fixed; 
    top: 0; 
    transition: 0.5s; 
    width: 0;
    z-index: 1; 
  }
  
/* Defini a aparência dos link do menu lateral (sidbar). */
  .sidenav a {
    color: #7f5539;
    display: block;
    font-size: 1.5rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    text-decoration: none;
  }
  
/* Defini a aparência dos links ao passar o cursor sobre eles. */
  .sidenav a:hover {
      color: #c96644;
      cursor: pointer; 
  }
  
/* Defini a aparência do botão fechar no canto superior direito da menu lateral (sidbar). */
  .sidenav .closebtn {
    font-size: 3rem;
    position: absolute;
    right: 1rem;
    top: 0;
    width:1rem ;
    margin: 0rem 1rem 0rem 0rem;
  }
  
/* defini a aparência de movimento do conteudo que está fora do menu lateral (sibar). Usado para dar uma aparência mais suave ao conteudo da página
   quando abrir o menu lateral. Usando o ID main. */
  #main {
    transition: margin-left 0.8s;
    padding: 1rem;
  
       
/* Em telas menores, onde a altura é menor que 450px, altere o estilo do sidenav (menos preenchimento e tamanho de fonte menor) */
  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 1rem;}
    .sidenav a {font-size: 1.1rem;}
  }

/* ******************************************************************** Final da tag style. ******************************************************************* */
</style> 
<html>
<!-- ***************************************************************** Inicio da tag htlm. ******************************************************************* -->

<!-- Essa div cria os elementos do menu lateral que vai ser gerado ao click no botão e referência as paginas que existe nos links do menu. -->
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="supplier.html">Fornecedor</a>
    <a href="cadastrar_autorizacao_pagamento.html">Cadastrar Autorização</a>
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
</html>`
/* ********************************************************************* Final da tag html. ******************************************************************* */

/* ************************************************************************************************************************************************************ */
/* ***************************************** NÃO ESQUEÇA DO ACENTO GRAVE ANTES DA TAG <style> E DEPOIS DA TAG </html> ***************************************** */
/* ************************************************************************************************************************************************************ */
  }
}
/* ************************************************************ Definição do elemento pelo JavaScrip. ********************************************************  */

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

/**
 ******************************************************* Final do componente da barra lateral da apliacação. *****************************************************
 */ 