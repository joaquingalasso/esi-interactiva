'use strict';

/**
 * Script para el Glosario.
 * Se encarga de crear los tooltips interactivos (con Tippy.js)
 * y de poblar el modal del glosario completo.
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // Base de datos de nuestro glosario. ¡Acá se agregan nuevos términos!
  const terminosGlosario = [
    {
      termino: "Educación Sexual Integral (ESI)",
      definicion: "Un enfoque pedagógico que articula aspectos biológicos, psicológicos, sociales, afectivos y éticos de la sexualidad, promoviendo el conocimiento y cuidado del cuerpo, la valoración de las emociones, el respeto por la diversidad y el ejercicio de los derechos."
    },
    {
      termino: "Transversal",
      definicion: "Enfoque que atraviesa todas las áreas curriculares y momentos de la vida escolar, en lugar de ser una materia aislada. La ESI se integra en matemática, historia, arte, etc."
    },
    {
      termino: "Biologicista",
      definicion: "Modelo que reduce la sexualidad únicamente a sus aspectos biológicos y reproductivos, dejando de lado las dimensiones afectivas, sociales y de derechos."
    },
    {
      termino: "Orden público",
      definicion: "Característica de una ley que la hace obligatoria e irrenunciable en todo el territorio nacional, sin que las jurisdicciones o instituciones puedan optar por no aplicarla."
    },
    {
      termino: "Enfoque de derechos",
      definicion: "Perspectiva que reconoce a niñxs y adolescentes como sujetos plenos de derecho, con capacidad de participar, ser escuchadxs y tomar decisiones progresivas sobre sus vidas."
    },
    {
      termino: "Sujetos de derecho",
      definicion: "Condición que reconoce a una persona como titular de derechos y obligaciones, con capacidad para ejercerlos. Se opone a la idea de ser un 'objeto de cuidado' pasivo."
    },
    {
      termino: "Perspectiva de género",
      definicion: "Una herramienta de análisis que permite visibilizar y cuestionar las desigualdades y relaciones de poder construidas socialmente entre los géneros."
    },
    {
      termino: "Género",
      definicion: "Construcción social y cultural que asigna roles, identidades y expectativas a las personas en función de su sexo biológico. Es una categoría relacional y de poder."
    },
    {
      termino: "Performatividad de género",
      definicion: "Teoría (popularizada por J. Butler) que sostiene que el género se constituye a través de la repetición de actos, discursos y prácticas sociales, no es una esencia interna."
    },
    {
      termino: "Binarismo",
      definicion: "Sistema que reconoce únicamente dos géneros (varón/mujer) como únicos, naturales, opuestos y excluyentes, invisibilizando otras identidades."
    },
    {
      termino: "Consentimiento",
      definicion: "Acuerdo libre, informado, específico y reversible entre personas para participar en cualquier tipo de actividad, especialmente la sexual. La ausencia de un 'no' no implica un 'sí'."
    },
    {
      termino: "Estereotipos",
      definicion: "Ideas o imágenes simplificadas y socialmente aceptadas sobre cómo son o deben ser las personas que pertenecen a un determinado grupo (ej. estereotipos de género)."
    },
    {
      termino: "Orientación sexual",
      definicion: "Atracción emocional, afectiva y/o sexual hacia personas de un género diferente, del mismo género o de más de un género. No debe confundirse con la identidad de género."
    },
    {
      termino: "Identidad de género",
      definicion: "La vivencia interna e individual del género tal como cada persona la siente, la cual puede corresponder o no con el sexo asignado al nacer."
    },
    {
        termino: "Simbólica",
        definicion: "Que se expresa a través de símbolos, metáforas o representaciones, permitiendo abordar temas de forma indirecta y subjetiva, como lo hace el arte."
    },
    {
        termino: "Mandatos",
        definicion: "Normas sociales no escritas pero muy internalizadas sobre cómo debemos ser, sentir y actuar según nuestro género, edad, clase social, etc."
    },
  ];

  // Ordenamos los términos alfabéticamente para el modal
  terminosGlosario.sort((a, b) => a.termino.localeCompare(b.termino));

  // 1. Inicializar los Tooltips de Tippy.js
  if (typeof tippy !== 'undefined') {
    const termElements = document.querySelectorAll('.glossary-term');
    termElements.forEach(el => {
      const termText = el.textContent.trim();
      const termData = terminosGlosario.find(t => t.termino.toLowerCase() === termText.toLowerCase());
      if (termData) {
        tippy(el, {
          content: `<strong>${termData.termino}</strong><hr class="my-1">${termData.definicion}`,
          allowHTML: true,
          theme: 'esi-theme',
          placement: 'top',
          animation: 'scale-subtle',
        });
      }
    });
  }

  // 2. Poblar y gestionar el Modal del Glosario Completo
  const glossaryBtn = document.getElementById('glossary-btn');
  const glossaryModalEl = document.getElementById('glossary-modal');
  const glossaryModalBody = document.getElementById('glossary-modal-body');

  if (glossaryBtn && glossaryModalEl && glossaryModalBody) {
    const glossaryModal = new bootstrap.Modal(glossaryModalEl);

    // Poblar el contenido del modal
    let modalContent = '<ul>';
    terminosGlosario.forEach(t => {
      modalContent += `<li><strong>${t.termino}:</strong> ${t.definicion}</li>`;
    });
    modalContent += '</ul>';
    glossaryModalBody.innerHTML = modalContent;

    // Abrir el modal al hacer clic en el botón
    glossaryBtn.addEventListener('click', () => {
      glossaryModal.show();
    });
  }

});
