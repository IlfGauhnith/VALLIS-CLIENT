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

function unmaskCurrency(maskedValue) {
    const unmaskedValue = maskedValue.replace(/[^\d,.-]/g, '');
    const normalizedValue = unmaskedValue.replace(',', '.');
    return parseFloat(normalizedValue);
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

async function extractDuplicatasFromTable(tableElement) {
    const duplicatas = [];

    // Get all table rows except the header row
    const rows = tableElement.querySelectorAll('tbody tr');

    for (const row of rows) {
        const duplicata = {};

        // Get values from each row
        const duplicataNumber = row.querySelector('td span').textContent;
        const valor = row.querySelector('td:nth-child(2) input').value;
        const vencimento = row.querySelector('td:nth-child(3) input').value;
        const arquivo = await fileToBase64(row.querySelector('td:nth-child(4) input').files[0]);

        // Populate duplicata object
        duplicata.numero = parseInt(duplicataNumber);
        duplicata.valor = unmaskCurrency(valor);
        duplicata.data_vencimento = vencimento;
        duplicata.base64_arquivo = arquivo;

        duplicatas.push(duplicata);
    }

    return duplicatas;
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Remove data URL prefix
            resolve(base64String);
        };

        reader.onerror = () => {
            reject(new Error('Unable to read file as base64'));
        };

        reader.readAsDataURL(file);
    });
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

    table.setAttribute('name', 'duplicata_table');

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

function createInputDiv(label_text, input_type, style, accept, onInputFunction, name) {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add(style);

    const inputLabel = document.createElement('label');
    inputLabel.textContent = label_text;

    const input = document.createElement('input');
    input.setAttribute('type', input_type);

    if (label_text)
        inputDiv.append(inputLabel, input);
    else
        inputDiv.append(input);

    if (accept)
        input.setAttribute('accept', accept);

    if (onInputFunction)
        input.addEventListener('input', onInputFunction);

    if (name)
        input.setAttribute('name', name);

    return inputDiv;
}

function createBreakFlexRow() {
    const div = document.createElement('div');
    div.classList.add('break__flex__row');

    return div;
}

async function createSelectDiv(label_text, populate_function, name) {
    const selectDiv = document.createElement('div');
    selectDiv.classList.add('input_div');

    const selectLabel = document.createElement('label');
    selectLabel.textContent = label_text;

    var select = document.createElement('select');
    select = await populate_function(select);

    select.setAttribute('name', name);

    selectDiv.append(selectLabel, select);
    return selectDiv;
}

function createUploadButtonDiv() {
    const div = document.createElement('div');
    div.classList.add('upload_button_div');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-upload');
    icon.classList.add('fa-xl');
    icon.classList.add('upload_button')

    icon.addEventListener('click', uploadButtonOnClick);

    div.append(icon);
    return div;
}

async function uploadButtonOnClick(event) {
    const autorizacaoBlock = event.target.closest('.autorizacao__block__div')
    const duplicatasTable = autorizacaoBlock.querySelector('table[name="duplicata_table"]');

    const duplicatas = await extractDuplicatasFromTable(duplicatasTable);

    data = {
        id_fornecedor: parseInt(autorizacaoBlock.querySelector('select[name="fornecedorSelect"]').value),
        id_loja: parseInt(autorizacaoBlock.querySelector('select[name="lojaSelect"]').value),

        nota_fiscal: {
            numero: autorizacaoBlock.querySelector('input[name="numeroNota"]').value,
            valor: unmaskCurrency(autorizacaoBlock.querySelector('input[name="valorNota"]').value),
            data_emissao: autorizacaoBlock.querySelector('input[name="dataEmissao"]').value,
            base64_arquivo: await fileToBase64(autorizacaoBlock.querySelector('input[name="nfFile"]').files[0])
        },

        duplicata: duplicatas
    }

    console.log(data);
}
async function addAutorizacaoManualOnClick(event) {
    const autorizacaoBlock = document.createElement('div');
    autorizacaoBlock.classList.add('autorizacao__block__div');

    const autorizacaoTitleDiv = createAutorizacaoTitleElement(autorizacaoBlock);

    const fornecedorDiv = await createSelectDiv('Fornecedor', populateFornecedoresSelect, 'fornecedorSelect');
    const lojaDiv = await createSelectDiv('Loja', populateLojaSelect, 'lojaSelect');
    const numeroNotaDiv = createInputDiv('Número da Nota Fiscal', 'text', 'input_div', null, null, 'numeroNota');
    const nfFileDiv = createInputDiv('Arquivo NF', 'file', 'input_div', '.pdf', null, 'nfFile');
    const valorNotaDiv = createInputDiv('Valor', 'text', 'input_div', null, mascaraMoeda, 'valorNota');
    const dataEmissaoDiv = createInputDiv('Data de Emissão', 'date', 'input_div', null, null, 'dataEmissao');
    const duplicataTable = createDuplicataTableDiv();

    autorizacaoBlock.append(autorizacaoTitleDiv, fornecedorDiv, lojaDiv,
        createBreakFlexRow(),
        numeroNotaDiv, nfFileDiv, dataEmissaoDiv, valorNotaDiv,
        createBreakFlexRow(),
        duplicataTable,
        createBreakFlexRow(),
        createUploadButtonDiv());

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