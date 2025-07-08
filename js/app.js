
'use strict';

/**
 * Script principal para ESInteractiva.
 * Este archivo orquesta las funcionalidades globales del sitio.
 * Lo envolvemos todo en un 'DOMContentLoaded' para asegurarnos
 * de que el HTML esté listo antes de que empecemos a toquetearlo.
 */
document.addEventListener('DOMContentLoaded', function () {

  // --- Inicialización de todas las funciones globales ---
  initAOS();
  initThemeSwitcher();
  initAccessibilityToggles();
  initLightbox();
  initMobileMenu();

  // --- Funcionalidades específicas de algunas páginas ---
  initUnitPageFeatures();


  /**
   * Inicializa la librería AOS (Animate On Scroll).
   * Para los efectitos de fade-in al scrollear.
   */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, delay: 50 });
    }
  }

  /**
   * Gestiona el cambio entre modo claro y oscuro.
   * Guarda la preferencia en `localStorage`.
   */
  function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (!themeSwitcher) return;

    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-bs-theme', theme);
      themeSwitcher.checked = (theme === 'dark');
    };

    const savedTheme = localStorage.getItem('esinteractiva_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    
    applyTheme(currentTheme);

    themeSwitcher.addEventListener('change', () => {
      const newTheme = themeSwitcher.checked ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('esinteractiva_theme', newTheme);
    });
  }

  /**
   * Gestiona los toggles de accesibilidad: alto contraste y tamaño de fuente.
   * También guarda las preferencias en `localStorage`.
   */
  function initAccessibilityToggles() {
    const highContrastSwitcher = document.getElementById('highContrastSwitcher');
    const fontSizeSwitcher = document.getElementById('fontSizeSwitcher');
    const htmlEl = document.documentElement;

    // Aplicar alto contraste
    if (highContrastSwitcher) {
      const savedContrast = localStorage.getItem('esinteractiva_high_contrast') === 'true';
      highContrastSwitcher.checked = savedContrast;
      if (savedContrast) htmlEl.classList.add('high-contrast');

      highContrastSwitcher.addEventListener('change', () => {
        htmlEl.classList.toggle('high-contrast', highContrastSwitcher.checked);
        localStorage.setItem('esinteractiva_high_contrast', highContrastSwitcher.checked);
      });
    }

    // Aplicar tamaño de fuente
    if (fontSizeSwitcher) {
      const savedFontSize = localStorage.getItem('esinteractiva_large_font') === 'true';
      fontSizeSwitcher.checked = savedFontSize;
      if (savedFontSize) htmlEl.classList.add('font-large');
      
      fontSizeSwitcher.addEventListener('change', () => {
        htmlEl.classList.toggle('font-large', fontSizeSwitcher.checked);
        localStorage.setItem('esinteractiva_large_font', fontSizeSwitcher.checked);
      });
    }
  }

  /**
   * Inicializa la librería GLightbox para todo el sitio.
   */
  function initLightbox() {
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
          selector: '.glightbox',
          touchNavigation: true,
          loop: true,
          autoplayVideos: true,
          openEffect: 'zoom',
          closeEffect: 'zoom',
          skin: 'clean',
      });
    }
  }
  
  /**
   * Gestiona el comportamiento del menú hamburguesa en móviles.
   */
  function initMobileMenu() {
    const navCollapseEl = document.getElementById('mainNav');
    if (!navCollapseEl) return;

    // Añade clase al body para evitar scroll cuando el menú está abierto.
    navCollapseEl.addEventListener('show.bs.collapse', () => {
      document.body.classList.add('menu-open');
    });
    navCollapseEl.addEventListener('hide.bs.collapse', () => {
      document.body.classList.remove('menu-open');
    });

    // Cierra el menú al hacer clic en un enlace, excepto si es el toggle de un dropdown.
    navCollapseEl.addEventListener('click', (e) => {
        const target = e.target;
        if ((target.matches('.nav-link') && !target.matches('.dropdown-toggle')) || target.matches('.dropdown-item')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl);
            if (bsCollapse && navCollapseEl.classList.contains('show')) {
                bsCollapse.hide();
            }
        }
    });
  }

  /**
   * Corrige la navegación del índice lateral para que abra los acordeones.
   */
  function initSidebarAnchors() {
    const sidebar = document.querySelector('.sidebar-anchors');
    if (!sidebar) return;

    sidebar.addEventListener('click', function(event) {
      const link = event.target.closest('a');
      if (!link || !link.hash) return;
      
      const targetElement = document.querySelector(link.hash);
      if (!targetElement) return;

      const accordionItem = targetElement.closest('.accordion-item');
      if (!accordionItem) return; // No es un ancla a un acordeón, comportamiento normal

      const collapseElement = accordionItem.querySelector('.accordion-collapse');
      const isCollapsed = !collapseElement.classList.contains('show');
      
      if (isCollapsed) {
        event.preventDefault();
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
        
        // Esperamos a que el acordeón se muestre completamente para scrollear
        collapseElement.addEventListener('shown.bs.collapse', function () {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, { once: true });

        bsCollapse.show();
      }
    });
  }

  /**
   * Inicializa las funcionalidades específicas de las páginas de unidades.
   */
  function initUnitPageFeatures() {
    const isUnitPage = document.body.hasAttribute('data-bs-spy');
    if (!isUnitPage) return;

    // Inicializa el ScrollSpy de Bootstrap para la navegación interna
    if (typeof bootstrap !== 'undefined') {
        new bootstrap.ScrollSpy(document.body, { target: '#unidad-nav' });
    }
    
    initSidebarAnchors();
    
    // Inicializa los botones de expandir/colapsar el acordeón
    const expandBtn = document.getElementById('expand-all');
    const collapseBtn = document.getElementById('collapse-all');
    const accordionItems = document.querySelectorAll('.accordion-collapse');
    
    if (expandBtn && collapseBtn && accordionItems.length > 0) {
      expandBtn.addEventListener('click', () => {
        accordionItems.forEach(item => bootstrap.Collapse.getOrCreateInstance(item).show());
      });
      collapseBtn.addEventListener('click', () => {
        accordionItems.forEach(item => bootstrap.Collapse.getOrCreateInstance(item).hide());
      });
    }
  }
});