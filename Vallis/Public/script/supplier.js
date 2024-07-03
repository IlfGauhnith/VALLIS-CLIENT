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

// Realiza validações e formatação do CNPJ
    cnpj = cnpj_add.replace(/[^0-9]/g, '');

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
// Limpa os campos do formulário após o sucesso da adição do fornecedor
        document.getElementById("CNPJ__add").value = "";
        document.getElementById("razao__add").value = "";

// Exibe uma mensagem de sucesso e fecha o modal após um intervalo de tempo
        FornecedorElement(response.data);
          window.location.href = "supplier.html";
      })
      .catch(function (error) {
// Manipula os erros de resposta da solicitação
        if (error.response) {
          add_erro.style.display = 'block';
          setTimeout(function () {
            add_erro.style.display = 'none';
          }, 5000);
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
    const modal = document.querySelector('.modal__edit');
    document.querySelector('#CNPJ__edit').value = fornecedor.cnpj;
    document.querySelector('#razao__edit').value = fornecedor.razao_social;
    document.querySelector('#edit_idSupplier').value = fornecedor.id_fornecedor;
    modal.style.display = 'block';
  }

// Função para fechar o modal de edição
  function closeEditModal() {
    const modal = document.querySelector('.modal__edit');
    modal.style.display = 'none';
    window.location.href = "supplier.html";
  }

// Função para exibir o modal de adição de fornecedor
  function showModal() {
    const modal = document.querySelector('.modal__supplier');
    modal.style.display = 'block';
  }

// Função para fechar o modal de adição de fornecedor
  function closeModal() {
    const modal = document.querySelector('.modal__supplier');
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

    const edit = document.createElement("button");
    const btEdit = document.createElement("td");
    const editTxt = document.createElement("span");
    editTxt.textContent = "Editar";
    edit.classList.add("show__edit");
    edit.addEventListener('click', editOnClick);
    btEdit.classList.add("td__edit");
    editTxt.classList.add("tx__edit");
    edit.appendChild(editTxt);
    btEdit.appendChild(edit);
    row.appendChild(btEdit);

    const delet = document.createElement("button");
    delet.addEventListener("click", deletOnClick);
    const deletTd = document.createElement("td");
    const deletTxt = document.createElement("span");
    deletTxt.textContent = "Excluir";
    delet.classList.add("show__delet");
    deletTd.classList.add("td__delet");
    deletTxt.classList.add("tx__delet");
    delet.appendChild(deletTxt);
    deletTd.appendChild(delet);
    row.appendChild(deletTd);

    table.appendChild(row);
  }

  async function deletOnClick(event) {
    const id_fornecedor = event.target.parentElement.parentElement.parentElement.id;
    const razao_social = document.getElementById("td__razao__" + id_fornecedor).innerText;
    
    document.getElementById("id__supplierDelet").value = id_fornecedor;
    document.getElementById("name__supplierDelet").innerText = razao_social;
    document.getElementById("modal__delet").style.display = 'block';
    const noneListSupplier = document.querySelectorAll('.conteiner__list');

    noneListSupplier.forEach(card => {
      card.style.display = 'none';
    });
  }

// Função para executar a exclusão de um fornecedor ao clicar no botão "Excluir"
  async function confirmarExcluirOnClick(event) {
// Obtém o ID do fornecedor a partir do elemento clicado
    const id_fornecedor =  document.getElementById("id__supplierDelet").value;

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
      alert(response.data.message);
    } catch (error) {
// Manipula os erros de resposta da solicitação
      if (error.response)
        console.error(error.response.data.message);
      else
        console.error('Erro:', error);

//      alert('Erro ao retornar fornecedor');
      throw error;
    }
  }

// Função para obter a lista de fornecedores da API
  async function getFornecedores() {
    try {
// Obtém o token de autorização armazenado na sessão
      const token = sessionStorage.getItem('token');

// Define os cabeçalhos da solicitação
      const headers = {
        authorizationToken: token,
        'Content-Type': 'application/json'
      };

// Envia a solicitação GET para a API e retorna os dados dos fornecedores
      const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers });
      return response.data;
    } catch (error) {
// Manipula os erros de resposta da solicitação
      if (error.response)
        console.error(error.response.data.message);
      else
        console.error('Erro:', error);

//      alert('Erro ao retornar fornecedor');
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
    document.querySelector('.add__supplier').addEventListener('click', showModal);
    document.querySelector('.close__add').addEventListener('click', closeModal);
    document.getElementById('CNPJ__add').addEventListener('input', mascara_CNPJOnInput);
    document.getElementById('CNPJ__edit').addEventListener('input', mascara_CNPJOnInput);
    document.querySelector('.close__edit').addEventListener('click', closeEditModal);
    document.getElementById('confirm__edit').addEventListener('click', confirmEditOnClick);
    limitarCaracteres();
  });

/**
*------------------------------------------------------------------------------------------------------------
************************** Conclusão da regra de negócio da página fornecedores. ****************************
*------------------------------------------------------------------------------------------------------------ 
*/