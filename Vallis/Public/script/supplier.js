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
  
  console.log(data);
  
  const token = sessionStorage.getItem('token');
  
  const headers = {
    authorizationToken: token,
    'Content-Type': 'application/json'
  };
  
  console.log(headers);
  
  axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/fornecedor', data, { headers: headers })
  .then(function (response) {
    
    document.getElementById("CNPJ").value = "";
    document.getElementById("razao__social").value = "";
      addFornecedorElement(response.data);
      add_sucesso.style.display = 'block';
      setTimeout(function() {
        add_sucesso.style.display = 'none';
        closeModal();
      }, 2000);
      //alert('Fornecedor adicionado com sucesso!');
    })
    .catch(function (error) {
      if (error.response) {
        //console.error(error.response.data.message);
        add_erro.style.display = 'block';
        setTimeout(function(){
          add_erro.style.display = 'none';
        }, 5000); 
      } else {
        console.error('Erro:', error);
        //alert('Erro ao adicionar fornecedor');
      }
    });
}

function showModal() {
  console.log('showing modal')
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

function addFornecedorElement(fornecedor) {
  const table = document.getElementById("t__body");
  const row = document.createElement("tr");

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

  table.appendChild(row);

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
  document.querySelector('.botao__fechar').addEventListener('click', closeModal);
  document.getElementById('CNPJ').addEventListener('input', mascara_CNPJOnInput);
  limitarCaracteres();
});