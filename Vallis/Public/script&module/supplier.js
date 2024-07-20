/**
 *------------------------------------------------------------------------------------------------------------
 **************************** Inicio da regra de negócio da página fornecedores. *****************************
 *------------------------------------------------------------------------------------------------------------ 
 */
// Função para aplicar a máscara de CNPJ ao valor fornecido
  function aplicarMascaraCNPJ(value) {
// Remove todos os caracteres não numéricos do valor
    value = value.replace(/[^0-9]/g, '');

// Se o valor tiver mais de 14 dígitos, limita o tamanho para 14
    if (value.length > 14) {
      value = value.slice(0, 14);
    }

// Aplica a formatação da máscara de CNPJ: XX.XXX.XXX/YYYY-ZZ
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

    return value;
  }

// Função para aplicar a máscara de CNPJ durante a entrada de texto
  function mascara_CNPJOnInput(event) {
    value = aplicarMascaraCNPJ(event.target.value);
    event.target.value = value;
  }

// Função para limitar o número de caracteres em um campo de entrada
  function limitarCaracteres() {
    var maxLength = 200;
    var inputElement = document.getElementById("razao__add");

    if (inputElement) {
      inputElement.addEventListener("input", function () {
        if (this.value.length > maxLength) {
          this.value = this.value.slice(0, maxLength);
        }
      });
    }
  }

// Função para enviar uma solicitação PUT para atualizar um fornecedor
  async function putFornecedor(fornecedor) {
    try {
// Remove todos os caracteres não numéricos do CNPJ do fornecedor
      fornecedor.cnpj = fornecedor.cnpj.replace(/[^0-9]/g, '');

// Define os cabeçalhos da solicitação
      const headers = {
        authorizationToken: sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      };

// Envia a solicitação PUT para a API com os dados do fornecedor
      await axios.put('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', fornecedor, { headers: headers });
    } catch (error) {

// Manipula os erros de resposta da solicitação
      if (error.response) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error('Erro:', error);
        alert(error);
      }
      throw error;
    }
  }

// Função para adicionar um novo fornecedor
  function addSupplier() {
// Obtém o CNPJ e a razão social do fornecedor a partir dos elementos do formulário
    const cnpj_add = document.getElementById("CNPJ__add").value;
    const razao_social = document.getElementById("razao__add").value;
    const add_erro = document.querySelector(".add__erro");
    const add_sucess = document.querySelector(".add__sucess");
    const cnpj_exists = document.querySelector(".cnpj__exists");

// Realiza validações e formatação do CNPJ
    cnpj = cnpj_add.replace(/[^0-9]/g, '');

// Verifica se os campos estão vazios antes de fazer o post para a API 
    if (!cnpj || !razao_social) {
        add_erro.style.display = 'block';
        setTimeout(function addEmpty(){
          add_erro.style.display = 'none';
        }, 4000);
        return;
    }
  
// Cria um objeto com os dados do fornecedor
    const data = {
      cnpj: cnpj,
      razao_social: razao_social
    };

// Obtém o token de autorização armazenado na sessão
    const token = sessionStorage.getItem('token');

// Define os cabeçalhos da solicitação
    const headers = {
      authorizationToken: token,
      'Content-Type': 'application/json'
    };

// Envia a solicitação POST para adicionar o fornecedor
    axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', data, { headers: headers })
      .then(function (response) {
        
// Exibe uma mensagem de sucesso e fecha o modal após um intervalo de tempo
        add_sucess.style.display = 'block';
        setTimeout(function addSucess(){
          add_erro.style.display = 'none';
          FornecedorElement(response.data);
          window.location.href = "supplier.html";
        },2000);

// Redireciona a página apos o tempo 
        setTimeout(function addRefresh(){
          FornecedorElement(response.data);
          window.location.href = "supplier.html";
        },2000);

// Limpa os campos do formulário após o sucesso da adição do fornecedor
        document.getElementById("CNPJ__add").value = "";
        document.getElementById("razao__add").value = "";
      })

// Manipula os erros de resposta da solicitação
      .catch(function (error) {
        if (error.response) {
          cnpj_exists.style.display = 'block';
          setTimeout(function erroAdd(){
            cnpj_exists.style.display = 'none';
          }, 4000); 
        } else {
          console.error('Erro:', error);
        }
      });
  }

