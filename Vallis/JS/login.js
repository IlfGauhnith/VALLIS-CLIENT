function submit__button() {
    let nome_usuario = document.getElementById('username').value;
    let senha_usuario = document.getElementById('password').value;
    async function sha512() { 
    }
    async function validateLogin() {
      try {
        const hash_senha_usuario = await sha512(senha_usuario);
        alert("Hash SHA-512:", hash_senha_usuario + " " + nome_usuario);
       
      } catch (error) {
        console.error('Error generating hash:', error);
        
      }
    }
    validateLogin();
    
  }
  
        
 
// var sha512_senha_usuario =SHA512(senha_usuario).toString(enc.Hex);


//  alert(nome_usuario + " " + senha_usuario)
    
 /*   const url = 'https://hzw2e5rbie.execute-api.sa-east-1.amazonaws.com/dev/logar';
    const data = {
        nome_usuario: nome_usuario,
        base64_hash_senha: hash_senha 
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.token) {
            alert('Token JWT: ' + data.token);
        } else {
            throw new Error('Token JWT não encontrado.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro na requisição.');
    });
*/


//    var base64_sha512_senha_usuario = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(sha512_senha_usuario));
//    var hash_senha = CryptoJS.enc.Utf8.parse(base64_sha512_senha_usuario);
