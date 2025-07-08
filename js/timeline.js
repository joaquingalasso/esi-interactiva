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
    { ano: 1989, mes: 11, dia: 20, titulo: 'Convención sobre los Derechos del Niño', descripcion: 'Establece que los niños son sujetos de derecho y obliga a los gobiernos a respetar y proteger derechos civiles, políticos, económicos, sociales y culturales, y proteger contra el abuso y la explotación.', imagen: 'https://www.unicef.es/sites/unicef.es/files/communication/portadadelaCDN.JPG', link: 'https://www.un.org/es/events/childrenday/convention.shtml', fuente: 'ONU' },
    { ano: 1990, mes: 9, dia: 27, titulo: 'Ratificación argentina de la CDN', descripcion: 'Ley 23.849.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+23.849', link: 'http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/828/norma.htm', fuente: 'InfoLeg' },
    { ano: 1994, mes: 8, dia: 22, titulo: 'Reforma Constitucional Argentina', descripcion: 'Se sancionó la reforma constitucional que incorporó nuevos derechos y garantías, incluyendo tratados internacionales con jerarquía constitucional.', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Convencionales_constituyentes_1994.jpg/1024px-Convencionales_constituyentes_1994.jpg', link: 'https://es.wikipedia.org/wiki/Reforma_constitucional_argentina_de_1994', fuente: 'Wikipedia' },
    { ano: 2002, mes: 11, dia: 28, titulo: 'Ley 25.673', descripcion: 'Programa Nacional de Salud Sexual y Procreación Responsable. Primera ley integral en salud sexual y reproductiva. Brinda acceso a métodos anticonceptivos, información y atención médica.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+25.673', link: 'https://www.argentina.gob.ar/sites/default/files/ley_25673_decretos_declaracion_de_repudio.pdf', fuente: 'Ministerio de Salud' },
    { ano: 2005, mes: 9, dia: 28, titulo: 'Ley 26.061 de Protección Integral de NNyA', descripcion: 'Establece que los niños, niñas y adolescentes tienen derecho a una protección integral que abarque su integridad física, psíquica, sexual y moral.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+26.061', link: 'https://www.argentina.gob.ar/noticias/15-anos-de-la-ley-26061', fuente: 'Argentina.gob.ar' },
    { ano: 2006, mes: 10, dia: 4, titulo: 'Sanción Ley 26.150 (ESI)', descripcion: 'Sanción de la ley de Educación Sexual Integral.', imagen: 'https://www.argentina.gob.ar/sites/default/files/ley_26150_de_educacion_sexual_integral.jpg', link: 'https://www4.hcdn.gob.ar/archivos/genero/archivos/NORMATIVAS_TODAS_JUNTAS_(1)_(1)-7%5B1%5D.pdf', fuente: 'Ministerio de Educación' },
    { ano: 2006, mes: 10, dia: 23, titulo: 'Promulgación Ley 26.150', descripcion: 'Establece la obligatoriedad de brindar Educación Sexual Integral en todos los niveles del sistema educativo.', imagen: 'https://redmapa.org/wp-content/uploads/2021/12/ESI.png', link: 'https://redmapa.org/2021/12/21/ley-26-150-de-educacion-sexual-integral/', fuente: 'Ministerio de Educación' },
    { ano: 2006, mes: 12, dia: 14, titulo: 'Ley 26.206 de Educación Nacional', descripcion: 'Establece la obligatoriedad de la educación secundaria y regula el ejercicio del derecho de enseñar y aprender.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+26.206', link: 'https://www.argentina.gob.ar/sites/default/files/ley-de-educ-nac-58ac89392ea4c.pdf', fuente: 'Argentina.gob.ar' },
    { ano: 2008, mes: 5, dia: 28, titulo: 'Lineamientos Curriculares para la ESI', descripcion: 'Resolución CFE N.º 45/08. Propósitos formativos y lineamientos curriculares a partir de los cuales las jurisdicciones fundamentan sus diseños curriculares.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Lineamientos', link: 'https://www.argentina.gob.ar/sites/default/files/lineamientos_0.pdf', fuente: 'Argentina.gob.ar' },
    { ano: 2010, mes: 7, dia: 15, titulo: 'Ley 26.618 de Matrimonio Igualitario', descripcion: 'Argentina se convierte en el primer país de América Latina en legalizar el matrimonio entre personas del mismo sexo.', imagen: 'https://www.telam.com.ar/advf/imagenes/2020/07/5f0f3d611c068_800x450.jpg', link: 'https://www.argentina.gob.ar/sites/default/files/ley_26618.pdf', fuente: 'INADI' },
    { ano: 2010, mes: 11, dia: 25, titulo: 'Ley 26.657 de Salud Mental', descripcion: 'En ningún caso puede hacerse diagnóstico en el campo de la salud mental sobre la base exclusiva de elección o identidad sexual (Art. 3c).', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+26.657', link: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/175000-179999/175977/norma.htm', fuente: 'InfoLeg' },
    { ano: 2012, mes: 5, dia: 9, titulo: 'Ley 26.743 de Identidad de Género', descripcion: 'Reconoce el derecho a la identidad de género autopercibida, sin diagnósticos ni autorizaciones judiciales.', imagen: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Marcha_del_Orgullo_de_Buenos_Aires_2012_-_4.jpg', link: 'https://www.argentina.gob.ar/sites/default/files/ley_26743.pdf', fuente: 'Ministerio de Justicia y DDHH' },
    { ano: 2015, mes: 8, dia: 1, titulo: 'Entrada en vigencia del Código Civil y Comercial', descripcion: 'Deberes y derechos sobre el cuidado de los hijos; extinción, privación, suspensión y rehabilitación de la responsabilidad parental; plazos de prescripción.', imagen: 'https://www.abogadosrosario.com/adjuntos/blog/000/017/0000017124.jpg', link: 'https://www.saij.gob.ar/1-agosto-2015-sera-fecha-entrada-vigencia-codigo-civil-comercial-nacion-1-agosto-2015-sera-fecha-entrada-vigencia-codigo-civil-comercial-nacion-nv9938-2014-12-16/123456789-0abc-d83-99ti-lpssedadevon', fuente: 'SAIJ' },
    { ano: 2018, mes: 9, dia: 13, titulo: 'Resolución N°340/18 del CFE', descripcion: 'Implementación de la obligatoriedad de la educación sexual integral en todos los niveles y modalidades educativas.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Resolución+340/18', link: 'https://www.argentina.gob.ar/sites/default/files/anexo_resolucion_cfe_340_18_0.pdf', fuente: 'Argentina.gob.ar' },
    { ano: 2020, mes: 12, dia: 29, titulo: 'Aprobación Ley IVE', descripcion: 'Aprobación del Proyecto de Ley de Interrupción Voluntaria del Embarazo. Uno de los cambios respecto al proyecto 2018 fue el plazo máximo a 14 semanas.', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Votaci%C3%B3n_del_aborto_en_el_Senado_de_la_Naci%C3%B3n_Argentina_en_2020.jpg/1280px-Votaci%C3%B3n_del_aborto_en_el_Senado_de_la_Naci%C3%B3n_Argentina_en_2020.jpg', link: 'https://es.wikipedia.org/wiki/Proyecto_de_Ley_de_Interrupci%C3%B3n_Voluntaria_del_Embarazo_(Argentina)', fuente: 'Wikipedia' },
    { ano: 2021, mes: 1, dia: 24, titulo: 'Entrada en vigencia de la Ley 27.610 de IVE', descripcion: 'La Ley Nº 27.610 de Acceso a la Interrupción Voluntaria del Embarazo entró en vigencia en todo el territorio nacional.', imagen: 'https://placehold.co/800x600/7e36e7/white?text=Ley+IVE', link: 'https://www.argentina.gob.ar/noticias/ley-no-27610-acceso-la-interrupcion-voluntaria-del-embarazo-ive-obligatoriedad-de-brindar', fuente: 'Argentina.gob.ar' },
    { ano: 2021, mes: 7, dia: 21, titulo: 'Decreto 476/2021 (DNI no binario)', descripcion: 'Inclusión de la opción “X” en DNI y pasaporte.', imagen: 'https://www.pagina12.com.ar/fotos/20210721/p12g21-002f01.jpg', link: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/247298/20210721', fuente: 'Boletín Oficial' },
    { ano: 2024, mes: 12, dia: 3, titulo: 'Eliminación de políticas de salud sexual', descripcion: 'El gobierno de Javier Milei cesó las políticas estatales de control de natalidad y salud sexual, delegando estas responsabilidades a las provincias.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Retroceso+2024', link: 'https://elpais.com/argentina/2024-12-03/milei-deja-a-argentina-sin-politicas-estatales-de-control-de-natalidad-y-de-salud-sexual.html', fuente: 'El País' },
    { ano: 2024, mes: 10, dia: 27, titulo: 'Promoción de la abstinencia sexual', descripcion: 'La Secretaría de Educación realizó capacitaciones con la ONG chilena Teen Star, cercana al Opus Dei, que impulsa la abstención sexual como método de prevención.', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Retroceso+2024', link: 'https://www.tiempoar.com.ar/ta_article/esi-milei-abstinencia-sexual/', fuente: 'Tiempo Argentino' },
    { ano: 2024, mes: 11, dia: 25, titulo: 'Eliminación de la ESI del presupuesto 2025', descripcion: 'El gobierno de Javier Milei eliminó del proyecto de ley de presupuesto 2025 los fondos destinados a la implementación de la Ley de Educación Sexual Integral (ESI).', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Retroceso+2024', link: 'https://www.dataclave.com.ar/poder/el-gobierno-elimino-la-esi-del-presupuesto-2025-y-pone-en-riesgo-programas-clave-contra-las-violencias_a6744bc3f700dce55c9a40974', fuente: 'Data Clave' },
    { ano: 2025, mes: 1, dia: 19, titulo: 'Retiro de canción infantil contra el abuso', descripcion: 'La canción "Hay secretos" de Canticuénticos fue retirada de la plataforma educativa estatal por el gobierno de Javier Milei por considerarla "ideologizada".', imagen: 'https://placehold.co/800x600/ff6b6b/white?text=Retroceso+2025', link: 'https://elpais.com/argentina/2025-01-19/una-cancion-infantil-contra-el-abuso-cuestiona-el-ataque-de-milei-a-la-educacion-sexual.html', fuente: 'El País' }
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
    zoomable: true,
    moveable: true,
    zoomMin: 1000 * 60 * 60 * 24 * 30 * 6, // 6 meses
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 30, // 30 años
  };

  // 3. Creamos la línea de tiempo
  const timeline = new vis.Timeline(container, items, options);
  let detailsLightbox = null;

  // 4. Creamos la función para mostrar los detalles de un hito
  const showDetails = (item) => {
    detailsPanel.classList.remove('empty-state');
    
    // El HTML para la tarjeta de detalles
    detailsPanel.innerHTML = `
      <div class="card w-100">
        <div class="card-body">
          <div class="row g-4 align-items-center">
            <div class="col-md-4">
              <a href="${item.custom.imagen}" class="details-lightbox" data-gallery="timeline" title="${item.custom.titulo}">
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
    
    // Reinicializamos GLightbox para el nuevo elemento
    if (typeof GLightbox !== 'undefined') {
        detailsLightbox = GLightbox({
            selector: '.details-lightbox',
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
