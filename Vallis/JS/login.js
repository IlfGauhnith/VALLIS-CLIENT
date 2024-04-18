
async function submitbutton() {
    const nome_usuario = document.getElementById('username').value;
   const senha_usuario = document.getElementById('password').value;
    if (nome_usuario && senha_usuario) {
        const sha512_senha_usuario = await SHA512(senha_usuario);
   
        alert("Usuário: " + nome_usuario + " | salt " + " | Hase (SHA512):  " + sha512_senha_usuario );
    } else {
        alert("Por favor, preencha todos os campos!");
    }


}

async function SHA512(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}






































































/*

 //    const base64_sha512_senha_usuario = btoa(hexToBytes(sha512_senha_usuario));
 //    const utf8_base64_sha512_senha_usuario = Base64UTF8(base64_sha512_senha_usuario);


function hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
}

// const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function Base64UTF8(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}
*/





