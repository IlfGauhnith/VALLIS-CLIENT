import { getSalt } from './salt.js';
import { armazenarToken } from './token.js';

export async function submitbutton() {
  const nome_usuario = document.getElementById('username').value;
  const senha_usuario = document.getElementById('password').value;
  const empty_field = document.querySelector('.empty__field');
  const invalid_credentials = document.querySelector('.invalid__credentials');
  const loader_login = document.querySelector('.loader__login');

  try {
    document.body.style.cursor = 'wait';
    loader_login.style.display = 'block'; 
    
    if (nome_usuario && senha_usuario) {
      const salt = await getSalt(nome_usuario);
      if (!salt) throw new Error('Erro ao obter salt.');

      const token = await login(nome_usuario, senha_usuario, salt);
      if (!token) throw new Error('Invalid credentials');
    } else {
      loader_login.style.display = 'none';
      invalid_credentials.style.display = 'none';
      empty_field.style.display = 'block';
      setTimeout(() => empty_field.style.display = 'none', 4000);
    }
  } catch (error) {
    loader_login.style.display = 'none';
    empty_field.style.display = 'none';            
    invalid_credentials.style.display = 'block';
    setTimeout(() => invalid_credentials.style.display = 'none', 4000);
  } finally {
    document.body.style.cursor = 'default';
    loader_login.style.display = 'none';
  }
}

async function login(nome_usuario, senha_usuario, salt) {
  try {
    const hash_senha = CryptoJS.PBKDF2(
      senha_usuario, salt, { keySize: 64, iterations: 1000, hasher: CryptoJS.algo.SHA512 }
    ).toString(CryptoJS.enc.Hex);

    const postData = { nome_usuario, hash_senha };
    const response = await axios.post('https://hzw2e5rbie.execute-api.sa-east-1.amazonaws.com/dev/logar', postData);
    const token = response.data.token;

    armazenarToken(token);
    window.location.href = "supplier.html";
    return token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}
