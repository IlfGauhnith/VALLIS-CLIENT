import ('../sha512.js')
  .then(() => {
    // O arquivo foi importado com sucesso.
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao importar o script:', error);
  });

//function submit__button() {

//    let nome_usuario = "junk-lab";
//  let senha_usuario = "3451";
//  var sha512_senha_usuario =SHA512(senha_usuario).toString(enc.Hex);
//    var base64_sha512_senha_usuario = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(sha512_senha_usuario));
//    var hash_senha = CryptoJS.enc.Utf8.parse(base64_sha512_senha_usuario);

//   console.log(nome_usuario + " " + sha512_senha_usuario)
    
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
//}


