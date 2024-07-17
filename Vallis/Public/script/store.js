  document.addEventListener('DOMContentLoaded', () => {
// Selecionar o elemento 'sand-loader' e seu Shadow DOM
    const sandLoaderElement = document.querySelector('sand-loader');
      if (sandLoaderElement) {
        const sandLoader = sandLoaderElement.shadowRoot.querySelector('.hourglassBackground');
// Verificar se o elemento foi encontrado e definir seu display como 'block'
      if (sandLoader) {
        sandLoader.style.display = 'block';
      } 
    }
  });
