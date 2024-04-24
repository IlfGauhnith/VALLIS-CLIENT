/**
 * Função responsável por manipular o evento do click do 
 * botão submit e delegar as atividades para as outras funções
 * responsáveis pela rotina de login.
 */
async function submitbutton() {

    const nome_usuario = document.getElementById('username').value;
    const senha_usuario = document.getElementById('password').value;
    const campo_vazio_alerta = document.querySelector('.campo__vazio__alerta');
    const credenciais_invalida = document.querySelector('.credenciais__invalida');

    try{
        document.body.style.cursor = 'wait'; 

        if  (nome_usuario && senha_usuario) {

            // Buscar o salt na api-crud
            const salt = await getSalt(nome_usuario);
            if (!salt)
                alert("Erro.");

            // Logar
            const token = await login(nome_usuario, senha_usuario, salt); 
            alert(token);

        } else {
            campo_vazio_alerta.style.display = 'block';
        }

    } catch (error) {
        console.log(error);
    } finally {
        // Retira o cursor de espera após a execução do bloco try-catch
        // Obs: Sempre vai cair nesse caso independente do que ocorrer dentro do try-catch.
        document.body.style.cursor = 'default'; 
    }
}

/**
 * Resposável por realizar a rotina de login. 
 * Aqui a senha e o salt são concatenados e daí então passados para o algoritmo de hash sha512.
 * Após isso a api de autenticação é chamada com esses dados do usuário e espera-se que ela retorne o token 
 * que representa aquele usuário.
 * Após o token ser recebido ele é armazenado no browser para futuros requisições que requerem autenticação.
 * @param {string} nome_usuario 
 * @param {string} senha_usuario 
 * @param {string} salt 
 * @returns 
 */
async function login(nome_usuario, senha_usuario, salt) {
    hash_senha = CryptoJS.PBKDF2(senha_usuario, 
            salt, 
            {keySize: 64, iterations: 1000, hasher: CryptoJS.algo.SHA512}
        ).toString(CryptoJS.enc.Hex);

    postData = {
        nome_usuario: nome_usuario,
        hash_senha: hash_senha
    }

    const response = await axios.post('https://hzw2e5rbie.execute-api.sa-east-1.amazonaws.com/dev/logar', postData);
    const token = response.data.token; 

    //TO-DO ARMAZENAR TOKEN NA SESSÃO DO BROWSER.
    
    return token;
}

/**
 * Responsável por buscar pelo salt do usuário.
 * @param {string} nome_usuario é o nome do usuário ao qual o salt será buscado na api-crud
 */
async function getSalt(nome_usuario) {
    return new Promise((resolve, reject) => {
        var postData = {
            nome_usuario: nome_usuario
        };
        
        axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/usuario/salt', postData)
            .then(response => {
                const salt = response.data.salt;
                resolve(salt);
            })
            .catch(error => {
                reject(error);
            });
    });
}
