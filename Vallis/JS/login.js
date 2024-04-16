async function submitbutton() {
    const nome_usuario = document.getElementById('username').value;
    const sha512_senha_usuario = await SHA512(document.getElementById('password').value);
    if (nome_usuario && sha512_senha_usuario ) {
        const base64_sha512_senha_usuario = btoa(hexToBytes(sha512_senha_usuario));
        const utf8_base64_sha512_senha_usuario = Base64UTF8(base64_sha512_senha_usuario);
        alert("Usuário: " + nome_usuario + " | Hase (SHA512):  " + sha512_senha_usuario + " | Hash (Base64): " + base64_sha512_senha_usuario + " | Senha (UTF-8): " + utf8_base64_sha512_senha_usuario);
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

//************************************* API REST SECTOR ************************************

   const url = 'https://hzw2e5rbie.execute-api.sa-east-1.amazonaws.com/dev/logar';
    const data = {
        nome_usuario: nome_usuario,
        base64_hash_senha: base64_sha512_senha_usuario
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


