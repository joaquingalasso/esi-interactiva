
'use strict';

/**
 * Script para la página del Collage Multimedia.
 * Se encarga de inicializar Isotope para la grilla Masonry y los filtros.
 */
document.addEventListener('DOMContentLoaded', function () {
  
  const grid = document.querySelector('.collage-grid');
  const filterButtonsContainer = document.querySelector('.collage-filters');

  // Si no encontramos la grilla en la página, no hacemos nada.
  if (!grid || !filterButtonsContainer) {
    return;
  }

  // Inicializamos Isotope una vez que las imágenes hayan cargado, para que calcule bien el layout
  imagesLoaded(grid, function () {
    const iso = new Isotope(grid, {
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      masonry: {
        // Usamos el ancho de la columna para un layout prolijo
        columnWidth: '.grid-item'
      }
    });

    // Manejamos los clics en los botones de filtro
    filterButtonsContainer.addEventListener('click', function (event) {
      // Nos aseguramos de que el clic fue en un botón
      if (!event.target.matches('button')) {
        return;
      }
      
      const filterValue = event.target.getAttribute('data-filter');
      
      // Aplicamos el filtro en Isotope
      iso.arrange({ filter: filterValue });

      // Actualizamos la clase 'is-checked' para el botón activo
      const checkedButton = filterButtonsContainer.querySelector('.is-checked');
      if (checkedButton) {
        checkedButton.classList.remove('is-checked');
      }
      event.target.classList.add('is-checked');
    });
  });

});

// Pequeño helper para Isotope, en caso de que la librería imagesLoaded no esté disponible
// (aunque para un mejor resultado, se recomienda incluirla desde un CDN)
function imagesLoaded(container, callback) {
    const images = container.querySelectorAll('img');
    let loadedCount = 0;
    const imageCount = images.length;
    if (imageCount === 0) {
        callback();
        return;
    }
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === imageCount) {
                    callback();
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                 if (loadedCount === imageCount) {
                    callback();
                }
            });
        }
    });
     if (loadedCount === imageCount) {
        callback();
    }
}