// Função para realizar a edição de um fornecedor ao clicar no botão "Editar"
  function editOnClick(event) {
// Obtém os dados do fornecedor a partir da linha da tabela clicada
    const fornecedorTr = event.target.closest('tr');
    const id_fornecedor = fornecedorTr.getAttribute('id');
    const razao_social = fornecedorTr.querySelector('.td__razao').textContent;
    const cnpj = fornecedorTr.querySelector('.td__cnpj').textContent;

// Cria um objeto com os dados do fornecedor
    const fornecedor = {
      id_fornecedor: id_fornecedor,
      razao_social: razao_social,
      cnpj: cnpj
    }

// Exibe o modal de edição com os dados do fornecedor
    showEditModal(fornecedor);
  }

// Função para exibir o modal de edição com os dados do fornecedor
  function showEditModal(fornecedor) {
    const modal = document.querySelector('.modal__edit__supplier');
    document.querySelector('#CNPJ__edit').value = fornecedor.cnpj;
    document.querySelector('#razao__edit').value = fornecedor.razao_social;
    document.querySelector('#edit_idSupplier').value = fornecedor.id_fornecedor;
    modal.style.display = 'block';
  }

// Função para fechar o modal de edição
  function closeEditModal() {
    const modal = document.querySelector('.modal__edit__supplier');
    modal.style.display = 'none';
    window.location.href = "supplier.html";
  }

// Função para exibir o modal de adição de fornecedor
  function showModal() {
    const modal = document.querySelector('.modal__add__supplier');
    modal.style.display = 'block';
  }

// Função para fechar o modal de adição de fornecedor
  function closeModal() {
    const modal = document.querySelector('.modal__add__supplier');
    modal.style.display = 'none';
  }

// Função para confirmar a edição de um fornecedor
  async function confirmEditOnClick(event) {
    const cnpj = document.querySelector('#CNPJ__edit').value;
    const razao_social = document.querySelector('#razao__edit').value;

// Verifica se os campos de CNPJ e Razão Social estão preenchidos
    if (cnpj && razao_social) {
      const id_fornecedor = document.querySelector('#edit_idSupplier').value;

// Cria um objeto com os dados do fornecedor
      const fornecedor = {
        id_fornecedor: id_fornecedor,
        razao_social: razao_social,
        cnpj: cnpj
      };

// Realiza a atualização do fornecedor
      await putFornecedor(fornecedor);
      window.location.href = "supplier.html";
    } else {
// Exibe uma mensagem de erro se os campos não estiverem preenchidos
      alert('Os campos de CNPJ e/ou Razão Social não estão preenchidos');
    }
  }

