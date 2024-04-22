
async function submitbutton() {

    const nome_usuario = document.getElementById('username').value;
    const senha_usuario = document.getElementById('password').value;
    const hash_senha = await SHA512 (senha_usuario);
    const hash_senha_array = CryptoJS.enc.Utf8.parse(hash_senha);

    if (nome_usuario && senha_usuario)
        token = login(nome_usuario, senha_usuario);  
    else
        alert("Por favor, preencha todos os campos!");
    
        document.body.style.cursor = 'wait';
    const salt = await getSalt(nome_usuario);
        if (!salt) {
        alert('Erro.');
        return;
        }else{document.body.style.cursor = 'default';}
        
    const hash = CryptoJS.PBKDF2(hash_senha_array, salt, {
        keySize: 64,
        iterations: 1000,
        hasher: CryptoJS.algo.SHA512
    }).toString(CryptoJS.enc.Hex);

        console.log(" Nome do usuário de drogas: ", nome_usuario , " |  Hash da senha com salt: " , hash );

}

async function SHA512(str) {
    const encoder = new TextEncoder();
  
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }

function login(nome_usuario, senha_usuario ) {
    getSalt(nome_usuario)
        .then(salt => {
//         alert(salt);
        })
        .catch(error => {
            console.error('Error fetching salt:', error);
        });
}

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


