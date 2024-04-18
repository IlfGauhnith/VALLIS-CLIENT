
//************************************* API REST SECTOR SALT ************************************

import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

async function handleLogin(username) {
    try {
      const response = await axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/usuario/salt', {
        username: username
      });
  
      if (response.status === 200) {
        const salt = response.data.salt;
        console.log('Salt recebido:', salt);
      } else {
        console.error('Erro ao receber o salt:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer requisição para receber o salt:', error);
    }
  }
  
  handleLogin('burle-dev');
  