async function calcularHashSHA512(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
const texto = 'Olá, ';
calcularHashSHA512(texto).then(hash => {
    console.log('Hash SHA-512:', hash);
});




//<input type="text" id="textoInput" placeholder="Digite o texto">
//<button onclick="calcularHash()">Calcular Hash</button>

    async function calcularHash() {
        const texto = document.getElementById('textoInput').value;
        const hash = await SHA512(texto);
        console.log('Hash SHA-512:', hash);
    }

    async function SHA512(texto) {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }