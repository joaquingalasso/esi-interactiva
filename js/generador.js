'use strict';

/**
 * Script para el Generador de Actividades.
 * Se encarga de tomar las actividades seleccionadas del formulario
 * y generar un PDF para descargar usando html2pdf.js.
 */
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-pdf');
  const form = document.getElementById('generador-form');
  const loader = document.getElementById('pdf-loader');

  // Si no están los elementos en la página, no hacemos nada.
  if (!downloadBtn || !form || !loader) {
    return;
  }

  downloadBtn.addEventListener('click', () => {
    // 1. Mostramos el loader y desactivamos el botón para que no hagan doble clic
    loader.classList.remove('d-none');
    downloadBtn.disabled = true;

    // 2. Recolectamos las actividades seleccionadas
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    const selectedActivities = Array.from(checkboxes).map(cb => cb.value);

    // 3. Creamos el contenido HTML que se va a convertir en PDF
    let htmlContent = `
      <div style="font-family: sans-serif; padding: 40px; font-size: 12px;">
        <header style="text-align: center; border-bottom: 2px solid #7e36e7; padding-bottom: 10px; margin-bottom: 30px;">
          <h1 style="color: #7e36e7; margin: 0;">Checklist de Actividades ESI</h1>
          <p style="color: #555; margin: 5px 0 0;">Generado desde ESInteractiva (FDA - UNLP)</p>
        </header>
        
        <h2 style="font-size: 1.2em; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Actividades seleccionadas:</h2>
    `;

    if (selectedActivities.length > 0) {
      htmlContent += '<ul style="list-style-type: none; padding-left: 0;">';
      selectedActivities.forEach(activity => {
        htmlContent += `
          <li style="margin-bottom: 15px; display: flex; align-items: flex-start;">
            <span style="font-size: 20px; margin-right: 15px; color: #7e36e7;">&#9744;</span>
            <span style="padding-top: 2px;">${activity}</span>
          </li>
        `;
      });
      htmlContent += '</ul>';
    } else {
      htmlContent += '<p style="color: #777; font-style: italic;">No se seleccionó ninguna actividad.</p>';
    }

    htmlContent += `
        <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 10px; color: #999;">
          <p>Este documento fue generado el ${new Date().toLocaleDateString('es-AR')}.</p>
          <p>Para más recursos, visitá el repositorio ESInteractiva.</p>
        </footer>
      </div>
    `;

    // 4. Configuramos y ejecutamos html2pdf.js
    const options = {
      margin: 1,
      filename: 'checklist-esi-actividades.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    // Usamos una promesa para saber cuándo termina la generación del PDF
    html2pdf().from(htmlContent).set(options).save().then(() => {
        // 5. Ocultamos el loader y reactivamos el botón
        loader.classList.add('d-none');
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error("Hubo un error al generar el PDF:", err);
        loader.classList.add('d-none');
        downloadBtn.disabled = false;
    });
  });
});
