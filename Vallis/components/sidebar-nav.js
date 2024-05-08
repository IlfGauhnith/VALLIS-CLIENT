class SideBarNav extends HTMLElement {
    constructor() {
        super();
    }

    /*
        There are four special lifecycle callbacks for custom elements that we can use to append header markdown to the page:  
            connectedCallback, attributeChangeCallback, disconnectedCallback, and adoptedCallback.

        Of these callbacks, connectedCallback is one of the most commonly used. 
        connectedCallback runs each time your custom element is inserted into the DOM.
    */
    connectedCallback() {
        this.innerHTML = `
            <style>
                /* The side navigation menu */
                .sidenav {
                    height: 100%; /* 100% Full-height */
                    width: 0; /* 0 width - change this with JavaScript */
                    position: fixed; /* Stay in place */
                    z-index: 1; /* Stay on top */
                    top: 0; /* Stay at the top */
                    left: 0;
                    background-color: #111; /* Black*/
                    overflow-x: hidden; /* Disable horizontal scroll */
                    padding-top: 60px; /* Place content 60px from the top */
                    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
                }
                
                /* The navigation menu links */
                .sidenav a {
                    padding: 8px 8px 8px 32px;
                    text-decoration: none;
                    font-size: 25px;
                    color: #818181;
                    display: block;
                    transition: 0.3s;
                }
                
                /* When you mouse over the navigation links, change their color */
                .sidenav a:hover {
                    color: #f1f1f1;
                }
                
                /* Position and style the close button (top right corner) */
                .sidenav .closebtn {
                    position: absolute;
                    top: 0;
                    right: 25px;
                    font-size: 36px;
                    margin-left: 50px;
                }
                
                /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
                #main {
                    transition: margin-left .5s;
                    padding: 20px;
                }
                
                /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
                @media screen and (max-height: 450px) {
                    .sidenav {padding-top: 15px;}
                    .sidenav a {font-size: 18px;}
                }
                .button__div {
                    width: 50px;
                    height: 50px;
                    margin: 1.5vh 0 0 1.5vh;
                    background-color: #9c6644;
                    border: none;
                    border-radius: 50%;
                    color: black;
                    font-size: 25px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}