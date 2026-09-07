// =========================================================
// KASTELLO — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu mobile (hamburger) ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('mobile-open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Botão voltar ao topo ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Animações ao rolar (fade/slide) ---------- */
  const animatedItems = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animatedItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedItems.forEach(item => observer.observe(item));
  } else {
    animatedItems.forEach(item => item.classList.add('in-view'));
  }

  /* ---------- Contadores numéricos (seção "A empresa") ---------- */
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const runCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const duration = 1400;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('pt-BR');
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => counterObserver.observe(c));
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---------- Filtros da galeria ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryImages = document.querySelectorAll('#gallery-grid img');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryImages.forEach(img => {
        const match = filter === 'tudo' || img.getAttribute('data-category') === filter;
        img.classList.toggle('hidden-item', !match);
      });
    });
  });

  /* ---------- Lightbox da galeria ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('active');
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Formulário de orçamento ---------- */
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const tipoObra = form.querySelector('#tipo-obra').selectedOptions[0].text;
      const mensagem = form.mensagem.value.trim();

      // Monta uma mensagem pronta para envio via WhatsApp.
      // Em produção, este formulário pode ser conectado a um serviço
      // de formulários estático (ex: Formspree) ou a este link do WhatsApp.
      const texto = `Olá! Meu nome é ${nome}.%0ATelefone: ${telefone}%0ATipo de obra: ${tipoObra}%0AMensagem: ${mensagem}`;
      const whatsappURL = `https://wa.me/555132612033?text=${encodeURIComponent(texto).replace(/%250A/g, '%0A')}`;

      feedback.textContent = 'Obrigado! Abrindo o WhatsApp para concluir seu orçamento…';

      window.open(whatsappURL, '_blank');
      form.reset();
    });
  }

  /* ---------- Header: leve reforço de fundo ao rolar ---------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.background = window.scrollY > 40
        ? 'rgba(21, 21, 21, 0.98)'
        : 'rgba(21, 21, 21, 0.92)';
    });
  }

});
