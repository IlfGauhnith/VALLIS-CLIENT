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

function addAutorizacaoOnClick(event) {
    const autorizacaoOptionsDiv = document.getElementById('autorizacao_options');
    autorizacaoOptionsDiv.classList.toggle('show');
}

function addAutorizacaoChaveOnClick(event) {
    //TODO IMPLEMENTAR POR CHAVE DE ACESSO
    console.error('unimplemented');
}

function addAutorizacaoXMLOnClick(event) {
    //TODO IMPLEMENTAR POR IMPORTACAO DE XML
    console.error('unimplemented');
}

function createAutorizacaoTitleElement(autorizacaoBlock) {
    const autorizacaoTitleDiv = document.createElement('div');
    autorizacaoTitleDiv.classList.add('autorizacao_title_div');
    autorizacaoTitleDiv.textContent = "Autorização de Pagamento Manual";

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-icon', 'fas', 'fa-trash');
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', function () {
        autorizacaoBlock.remove();
    });
    autorizacaoTitleDiv.append(deleteIcon);

    return autorizacaoTitleDiv
}

function createInputDiv(label_text, input_type) {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input_div');

    const inputLabel = document.createElement('label');
    inputLabel.textContent = label_text;

    const input = document.createElement('input');
    input.setAttribute('type', input_type);

    inputDiv.append(inputLabel, input);

    return inputDiv;
}

async function createSelectDiv(label_text, populate_function) {
    const selectDiv = document.createElement('div');
    selectDiv.classList.add('input_div');

    const selectLabel = document.createElement('label');
    selectLabel.textContent = label_text;

    var select = document.createElement('select');
    select = await populate_function(select);

    selectDiv.append(selectLabel, select);
    return selectDiv;
}

async function addAutorizacaoManualOnClick(event) {
    const autorizacaoBlock = document.createElement('div');
    autorizacaoBlock.classList.add('autorizacao__block__div');

    const autorizacaoTitleDiv = createAutorizacaoTitleElement(autorizacaoBlock);

    const numeroNotaDiv = createInputDiv('Número da Nota Fiscal', 'text');
    const dataEmissaoDiv = createInputDiv('Data de Emissão', 'date');
    const fornecedorDiv = await createSelectDiv('Fornecedor', populateFornecedoresSelect);
    const lojaDiv = await createSelectDiv('Loja', populateLojaSelect);

    autorizacaoBlock.append(autorizacaoTitleDiv, numeroNotaDiv, dataEmissaoDiv, fornecedorDiv, lojaDiv);
    document.body.appendChild(autorizacaoBlock);
}

async function populateFornecedoresSelect(fornecedoresSelect) {

    Array.from(window.fornecedores)
        .forEach(function (fornecedor) {
            const option = document.createElement('option');
            option.value = fornecedor.id_fornecedor;
            option.textContent = fornecedor.razao_social;

            fornecedoresSelect.appendChild(option);
        });

    return fornecedoresSelect
}

async function populateLojaSelect(lojasSelect) {
    return lojasSelect;
}

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('add_autorizacao').addEventListener('click', addAutorizacaoOnClick);
    document.getElementById('add_autorizacao_chave').addEventListener('click', addAutorizacaoChaveOnClick);
    document.getElementById('add_autorizacao_xml').addEventListener('click', addAutorizacaoXMLOnClick);
    document.getElementById('add_autorizacao_manual').addEventListener('click', addAutorizacaoManualOnClick);

   window.fornecedores = await getFornecedores();
});