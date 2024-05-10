class SideBarNav extends HTMLElement {
    constructor() {
        super();
    }

  /*
    Existem quatro retornos de chamada de ciclo de vida especiais para elementos personalizados que podemos usar para anexar marcação de cabeçalho à página:
    conectadoCallback, atributoChangeCallback, desconectadoCallback e adotadoCallback.
    Desses retornos de chamada, conectadoCallback é um dos mais comumente usados.
    conectadoCallback é executado sempre que seu elemento personalizado é inserido no DOM.
  */
    connectedCallback() {
        this.innerHTML = `
            <style>
                /* The side navigation menu */
                .sidenav {
                    height: 95.5%; 
                    width: 0;
                    position: fixed; 
                    border-radius: 0rem 1.2rem 1.2rem 0rem ;
                    z-index: 1; 
                    top: 0; 
                    left: 0;
                    background: linear-gradient(to left top, #ddb892, #ede0d4);
                    overflow-x: auto; 
                    padding-top: 60px; 
                    transition: 0.5s; 

                }
                
                /* The navigation menu links */
                .sidenav a {
                    padding: 0.5rem 0.5rem 0.5rem 2rem;
                    text-decoration: none;
                    font-size: 1.5rem;
                    color: #7f5539;
                    display: block;
                }
                
                /* When you mouse over the navigation links, change their color */
                .sidenav a:hover {
                    color: #c96644;
                }
                
                /* Position and style the close button (top right corner) */
                .sidenav .closebtn {
                    position: absolute;
                    top: 0;
                    right: 25px;
                    font-size: 3rem;
                }
                
                /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
                #main {
                    transition: margin-left 0.8s;
                    padding: 1rem;
                }

             
                /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
                @media screen and (max-height: 450px) {
                    .sidenav {padding-top: 15px;}
                    .sidenav a {font-size: 18px;}
                }
                .button__div {
                  align-items: center;
                  background-color: #9c6644;
                  color: #ede0d4;
                  cursor: pointer;
                  border: none;
                  border-radius: 50%;
                  display: flex;
                  font-size: 25px;
                  justify-content: center;
                  height: 50px;
                  margin: 1.5vh 0 0 1.5vh;
                  width: 50px;
                }
            </style>
            <html>
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                    <a href="supplier.html">Fornecedor</a>
                    <a href="cadastrar_autorizacao_pagamento.html">Cadastrar Autorização</a>
                </div>
            
            <!-- Use any element to open the sidenav -->
                <div class="button__div">
                    <span onclick="openNav()">
                        <i class="fa-solid fa-bars"></i>
                    </span>
                </div>
            </html>
        `
    }
}

customElements.define('side-bar-nav', SideBarNav);

/* Defina a largura da navegação lateral para 22rem e a margem esquerda do conteúdo da página para 22rem */
function openNav() {
    document.getElementById("mySidenav").style.width = "22.5rem";
    document.getElementById("main").style.marginLeft = "1rem";
}

/* Define a largura da navegação lateral como 0 e a margem esquerda do conteúdo da página como 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}