/**
 *------------------------------------------------------------------------------------------------------------
 ******************************* Inicio da regra de negócio do login usúario. ********************************
 *------------------------------------------------------------------------------------------------------------ 
 * Função responsável por manipular o evento do click do 
 * botão submit e delegar as atividades para as outras funções
 * responsáveis pela rotina de login.
 */
async function submitbutton() {
  const nome_usuario = document.getElementById('username').value;
  const senha_usuario = document.getElementById('password').value;
  const empty_field = document.querySelector('.empty__field');
  const invalid_credentials = document.querySelector('.invalid__credentials');
  const loader_login = document.querySelector('.loader__login');
  
  try{
    document.body.style.cursor = 'wait';
    loader_login.style.display = 'block'; 
    
    if  (nome_usuario && senha_usuario) {

// Buscar o salt na api-crud
      const salt = await getSalt(nome_usuario);
        if (!salt)
           alert("Erro.");

// Logar
        const token = await login(nome_usuario, senha_usuario, salt);
//alert(token);

    }
/**
 * Caso o usuário não preencha todos os campos essa mensagem aparecerá 
 * iformando ao usuário para preencher todos os campos.
 * Obs: Exisite a necessidade de deixar a display de outras mensagens de
 * erro com o valor 'none' para que não tenha conflito de mensagens de erro.  
 */ 
    else {
      loader_login.style.display = 'none';
      invalid_credentials.style.display = 'none';
      empty_field.style.display = 'block';
      setTimeout(function() {
        empty_field.style.display = 'none';
      }, 4000);
    }
  }
    
/**
 * Caso o usuário, senha ou ambos estiverem incorretos essa mensagem aparecerá
 * informando ao usuário a tentativa de malsucedida de login.
 * Obs: Exisite a necessidade de deixar a display de outras mensagens de
 * erro com o valor 'none' para que não tenha conflito de mensagens de erro.
 */
    catch (error){    
      loader_login.style.display = 'none';
      empty_field.style.display = 'none';            
      invalid_credentials.style.display = 'block';
      setTimeout(function() {
        invalid_credentials.style.display = 'none';
      }, 4000);

      return null;   
    } finally {
// Retira o cursor de espera após a execução do bloco try-catch
// Obs: Sempre vai cair nesse caso independente do que ocorrer dentro do try-catch.
      document.body.style.cursor = 'default';
      loader_login.style.display = 'none';

    }
}

/**
 * Resposável por realizar a rotina de login. 
 * Aqui a senha e o salt são concatenados e daí então passados para o algoritmo de hash sha512.
 * Após isso a api de autenticação é chamada com esses dados do usuário e espera-se que ela retorne o token 
 * que representa aquele usuário.
 * Após o token ser recebido ele é armazenado no browser para futuros requisições que requerem autenticação.
 * @param {string} nome_usuario 
 * @param {string} senha_usuario 
 * @param {string} salt 
 * @returns 
 */
async function login(nome_usuario, senha_usuario, salt) {

// Concatena a senha com o salt e calcula o sha512.
  hash_senha = CryptoJS.PBKDF2(senha_usuario, 
          salt, 
          {keySize: 64, iterations: 1000, hasher: CryptoJS.algo.SHA512}
      ).toString(CryptoJS.enc.Hex);

// Corpo da requisição de login
    postData = {
        nome_usuario: nome_usuario,
        hash_senha: hash_senha
    }

// Requisição de login
    const response = await axios.post('https://hzw2e5rbie.execute-api.sa-east-1.amazonaws.com/dev/logar', postData);
    const token = response.data.token; 

//TO-DO ARMAZENAR TOKEN NA SESSÃO DO BROWSER.
       sessionStorage.setItem('token', token);

/** 
* Faz o direcionamento pra a Pagina de fornecedores.
* Obs: Essa função é provisória. 
*/     window.location.href = "supplier.html"

  return token;
        
}

/**
 * Responsável por buscar pelo salt do usuário.
 * @param {string} nome_usuario é o nome do usuário ao qual o salt será buscado na api-crud
 */
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

/*
 * Interceptor de requisição que adiciona o cabeçalho de autorização em todas as requisições 
 * feita pela bíblioteca Axios. Se token estiver armazenado em sessionStorage adiciona o token
 * ao cabeçalho Authorization da requisição com o prefixo "Bearer".
 */

axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


/* Carregamento do DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function() {

/* Faz a ação do botão que leva a página para o footer e do footer para o topo da página */
    const button = document.querySelector('.up__down__button');
  
    button.addEventListener('click', function() {
        if (button.classList.contains('up')) {
/* Leva para o top da página */ 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            button.classList.remove('up');
        } else {
/* Leva para o footer da página */
            const footer = document.querySelector('.footer');
            footer.scrollIntoView({ behavior: 'smooth' });
            button.classList.add('up');
        }
    });
/* Faz a mudança do icon do botão up/down da página */  
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const footer = document.querySelector('.footer');
        const footerTop = footer.offsetTop;
    
        if (scrolled + window.innerHeight >= document.documentElement.scrollHeight) {
            button.classList.add('up');
        } else {
            button.classList.remove('up');
        }
    });
  });
  
/**
 *------------------------------------------------------------------------------------------------------------
 ***************************** Conclusão da regra de negócio do login usúario. *******************************
 *------------------------------------------------------------------------------------------------------------ 
 */