// Função para adicionar um novo fornecedor à tabela
  function FornecedorElement(fornecedor) {
// Cria elementos HTML para exibir os dados do fornecedor na tabela
    const table = document.getElementById("t__body");
    const row = document.createElement("tr");

    row.setAttribute("id", fornecedor.id_fornecedor);

// Cria células para o ID, Razão Social, CNPJ, e botões de editar e excluir
// com classes CSS correspondentes
    const id = document.createElement("div");
    const idTd = document.createElement("td");
    id.textContent = fornecedor.id_fornecedor;
    id.classList.add("show__ID");
    idTd.classList.add("td__ID");
    idTd.appendChild(id);
    row.appendChild(idTd);

    const razao = document.createElement("td");
    const razaoTd = document.createElement("td");
    razao.textContent = fornecedor.razao_social;
    razao.classList.add("show__razao");
    razaoTd.classList.add("td__razao");
    razaoTd.setAttribute("id", "td__razao__" + fornecedor.id_fornecedor);
    razaoTd.appendChild(razao);
    row.appendChild(razaoTd);

    const cnpj = document.createElement("td");
    const cnpjTd = document.createElement("td");
    cnpj.textContent = aplicarMascaraCNPJ(fornecedor.cnpj);
    cnpj.classList.add("show__cnpj");
    cnpjTd.classList.add("td__cnpj");
    cnpjTd.appendChild(cnpj);
    row.appendChild(cnpjTd);

    const spacevoid = document.createElement("td");
    const spacevoidTd = document.createElement("td");
    spacevoid.classList.add("show__space");
    spacevoidTd.classList.add("td__space");
    spacevoidTd.appendChild(spacevoid);
    row.appendChild(spacevoidTd);

// Elementos do botão editar da tabela
    const edit = document.createElement("button");
    edit.addEventListener('click', editOnClick);
    const btEdit = document.createElement("td");
    const editIcon = document.createElement("span");
    const tooltipEdit = document.createElement("div");
    tooltipEdit.textContent = "Editar";
    editIcon.innerHTML=`
      <svg class="edit-svgIcon" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
      </svg>`
    edit.classList.add("show__edit");
    btEdit.classList.add("td__edit");
    tooltipEdit.classList.add("tooltip__edit");
// Adicionar eventos para mostrar/ocultar a tooltip
    edit.addEventListener("mouseover", () => {
      tooltipEdit.style.visibility = "visible";
      tooltipEdit.style.opacity = "1";
    });
    edit.addEventListener("mouseout", () => {
      tooltipEdit.style.visibility = "hidden";
      tooltipEdit.style.opacity = "0";
    });
    
    edit.appendChild(tooltipEdit);
    edit.appendChild(editIcon);
    btEdit.appendChild(edit);
    row.appendChild(btEdit);
// Elemento do botão deletar da tabela  
  const delet = document.createElement("button");
  delet.addEventListener("click", deletOnClick);
  const deletTd = document.createElement("td");
  const deletIcon = document.createElement("span");
  const tooltipDelet = document.createElement("div");
  tooltipDelet.textContent = "Apagar";
  deletIcon.innerHTML = `
    <svg class="delet-svgIcon" viewBox="0 0 448 512">
      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
    </svg>
  `;
  delet.classList.add("show__delet");
  deletTd.classList.add("td__delet");
  tooltipDelet.classList.add("tooltip__delet");
// Adicionar eventos para mostrar/ocultar a tooltip
  delet.addEventListener("mouseover", () => {
    tooltipDelet.style.visibility = "visible";
    tooltipDelet.style.opacity = "1";
  });
  delet.addEventListener("mouseout", () => {
    tooltipDelet.style.visibility = "hidden";
    tooltipDelet.style.opacity = "0";
  });

  delet.appendChild(tooltipDelet);
  delet.appendChild(deletIcon);
  deletTd.appendChild(delet);
  row.appendChild(deletTd);

// Adicionar a linha à tabela
  table.appendChild(row);

  }

// Função que abre o modal de confirmação e deleta o fornecedor
  async function deletOnClick(event) {
  // Navegue para encontrar o ID do fornecedor
    const id_fornecedor = event.target.closest('tr').id;

// Tente encontrar o elemento com o ID esperado
    const razao_social_element = document.getElementById("td__razao__" + id_fornecedor);

// Verifique se o elemento foi encontrado
    if (!razao_social_element) {
        console.error(`Elemento com ID "td__razao__${id_fornecedor}" não encontrado.`);
      return; // Saia da função se o elemento não for encontrado
    }

// Obtenha o texto do elemento encontrado
    const razao_social = razao_social_element.innerText;

// Preencha o modal com os valores encontrados
    const modal = document.querySelector('confirmation-delete-supplier'); // Seleciona o modal

    if (modal) {
      modal.shadowRoot.getElementById("id__supplierDelet").value = id_fornecedor;
      modal.shadowRoot.getElementById("name__supplierDelet").innerText = razao_social;
      modal.shadowRoot.getElementById("modal__delet").style.display = 'block';

// Event listener para fechar o modal ao clicar no botão "Cancelar"
      modal.shadowRoot.querySelector('.close__delet').addEventListener('click', function() {
          modal.shadowRoot.getElementById("modal__delet").style.display = 'none'; // Fecha o modal
// Exibe novamente todos os elementos com a classe 'conteiner__list'
          const noneListSupplier = document.querySelectorAll('.conteiner__list');
          noneListSupplier.forEach(card => {
              card.style.display = 'flex';
          });
      });

// Event listener para confirmar a exclusão ao clicar no botão "Excluir"
      modal.shadowRoot.querySelector('.confirm__delet').addEventListener('click', function() {
          confirmarExcluirOnClick(modal); // Passa o modal como parâmetro
      });
    } else {
      console.error('Componente confirmation-delete-supplier não encontrado.');
    }

// Oculte todos os elementos com a classe 'conteiner__list'
    const noneListSupplier = document.querySelectorAll('.conteiner__list');
        noneListSupplier.forEach(card => {
      card.style.display = 'none';
    });
  }

