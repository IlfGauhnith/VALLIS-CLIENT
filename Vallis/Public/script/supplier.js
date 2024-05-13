function aplicarMascaraCNPJ(value) {
  value = value.replace(/[^0-9]/g, '');
  if (value.length > 14) {
    value = value.slice(0, 14);
  }
  value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  return value;
}
function mascara_CNPJOnInput(event) {
  value = aplicarMascaraCNPJ(event.target.value);
  event.target.value = value;
}

function limitarCaracteres() {
  var maxLength = 200;
  var inputElement = document.getElementById("razao__social");

  if (inputElement) {
    inputElement.addEventListener("input", function () {
      if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
      }
    });
  }
}

async function putFornecedor(fornecedor) {
  try {
    fornecedor.cnpj = fornecedor.cnpj.replace(/[^0-9]/g, '');

    const headers = {
      authorizationToken: sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    };

    await axios.put('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', fornecedor, { headers: headers })
    alert('Fornecedor editado com sucesso!');
  } catch (error) {
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

function addSupplier() {
  const cnpj_add = document.getElementById("CNPJ").value;
  const razao_social = document.getElementById("razao__social").value;
  const add_sucesso = document.querySelector('.add__sucesso');
  const add_erro = document.querySelector(".add__erro");
  const cnpjExiste = document.querySelector('.cnpj__existe');

  cnpj = cnpj_add.replace(/[^0-9]/g, '');

  const data = {
    cnpj: cnpj,
    razao_social: razao_social
  };
  const token = sessionStorage.getItem('token');

  const headers = {
    authorizationToken: token,
    'Content-Type': 'application/json'
  };

  axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', data, { headers: headers })
    .then(function (response) {

      document.getElementById("CNPJ").value = "";
      document.getElementById("razao__social").value = "";
      addFornecedorElement(response.data);
      add_sucesso.style.display = 'block';
      setTimeout(function () {
        add_sucesso.style.display = 'none';
        closeModal();
      }, 2000);
    })
    .catch(function (error) {
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

function editOnClick(event) {
  const fornecedorTr = event.target.closest('tr');

  const id_fornecedor = fornecedorTr.getAttribute('id');
  const razao_social = fornecedorTr.querySelector('.td__razao').textContent;
  const cnpj = fornecedorTr.querySelector('.td__cnpj').textContent;

  const fornecedor = {
    id_fornecedor: id_fornecedor,
    razao_social: razao_social,
    cnpj: cnpj
  }

  showEditModal(fornecedor);
}

function showEditModal(fornecedor) {
  const modal = document.querySelector('#modal_editar');

  document.querySelector('#editar_razao_social').value = fornecedor.razao_social;
  document.querySelector('#editar_CNPJ').value = fornecedor.cnpj;
  document.querySelector('#editar_id_fornecedor').value = fornecedor.id_fornecedor;

  modal.style.display = 'block';
}

function closeEditModal() {
  const modal = document.querySelector('#modal_editar');
  modal.style.display = 'none';
}

function showModal() {
  const modal = document.querySelector('#modal_adicionar');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.querySelector('#modal_adicionar');
  modal.style.display = 'none';
}

async function confirmEditOnClick(event) {
  const razao_social = document.querySelector('#editar_razao_social').value;
  const cnpj = document.querySelector('#editar_CNPJ').value;
  const id_fornecedor = document.querySelector('#editar_id_fornecedor').value;

  const fornecedor = {
    id_fornecedor: id_fornecedor,
    razao_social: razao_social,
    cnpj: cnpj
  };

  await putFornecedor(fornecedor);
  window.location.href = "supplier.html";
}

function addFornecedorElement(fornecedor) {
  const table = document.getElementById("t__body");
  const row = document.createElement("tr");

  row.setAttribute("id", fornecedor.id_fornecedor);

  const id = document.createElement("div");
  const idTd = document.createElement("td");
  id.textContent = fornecedor.id_fornecedor;
  id.classList.add("modal__ID");
  idTd.classList.add("td__ID");
  idTd.appendChild(id);
  row.appendChild(idTd);

  const razao = document.createElement("td");
  const razaoTd = document.createElement("td");
  razao.textContent = fornecedor.razao_social;
  razao.classList.add("modal__razao");
  razaoTd.classList.add("td__razao");
  razaoTd.appendChild(razao);
  row.appendChild(razaoTd);

  const cnpj = document.createElement("td");
  const cnpjTd = document.createElement("td");
  cnpj.textContent = aplicarMascaraCNPJ(fornecedor.cnpj);
  cnpj.classList.add("modal__cnpj");
  cnpjTd.classList.add("td__cnpj");
  cnpjTd.appendChild(cnpj);
  row.appendChild(cnpjTd);

  const spacevoid = document.createElement("td");
  const spacevoidTd = document.createElement("td");
  spacevoid.classList.add("modal__space");
  spacevoidTd.classList.add("td__space");
  spacevoidTd.appendChild(spacevoid);
  row.appendChild(spacevoidTd);

  const edit = document.createElement("button");
  const btEdit = document.createElement("td");
  const editTxt = document.createElement("span");
  editTxt.textContent = "Editar";
  edit.classList.add("modal__edit");
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
  deletTxt.textContent = "Excluir"
  delet.classList.add("modal__delet");
  deletTd.classList.add("td__delet");
  deletTxt.classList.add("tx__delet")
  delet.appendChild(deletTxt);
  deletTd.appendChild(delet);
  row.appendChild(deletTd);

  table.appendChild(row);

}





async function deletOnClick(event) {
  const id_fornecedor = event.target.parentElement.parentElement.parentElement.id;
  await deletFornecedor(id_fornecedor);

  window.location.href = "supplier.html";
}

async function deletFornecedor(id_fornecedor) {
  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      authorizationToken: token
    };
    const params = {
      id: id_fornecedor
    };

    const response = await axios.delete('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers, params: params });
    alert(response.data.message);
  } catch (error) {
    if (error.response)
      console.error(error.response.data.message);
    else
      console.error('Erro:', error);

    alert('Erro ao retornar fornecedor');
    throw error;
  }
}

async function getFornecedores() {
  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      authorizationToken: token,
      'Content-Type': 'application/json'
    };

    const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', { headers: headers });
    return response.data;
  } catch (error) {
    if (error.response)
      console.error(error.response.data.message);
    else
      console.error('Erro:', error);

    alert('Erro ao retornar fornecedor');
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async function () {

  Array.from(await getFornecedores())
    .forEach(fornecedor => {
      addFornecedorElement(fornecedor);
    });

  document.getElementById("add").addEventListener("click", addSupplier);
  document.querySelector('.add__supplier').addEventListener('click', showModal);
  document.querySelector('.button__close').addEventListener('click', closeModal);
  document.getElementById('CNPJ').addEventListener('input', mascara_CNPJOnInput);
  document.getElementById('editar_CNPJ').addEventListener('input', mascara_CNPJOnInput);
  document.getElementById('botao_fechar_edit_modal').addEventListener('click', closeEditModal);
  document.getElementById('confirm_edit').addEventListener('click', confirmEditOnClick);
  limitarCaracteres();
});