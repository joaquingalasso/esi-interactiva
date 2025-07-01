
'use strict';

/**
 * Script principal para el Repositorio ESI.
 * Este archivo se encarga de toda la magia interactiva del sitio.
 * Lo envolvemos todo en un 'DOMContentLoaded' para asegurarnos
 * de que el HTML esté listo antes de que empecemos a toquetearlo.
 */
document.addEventListener('DOMContentLoaded', function () {

  // --- Inicialización de todas las funciones ---
  initAOS();
  initThemeSwitcher();
  initBackToTopButton();
  initUnitPageFeatures();
  initGsapAnimations();
  initLightbox(); // Unica inicialización de GLightbox para todo el sitio


  /**
   * Inicializa la librería AOS (Animate On Scroll).
   * Esto hace que los elementos aparezcan con animaciones chetas
   * a medida que el usuario scrollea la página.
   */
  function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600, // Duración de la animación en milisegundos
      once: true,    // La animación ocurre solo una vez
      delay: 50,     // Retraso antes de que empiece la animación
    });
  }


  /**
   * Gestiona el cambio entre modo claro y oscuro.
   * Guarda la preferencia del usuario en el `localStorage`
   * para que la elección se mantenga entre visitas.
   */
  function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (!themeSwitcher) return;

    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-bs-theme', theme);
      themeSwitcher.checked = (theme === 'dark');
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    
    applyTheme(currentTheme);

    themeSwitcher.addEventListener('change', () => {
      const newTheme = themeSwitcher.checked ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }


  /**
   * Controla la aparición y funcionalidad del botón "Volver Arriba".
   * El botón aparece cuando el usuario scrollea un poco hacia abajo.
   */
  function initBackToTopButton() {
    const backToTopButton = document.getElementById('btn-back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Inicializa las funcionalidades específicas de las páginas de unidades.
   */
  function initUnitPageFeatures() {
    const isUnitPage = document.body.hasAttribute('data-bs-spy');
    if (!isUnitPage) return;

    if (typeof bootstrap !== 'undefined') {
        const scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: '#unidad-nav'
        });
    }
    
    initLiveSearch();
    initExpandCollapseAll();
  }


  /**
   * Implementa un buscador en vivo para filtrar el contenido del acordeón.
   * Solo funciona en las páginas de las unidades.
   */
  function initLiveSearch() {
    const searchInput = document.getElementById('liveSearchInput');
    const accordionContainer = document.getElementById('contenido-acordeon');
    if (!searchInput || !accordionContainer) return;

    const accordionItems = accordionContainer.querySelectorAll('.accordion-item');

    searchInput.addEventListener('keyup', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-button').textContent.toLowerCase();
        const body = item.querySelector('.accordion-body').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || body.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  /**
   * Añade funcionalidad a los botones de "Expandir todo" y "Colapsar todo".
   */
  function initExpandCollapseAll() {
    const expandBtn = document.getElementById('expand-all');
    const collapseBtn = document.getElementById('collapse-all');
    if (!expandBtn || !collapseBtn) return;
    
    const accordionItems = document.querySelectorAll('.accordion-collapse');
    if (accordionItems.length === 0) return;

    expandBtn.addEventListener('click', () => {
      accordionItems.forEach(item => {
        const collapseInstance = bootstrap.Collapse.getOrCreateInstance(item);
        collapseInstance.show();
      });
    });

    collapseBtn.addEventListener('click', () => {
      accordionItems.forEach(item => {
        const collapseInstance = bootstrap.Collapse.getOrCreateInstance(item);
        collapseInstance.hide();
      });
    });
  }

  /**
   * Inicializa la librería GLightbox para todo el sitio.
   * Busca elementos con la clase .glightbox para abrir imágenes, videos, etc.
   */
  function initLightbox() {
    if (typeof GLightbox === 'undefined') {
      console.warn('GLightbox library not found. Skipping lightbox functionality.');
      return;
    }
    
    const lightbox = GLightbox({
        selector: '.glightbox', // Selector universal para todos los lightboxes
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        openEffect: 'zoom', // 'zoom', 'fade', 'none'
        closeEffect: 'zoom',
        skin: 'clean', // 'clean', 'modern', 'presto'
    });
  }

  /**
   * Inicializa animaciones con GSAP, como el hover en la tarjeta de bibliografía.
   */
  function initGsapAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP library not found. Skipping animations.');
      return;
    }

    const biblioCard = document.querySelector('.bibliografia-drive');
    if (biblioCard) {
      gsap.set(biblioCard, { transformOrigin: 'center center' });
      
      biblioCard.addEventListener('mouseenter', () => {
        gsap.to(biblioCard, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
      });
      
      biblioCard.addEventListener('mouseleave', () => {
        gsap.to(biblioCard, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }

});
