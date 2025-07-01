
'use strict';

/**
 * Script para la página de la Línea de Tiempo.
 * Carga los datos de los hitos y renderiza la línea de tiempo interactiva con Vis.js.
 */
document.addEventListener('DOMContentLoaded', function () {
  
  // --- DATOS DE LA LÍNEA DE TIEMPO ---
  // Acá está toda la información de los hitos. Para agregar uno nuevo,
  // simplemente añadí un objeto más a esta lista siguiendo la misma estructura.
  const eventos = [
    { ano: 1989, mes: 11, dia: 20, titulo: 'Convención sobre los Derechos del Niño', descripcion: 'Establece que los niños son sujetos de derecho y obliga a los gobiernos a respetar y proteger derechos civiles, políticos, económicos, sociales y culturales, y proteger contra el abuso y la explotación.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=CDN+1989', link: 'https://www.un.org/es/events/childrenday/convention.shtml', fuente: 'ONU' },
    { ano: 1990, mes: 9, dia: 27, titulo: 'Ratificación argentina de la CDN', descripcion: 'Mediante la Ley 23.849, Argentina ratifica la Convención sobre los Derechos del Niño, comprometiéndose a cumplir con sus disposiciones.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+23.849', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/828/norma.htm', fuente: 'InfoLeg' },
    { ano: 1994, mes: 8, dia: 22, titulo: 'Reforma Constitucional Argentina', descripcion: 'Se sancionó la reforma constitucional que incorporó nuevos derechos y garantías, otorgando jerarquía constitucional a tratados internacionales como la Convención sobre los Derechos del Niño.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=CN+1994', link: 'https://es.wikipedia.org/wiki/Reforma_constitucional_argentina_de_1994', fuente: 'Wikipedia' },
    { ano: 2002, mes: 11, dia: 28, titulo: 'Ley 25.673 de Salud Sexual', descripcion: 'Crea el Programa Nacional de Salud Sexual y Procreación Responsable. Fue la primera ley integral en salud sexual y reproductiva, garantizando acceso a métodos anticonceptivos e información.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+25.673', link: 'https://www.argentina.gob.ar/normativa/nacional/ley-25673-80277', fuente: 'Argentina.gob.ar' },
    { ano: 2005, mes: 9, dia: 28, titulo: 'Ley 26.061 de Protección Integral', descripcion: 'Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes. Establece la protección integral de su integridad física, psíquica, sexual y moral.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+26.061', link: 'https://www.argentina.gob.ar/normativa/nacional/ley-26061-110778', fuente: 'Argentina.gob.ar' },
    { ano: 2006, mes: 10, dia: 4, titulo: 'Sanción de la Ley ESI (26.150)', descripcion: 'El Congreso de la Nación sanciona la Ley 26.150 que crea el Programa Nacional de Educación Sexual Integral.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=ESI+Sanción', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/120000-124999/121222/norma.htm', fuente: 'InfoLeg' },
    { ano: 2006, mes: 10, dia: 23, titulo: 'Promulgación Ley 26.150', descripcion: 'Se promulga la Ley de Educación Sexual Integral, estableciendo la obligatoriedad de brindar ESI en todos los niveles del sistema educativo.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=ESI+Promulgación', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/120000-124999/121222/norma.htm', fuente: 'InfoLeg' },
    { ano: 2006, mes: 12, dia: 14, titulo: 'Ley de Educación Nacional (26.206)', descripcion: 'Establece la obligatoriedad de la educación secundaria y regula el ejercicio del derecho de enseñar y aprender en todo el país.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+26.206', link: 'https://www.argentina.gob.ar/educacion/ley-de-educacion-nacional', fuente: 'Argentina.gob.ar' },
    { ano: 2008, mes: 5, dia: 28, titulo: 'Lineamientos Curriculares ESI', descripcion: 'El Consejo Federal de Educación aprueba los Lineamientos Curriculares para la ESI (Resolución 45/08), ofreciendo un marco común de contenidos.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Lineamientos', link: 'https://www.argentina.gob.ar/sites/default/files/lineamientos_0.pdf', fuente: 'Argentina.gob.ar' },
    { ano: 2010, mes: 7, dia: 15, titulo: 'Ley de Matrimonio Igualitario', descripcion: 'Se sanciona la Ley 26.618. Argentina se convierte en el primer país de América Latina en legalizar el matrimonio entre personas del mismo sexo.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Matrimonio+Igualitario', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/165000-169999/169608/norma.htm', fuente: 'InfoLeg' },
    { ano: 2012, mes: 5, dia: 9, titulo: 'Ley de Identidad de Género', descripcion: 'Se sanciona la Ley 26.743, que reconoce el derecho a la identidad de género autopercibida, un hito a nivel mundial.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Identidad+de+Género', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/197860/norma.htm', fuente: 'InfoLeg' },
    { ano: 2015, mes: 8, dia: 1, titulo: 'Entrada en vigencia del Código Civil y Comercial', descripcion: 'El nuevo código incorpora figuras como la responsabilidad parental, el divorcio incausado y la protección de la vivienda familiar, alineándose con nuevos paradigmas de derechos.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=CCyC', link: 'https://www.argentina.gob.ar/justicia/codigos/codigo-civil-y-comercial', fuente: 'Argentina.gob.ar' },
    { ano: 2018, mes: 9, dia: 13, titulo: 'Resolución CFE N°340/18', descripcion: 'Refuerza la implementación de la obligatoriedad de la ESI en todos los niveles y modalidades educativas, ante resistencias y debates públicos.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Res+340/18', link: 'https://www.argentina.gob.ar/sites/default/files/anexo_resolucion_cfe_340_18_0.pdf', fuente: 'Argentina.gob.ar' },
    { ano: 2020, mes: 12, dia: 30, titulo: 'Aprobación Ley IVE (27.610)', descripcion: 'El Senado aprueba la Ley de Interrupción Voluntaria del Embarazo, legalizando el aborto hasta la semana 14 de gestación.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=IVE+es+Ley', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/345000-349999/346235/norma.htm', fuente: 'InfoLeg' },
    { ano: 2021, mes: 7, dia: 21, titulo: 'Decreto 476/2021 (DNI no binario)', descripcion: 'Se establece la posibilidad de incluir la opción "X" en el campo de sexo en el DNI y pasaporte, reconociendo identidades no binarias.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=DNI+X', link: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/247298/20210721', fuente: 'Boletín Oficial' },
  ];


  const container = document.getElementById('timeline-container');
  const detailsPanel = document.getElementById('timeline-details');

  if (!container) return; // Si no está el div, no seguimos

  // 1. Mapeamos nuestros datos al formato que espera Vis.js
  const items = new vis.DataSet(eventos.map((evento, index) => ({
    id: index,
    content: `${evento.ano}: ${evento.titulo}`,
    start: `${evento.ano}-${String(evento.mes).padStart(2, '0')}-${String(evento.dia).padStart(2, '0')}`,
    // Guardamos nuestros datos personalizados para usarlos después
    custom: evento
  })));

  // 2. Definimos las opciones de la línea de tiempo
  const options = {
    height: '350px',
    minHeight: '300px',
    maxHeight: '400px',
    start: '2000-01-01',
    end: new Date().getFullYear() + 2 + '-01-01',
    // Habilitamos la navegación con el mouse y gestos táctiles
    zoomable: true,
    moveable: true,
    // Límites de zoom para no perderse
    zoomMin: 1000 * 60 * 60 * 24 * 30 * 6, // 6 meses
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 25, // 25 años
  };

  // 3. Creamos la línea de tiempo
  const timeline = new vis.Timeline(container, items, options);

  // 4. Creamos la función para mostrar los detalles de un hito
  const showDetails = (item) => {
    detailsPanel.classList.remove('empty-state');
    
    // El HTML para la tarjeta de detalles
    detailsPanel.innerHTML = `
      <div class="card w-100">
        <div class="card-body">
          <div class="row g-4 align-items-center">
            <div class="col-md-4">
              <a href="${item.custom.imagen}" class="glightbox" data-gallery="timeline" title="${item.custom.titulo}">
                <img src="${item.custom.imagen}" alt="Imagen de ${item.custom.titulo}" class="img-fluid rounded shadow-sm">
              </a>
            </div>
            <div class="col-md-8">
              <h4 class="card-title">${item.custom.titulo}</h4>
              <p class="card-text">${item.custom.descripcion}</p>
              <a href="${item.custom.link}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">
                Ver fuente (${item.custom.fuente}) <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Es necesario Reinicializar GLightbox para que detecte el nuevo link que acabamos de crear
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
        });
    }
  };

  // 5. Escuchamos el evento 'select' en la línea de tiempo
  timeline.on('select', (properties) => {
    const selectedIds = properties.items;
    if (selectedIds.length > 0) {
      const selectedItem = items.get(selectedIds[0]);
      showDetails(selectedItem);
    }
  });

});