// Função para executar a exclusão de um fornecedor ao clicar no botão "Excluir"
  async function confirmarExcluirOnClick(modal) {
// Obtém o ID do fornecedor a partir do elemento no modal
    const idElement = modal.shadowRoot.getElementById("id__supplierDelet");
      if (!idElement) {
        console.error('Elemento com ID "id__supplierDelet" não encontrado.');
      return;
    }

    const id_fornecedor = idElement.value; 
      if (!id_fornecedor) {
//   console.error('ID do fornecedor não encontrado.');
      return;
    }

// Realiza a exclusão do fornecedor
  await deletFornecedor(id_fornecedor);

// Redireciona para a página de fornecedores após a exclusão
      window.location.href = "supplier.html";
  }

// Função para enviar uma solicitação DELETE para excluir um fornecedor
  async function deletFornecedor(id_fornecedor) {
    try {
// Obtém o token de autorização armazenado na sessão
      const token = sessionStorage.getItem('token');

// Define os cabeçalhos da solicitação e os parâmetros da URL
      const headers = {
          authorizationToken: token
      };
      const params = {
          id: id_fornecedor
      };

// Envia a solicitação DELETE para a API com o ID do fornecedor a ser excluído
      const response = await axios.delete('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers, params: params });
// alert(response.data.message);
    } catch (error) {
// Manipula os erros de resposta da solicitação
        if (error.response)
          console.error(error.response.data.message);
        else
          console.error('Erro:', error);

// alert('Erro ao retornar fornecedor');
        throw error;
    }
  }

// Função para obter a lista de fornecedores da API
  async function getFornecedores() {
    const sandLoader = document.querySelector('sand-loader').shadowRoot.querySelector('.hourglassBackground');
    
    try {
// Mostrar o sand-loader
      sandLoader.style.display = 'block';

// Obtém o token de autorização armazenado na sessão
      const token = sessionStorage.getItem('token');

// Define os cabeçalhos da solicitação
      const headers = {
        authorizationToken: token,
        'Content-Type': 'application/json'
      };

// Envia a solicitação GET para a API e retorna os dados dos fornecedores
      const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers });

// Ocultar o sand-loader
      sandLoader.style.display = 'none';

      return response.data;
  } catch (error) {
// Ocultar o sand-loader
      sandLoader.style.display = 'none';

// Manipula os erros de resposta da solicitação
      if (error.response)
        console.error(error.response.data.message);
      else
        console.error('Erro:', error);

      throw error;
    }
  }

// Ao cancelar o modal de deletar o fornecedor
  function closeModalAndShowContainer() {
    var modal = document.querySelector('.modal__delet');
    var container = document.querySelector('.conteiner__list');

    if (modal && container) {
        modal.style.display = 'none';
        container.style.display = 'flex';
    } else {
        console.error('Um ou ambos os elementos não foram encontrados.');
    }
  }
  
// Função executada quando o DOM é carregado
    document.addEventListener("DOMContentLoaded", async function () {
// Adiciona os fornecedores à tabela ao carregar a página
      Array.from(await getFornecedores())
      .forEach(fornecedor => {
        FornecedorElement(fornecedor);
      });

// Adiciona os eventos aos elementos do formulário e da tabela
    document.querySelector(".confirm__addSupplier").addEventListener("click", addSupplier);
    document.getElementById('confirm__editSupplier').addEventListener('click', confirmEditOnClick);
    document.querySelector('.add__supplier').addEventListener('click', showModal);
    document.getElementById('CNPJ__add').addEventListener('input', mascara_CNPJOnInput);
    document.getElementById('CNPJ__edit').addEventListener('input', mascara_CNPJOnInput);
    document.querySelector('.close__add').addEventListener('click', closeModal);
    document.querySelector('.close__edit').addEventListener('click', closeEditModal);
    limitarCaracteres();
  });
/**
*------------------------------------------------------------------------------------------------------------
************************** Conclusão da regra de negócio da página fornecedores. ****************************
*------------------------------------------------------------------------------------------------------------ 
*/