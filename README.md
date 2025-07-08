
# ESInteractiva

> Repositorio de Conocimientos para la Transversalización de la ESI en las Artes.
> Un proyecto de la cátedra “Seminario de Educación Sexual Integral: reflexiones en torno a las prácticas docentes” (FDA-UNLP).

## ¿Qué es ESInteractiva?

**ESInteractiva** es un sitio web educativo, interactivo y de código abierto diseñado para ser el epicentro de recursos sobre Educación Sexual Integral (ESI) para docentes, especialmente en el campo de las artes. El proyecto está construido con tecnologías web básicas (HTML, CSS, JavaScript) y no requiere ningún proceso de compilación ni dependencias complejas, por lo que puede ejecutarse directamente en cualquier navegador web moderno, incluso sin conexión a internet.

## Características Principales

-   **Programa del Seminario:** Página dedicada con el programa oficial completo, incluyendo fundamentación, objetivos, contenidos, bibliografía y modalidad de cursada.
-   **Unidades Temáticas:** Contenido teórico del seminario, enriquecido con glosario interactivo, quices de autoevaluación y un muro de comentarios para el debate.
-   **Collage Multimedia:** Un tablero de inspiración con recursos filtrables como videos, obras de arte, documentos y podcasts.
-   **Línea de Tiempo Interactiva:** Un recorrido visual por los hitos históricos y normativos de la ESI en Argentina.
-   **Decálogo ESI:** Diez principios poéticos para una implementación de la ESI con sensibilidad artística.
-   **Generador de Actividades:** Una herramienta para crear y descargar checklists en PDF con ideas para el aula.
-   **Accesibilidad:** El sitio incluye opciones para cambiar a modo oscuro, modo de alto contraste y aumentar el tamaño de la fuente.
-   **100% Estático:** No necesita un servidor complejo. Funciona abriendo el archivo `index.html` en tu navegador.

## Instalación y Uso

No necesitás instalar nada. Simplemente seguí estos pasos:

1.  **Cloná el repositorio:**
    ```bash
    git clone https://github.com/joaquingalasso/esi-interactiva.git
    ```
2.  **Navegá a la carpeta:**
    ```bash
    cd esi-interactiva
    ```
3.  **Abrí `index.html`:** Hacé doble clic en el archivo `index.html` o arrastralo a tu navegador web preferido. ¡Listo! Ya podés navegar por todo el sitio.

## Cómo Personalizar el Contenido

Este proyecto fue pensado para ser fácilmente modificable por personas con conocimientos básicos de HTML y JavaScript.

### Actualizar el Programa del Seminario

El contenido completo del programa del seminario se encuentra en el archivo `programa.html`.

1.  **Fuente de verdad:** La cátedra proveerá el archivo `Programa.pdf` actualizado para cada ciclo lectivo. Todo el contenido textual de `programa.html` debe ser una transcripción fiel de ese documento.
2.  **Actualización:** Editá directamente el archivo `programa.html` para reflejar los cambios en el texto, equipo docente, horarios, etc.
3.  **Enlaces a Unidades:** Recordá verificar que los enlaces a las Unidades (`<a href="unidades/unidad-X.html">...</a>`) dentro del programa sigan siendo correctos si se reestructura el sitio.

### Editar la Línea de Tiempo

Para agregar, quitar o modificar hitos en la línea de tiempo:

1.  Abrí el archivo `js/timeline.js`.
2.  Buscá la constante `const eventos = [...]`.
3.  Cada hito es un objeto JavaScript dentro de ese array. Para agregar uno nuevo, copiá un objeto existente y modificá sus valores:
    ```javascript
    {
      ano: 2025,
      mes: 12,
      dia: 31,
      titulo: 'Nuevo Hito Histórico',
      descripcion: 'Una breve explicación de lo que pasó en este hito.',
      imagen: 'https://link-a-una-imagen.com/foto.jpg',
      link: 'https://link-a-la-fuente-original.com',
      fuente: 'Nombre de la Fuente'
    }
    ```

### Editar los Quices

