var qtd_autorizacao_manual = 0;

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
}

function mascaraMoeda(event) {
    const onlyDigits = event.target.value
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
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

async function getLojas() {
    try {
        const token = sessionStorage.getItem('token');
        const headers = {
            authorizationToken: token,
            'Content-Type': 'application/json'
        };

        const response = await axios.get('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/loja', { headers: headers });
        return response.data;
    } catch (error) {
        if (error.response)
            console.error(error.response.data.message);
        else
            console.error('Erro:', error);

        alert('Erro ao retornar lojas');
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

function addDuplicataOnClick(event) {
    const duplicataContainer = event.target.closest('div');
    const duplicataTable = duplicataContainer.querySelector('.duplicata__table');
    const qtdDuplicataInput = duplicataTable.querySelector('input[name="qtdDuplicata"]');

    const numeroBoletoTd = document.createElement('td');
    qtdDuplicataInput.value = parseInt(qtdDuplicataInput.value) + 1;
    const numeroBoletoSpan = document.createElement('span');
    numeroBoletoSpan.textContent = qtdDuplicataInput.value;
    numeroBoletoTd.append(numeroBoletoSpan);

    const valorTd = document.createElement('td');
    const valorInput = createInputDiv('', 'text', 'td_input_div', null, mascaraMoeda);
    valorTd.append(valorInput);

    const dataVencimentoTd = document.createElement('td');
    const dataVencimentoInput = createInputDiv('', 'date', 'td_input_div');
    dataVencimentoTd.append(dataVencimentoInput);

    const arquivoTd = document.createElement('td');
    const arquivoInput = createInputDiv('', 'file', 'td_input_div', '.pdf');
    arquivoTd.append(arquivoInput);

    const tr = document.createElement('tr');
    tr.append(numeroBoletoTd, valorTd, dataVencimentoTd, arquivoTd);

    duplicataTable.querySelector('tbody').append(tr);
}

function createButton(icon, style, onClickFunction) {
    const button = document.createElement('button');

    button.innerHTML = icon;
    button.classList.add(style);
    button.addEventListener('click', onClickFunction);

    return button;
}

function createDuplicataTableDiv() {
    const tableDiv = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const addDuplicataButton = createButton('<i class="fa-solid fa-plus fa-xl"></i>', 'add__duplicata__button', addDuplicataOnClick);

    tableDiv.classList.add('duplicata__container');
    table.classList.add('duplicata__table');
    thead.classList.add('duplicata__table__head');

    const thNumero = document.createElement('th');
    thNumero.textContent = 'Duplicata';
    thNumero.setAttribute('width', '2%');

    const thValor = document.createElement('th');
    thValor.textContent = 'Valor';
    thValor.setAttribute('width', '30%')

    const thDataVencimento = document.createElement('th');
    thDataVencimento.textContent = 'Data de Vencimento';
    thDataVencimento.setAttribute('width', '30%')

    const thArquivo = document.createElement('th');
    thArquivo.textContent = 'Arquivo';
    thArquivo.setAttribute('width', '38%')

    const qtdDuplicataInput = document.createElement('input');
    qtdDuplicataInput.setAttribute('type', 'hidden');
    qtdDuplicataInput.setAttribute('name', 'qtdDuplicata')
    qtdDuplicataInput.value = 0;

    thead.append(thNumero, thValor, thDataVencimento, thArquivo, qtdDuplicataInput);
    table.append(thead, tbody);
    tableDiv.append(addDuplicataButton, createBreakFlexRow(), table);

    return tableDiv;
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

function createInputDiv(label_text, input_type, style, accept, onInputFunction) {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add(style);

    const inputLabel = document.createElement('label');
    inputLabel.textContent = label_text;

    const input = document.createElement('input');
    input.setAttribute('type', input_type);

    if (accept)
        input.setAttribute('accept', accept);

    if (label_text)
        inputDiv.append(inputLabel, input);
    else
        inputDiv.append(input);

    if (onInputFunction)
        input.addEventListener('input', onInputFunction);

    return inputDiv;
}

function createBreakFlexRow() {
    const div = document.createElement('div');
    div.classList.add('break__flex__row');

    return div;
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

    const fornecedorDiv = await createSelectDiv('Fornecedor', populateFornecedoresSelect);
    const lojaDiv = await createSelectDiv('Loja', populateLojaSelect);
    const numeroNotaDiv = createInputDiv('Número da Nota Fiscal', 'text', 'input_div');
    const nfFileDiv = createInputDiv('Arquivo NF', 'file', 'input_div', '.pdf');
    const valorNotaDiv = createInputDiv('Valor', 'text', 'input_div', null, mascaraMoeda);
    const dataEmissaoDiv = createInputDiv('Data de Emissão', 'date', 'input_div');
    const duplicataTable = createDuplicataTableDiv();

    autorizacaoBlock.append(autorizacaoTitleDiv, fornecedorDiv, lojaDiv,
        createBreakFlexRow(),
        numeroNotaDiv, nfFileDiv, dataEmissaoDiv, valorNotaDiv,
        createBreakFlexRow(),
        duplicataTable);

    document.getElementById("main").appendChild(autorizacaoBlock);
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
    Array.from(window.lojas)
        .forEach(function (loja) {
            const option = document.createElement('option');
            option.value = loja.id_loja;
            option.textContent = `${loja.sigla} - ${loja.descricao}`;

            lojasSelect.appendChild(option);
        });

    return lojasSelect;
}

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('add_autorizacao').addEventListener('click', addAutorizacaoOnClick);
    document.getElementById('add_autorizacao_chave').addEventListener('click', addAutorizacaoChaveOnClick);
    document.getElementById('add_autorizacao_xml').addEventListener('click', addAutorizacaoXMLOnClick);
    document.getElementById('add_autorizacao_manual').addEventListener('click', addAutorizacaoManualOnClick);

    window.fornecedores = await getFornecedores();
    window.lojas = await getLojas();
});