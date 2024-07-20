export async function getSalt(nome_usuario) {
    try {
      const postData = { nome_usuario };
      const response = await axios.post('https://53zy5jvqw2.execute-api.sa-east-1.amazonaws.com/dev/usuario/salt', postData);
      return response.data.salt;
    } catch (error) {
      console.error('Erro ao buscar salt:', error);
      return null;
    }
  }