1.  Abrí el archivo `js/quiz.js`.
2.  Buscá la constante `const quizData = {...}`.
3.  Dentro de `quizData`, cada unidad (`unidad1`, `unidad2`, etc.) tiene su propio set de preguntas dentro de la clave `questions`.
4.  Para cambiar una pregunta, simplemente editá el texto (`question`) y las opciones (`options`). Recordá que `correct` es el **índice** de la respuesta correcta (0 para la primera, 1 para la segunda, etc.).
    ```javascript
    {
        question: "¿Cuál es la pregunta?",
        options: ["Opción A", "Opción B (correcta)", "Opción C"],
        correct: 1 // El índice 1 corresponde a "Opción B"
    }
    ```

### Añadir Términos al Glosario

1.  Abrí el archivo `js/glosario.js`.
2.  Buscá la constante `const terminosGlosario = [...]`.
3.  Agregá un nuevo objeto al array con el término y su definición.
    ```javascript
    {
      termino: "Nuevo Término",
      definicion: "La explicación detallada de este nuevo término."
    }
    ```
4.  Para que el término aparezca como un tooltip en el texto, andá al archivo HTML correspondiente (ej. `unidades/unidad-1.html`) y envolvé la palabra con un `<span>`:
    ```html
    <p>Este es un <span class="glossary-term">Nuevo Término</span> que aparecerá en el glosario.</p>
    ```

### Actualizar la Bibliografía

1. Abrí el archivo de la unidad que querés modificar (ej. `unidades/unidad-1.html`).
2. Buscá la sección con el `id="bibliografia"`.
3. Dentro de las listas `<ul>` con clase `.biblio-list.obligatoria` o `.biblio-list.complementaria`, podés agregar, editar o eliminar ítems `<li>`.
    ```html
    <ul class="biblio-list obligatoria">
      <li>Nueva referencia bibliográfica (Autor, Año, Título).</li>
      <!-- ... otros items ... -->
    </ul>
    ```
4. Para cambiar el link a la carpeta de Drive, editá el atributo `href` de la etiqueta `<a>` con la clase `.btn-drive`.


### Configurar Formularios

Los formularios de sugerencias usan el servicio gratuito [Formspree](https://formspree.io/). Para que funcionen, necesitás tu propio endpoint.

1.  Creá una cuenta en Formspree y un nuevo formulario.
2.  Obtendrás un "endpoint", que es una URL única (ej. `https://formspree.io/f/abcdefgh`).
3.  Reemplazá el placeholder `https://formspree.io/f/XXXXXXXX` en los archivos `index.html` y `collage.html` por tu endpoint real.
    ```html
    <form action="https://formspree.io/f/TU_ENDPOINT_REAL" method="POST">
      ...
    </form>
    ```

### Gestionar Comentarios

El muro de comentarios usa [Giscus](https://giscus.app/), que está conectado a las "Discussions" de un repositorio de GitHub.

1.  El sistema ya está configurado para usar el repositorio `joaquingalasso/esi-interactiva-comments`.
2.  Si querés usar tu propio repositorio, tenés que habilitar las "Discussions" de GitHub en él y luego cambiar los atributos `data-repo` y `data-repo-id` en los scripts de Giscus que se encuentran en los archivos `unidades/*.html`.

## Stack Tecnológico

-   **HTML5**
-   **CSS3**
-   **JavaScript (ES6+)**
-   **Bootstrap 5:** Para el layout y componentes base.
-   **Font Awesome 6:** Para los íconos.
-   **AOS (Animate on Scroll):** Para animaciones de entrada.
-   **GSAP (GreenSock):** Para micro-interacciones.
-   **GLightbox:** Para la visualización de imágenes y videos.
-   **Isotope.js:** Para la grilla filtrable del collage.
-   **Vis.js Timeline:** Para la línea de tiempo interactiva.
-   **Tippy.js:** Para los tooltips del glosario.
-   **html2pdf.js:** Para generar el PDF del checklist.

## Licencia

El código fuente de este proyecto está bajo **Licencia MIT**.

El contenido textual y pedagógico (textos de las unidades, decálogo, glosario, etc.) está bajo **Licencia Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)**.

Hecho con 💜 para la comunidad educativa.
