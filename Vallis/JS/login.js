
function submitbutton() {
    const nome_usuario = document.getElementById('username').value;
    const senha_usuario = document.getElementById('password').value;

    if (nome_usuario && senha_usuario) 
        token = login(nome_usuario, senha_usuario);
    else 
        alert("Por favor, preencha todos os campos!");

}

function login(nome_usuario, senha) {
    getSalt(nome_usuario)
        .then(salt => {
            alert(salt);
        })
        .catch(error => {
            console.error('Error fetching salt:', error);
        });
}

function getSalt(nome_usuario) {
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
