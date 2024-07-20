export function initializeScrollButton() {
    const button = document.querySelector('.up__down__button');
  
    button.addEventListener('click', function() {
      if (button.classList.contains('up')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        button.classList.remove('up');
      } else {
        const footer = document.querySelector('.footer');
        footer.scrollIntoView({ behavior: 'smooth' });
        button.classList.add('up');
      }
    });
  
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
  }

