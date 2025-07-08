
'use strict';

/**
 * Script para los mini-quices de autoevaluación.
 * Se encarga de cargar las preguntas, gestionar las respuestas y el progreso.
 */
document.addEventListener('DOMContentLoaded', () => {

    const quizData = {
        unidad1: {
            questions: [
                {
                    question: "Según la Ley 26.150, la ESI es un...",
                    options: ["Derecho humano obligatorio en todo el país", "Programa opcional para las escuelas", "Tema exclusivo para la materia de Biología", "Asunto que solo concierne a las familias"],
                    correct: 0
                },
                {
                    question: "La Ley Provincial N° 14.744 de Buenos Aires agrega un aspecto importante a la ESI, ¿cuál es?",
                    options: ["El derecho a la educación religiosa", "El derecho al placer sexual", "La prohibición de hablar de afectividad", "La ESI solo para adultos"],
                    correct: 1
                },
                {
                    question: "¿Cuál de los siguientes NO es uno de los cinco ejes conceptuales de la ESI?",
                    options: ["Respetar la diversidad", "Reconocer la perspectiva de género", "Promover un único modelo de familia", "Cuidar el cuerpo y la salud"],
                    correct: 2
                },
                {
                    question: "¿Qué implica que la ESI es un 'campo de disputa'?",
                    options: ["Que nadie está de acuerdo en nada", "Que es un área de conocimiento estática y sin cambios", "Que diferentes valores, saberes y paradigmas entran en tensión", "Que no tiene base científica"],
                    correct: 2
                },
                {
                    question: "Una forma de implementar la ESI en la escuela es a través de 'espacios transversales'. ¿Qué significa?",
                    options: ["Realizar un único taller al año", "Abordar sus contenidos en todas las materias", "Solo hablarlo si surge un problema", "Crear una materia nueva llamada 'ESI'"],
                    correct: 1
                }
            ]
        },
        unidad2: {
            questions: [
                {
                    question: "La frase de Simone de Beauvoir, 'No se nace mujer: se llega a serlo', implica que...",
                    options: ["El sexo biológico es lo único que importa.", "El género es una construcción cultural y social, no algo natural.", "Ser mujer es una meta a alcanzar.", "El género no existe."],
                    correct: 1
                },
                {
                    question: "La teoría de la 'performatividad de género' de Judith Butler sugiere que el género es...",
                    options: ["Algo biológico e inmutable.", "Un 'hacer' constituido por actos y expresiones que repetimos.", "Una elección que se hace una sola vez en la vida.", "Un sinónimo de sexo biológico."],
                    correct: 1
                },
                {
                    question: "¿Qué caracteriza al modelo de 'masculinidad hegemónica'?",
                    options: ["La valoración de la diversidad de expresiones masculinas.", "La promoción del cuidado y la afectividad en los varones.", "Un ideal de varón asociado a la fuerza y la heterosexualidad.", "La idea de que todos los varones son iguales."],
                    correct: 2
                },
                {
                    question: "La 'integralidad' de la sexualidad significa que abarca dimensiones...",
                    options: ["Solo biológicas y psicológicas", "Biológicas, afectivas, sociales, éticas, culturales, etc.", "Únicamente las relaciones sexuales", "Los aspectos culturales solamente"],
                    correct: 1
                },
                {
                    question: "Paul B. Preciado, retomando a Foucault, argumenta que el género es también...",
                    options: ["Una ilusión óptica.", "Una tecnología 'prostética' y biopolítica que se incorpora al cuerpo.", "Algo completamente separado del poder.", "Un concepto obsoleto en el siglo XXI."],
                    correct: 1
                }
            ]
        },
        unidad3: {
            questions: [
                {
                    question: "¿Por qué el arte es un territorio fértil para la ESI?",
                    options: ["Porque es más fácil que otras materias", "Porque permite una exploración simbólica y sensible de temas complejos", "Porque solo se usan colores", "Porque no requiere hablar"],
                    correct: 1
                },
                {
                    question: "Transversalizar la ESI en arte implica, entre otras cosas...",
                    options: ["Enseñar únicamente a artistas varones del canon europeo.", "Problematizar los cánones estéticos y visibilizar a artistas mujeres y disidencias.", "Evitar obras que muestren cuerpos.", "Copiar obras famosas sin analizarlas."],
                    correct: 1
                },
                {
                    question: "El arte puede generar 'extrañamiento'. ¿Qué significa en el contexto de la ESI?",
                    options: ["Que lxs estudiantes se sientan excluidxs.", "Que las obras de arte son raras y no se entienden.", "Que produce una percepción nueva que desautomatiza la mirada sobre lo conocido.", "Que solo se puede hacer arte abstracto."],
                    correct: 2
                },
                {
                    question: "Al analizar una obra desde la ESI, una pregunta clave sería:",
                    options: ["¿Cuánto cuesta esta obra?", "¿Qué representa y qué imaginarios sociales construye sobre los géneros y los cuerpos?", "¿Es una pintura al óleo o una acuarela?", "¿Al artista le gustaba el color azul?"],
                    correct: 1
                },
                {
                    question: "Cuando se trabaja con el cuerpo en artes escénicas desde la ESI, es fundamental:",
                    options: ["Forzar la exposición y el contacto físico para 'romper barreras'.", "Trabajar desde el respeto, el cuidado mutuo y el consentimiento.", "Que todos hagan los mismos movimientos sin excepción.", "Ignorar las sensaciones y emociones que surgen."],
                    correct: 1
                }
            ]
        }
    };

    // Añadimos un pequeño delay para asegurarnos que el DOM está 100% listo.
    setTimeout(() => {
      const quizContainers = document.querySelectorAll('.quiz-container');
      quizContainers.forEach(container => {
          const quizId = container.dataset.quizId;
          if (quizData[quizId]) {
              new Quiz(container, quizData[quizId].questions, quizId);
          }
      });
    }, 200);


    class Quiz {
        constructor(element, questions, id) {
            this.element = element;
            this.questions = questions;
            this.id = id;
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.progress = this.loadProgress();

            if (this.progress.completed) {
                this.showCompletedState();
            } else {
                this.render();
            }
        }

        render() {
            this.element.innerHTML = `
                <div class="card-body p-lg-4">
                    <div class="progress mb-4" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${this.questions.length}">
                        <div class="progress-bar bg-secondary" style="width: 0%; transition: width 0.5s ease-in-out;"></div>
                    </div>
                    <div class="quiz-questions-wrapper"></div>
                    <div class="quiz-navigation text-center mt-4">
                        <button class="btn btn-primary" id="next-btn" style="display: none;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>`;
            
            this.questionsWrapper = this.element.querySelector('.quiz-questions-wrapper');
            this.progressBar = this.element.querySelector('.progress-bar');
            this.nextButton = this.element.querySelector('#next-btn');

            this.nextButton.addEventListener('click', () => this.nextQuestion());
            
            this.showQuestion();
        }

        showQuestion() {
            const questionData = this.questions[this.currentQuestionIndex];
            const template = document.getElementById('quiz-question-template');
            const questionNode = template.content.cloneNode(true);

            questionNode.querySelector('.question-text').textContent = `(${this.currentQuestionIndex + 1}/${this.questions.length}) ${questionData.question}`;
            const optionsContainer = questionNode.querySelector('.options-container');

            questionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'list-group-item list-group-item-action';
                button.textContent = option;
                button.addEventListener('click', () => this.selectAnswer(button, index, questionData.correct));
                optionsContainer.appendChild(button);
            });

            this.questionsWrapper.innerHTML = '';
            this.questionsWrapper.appendChild(questionNode);
            this.nextButton.style.display = 'none';
        }

        selectAnswer(button, selectedIndex, correctIndex) {
            const options = this.element.querySelectorAll('.list-group-item-action');
            options.forEach(opt => opt.classList.add('disabled'));

            const isCorrect = selectedIndex === correctIndex;
            const feedbackContainer = this.element.querySelector('.feedback-container');
            
            if (isCorrect) {
                this.score++;
                button.classList.add('correct');
                feedbackContainer.innerHTML = `<span class="text-success"><i class="fa-solid fa-check-circle me-2"></i>¡Correcto!</span>`;
            } else {
                button.classList.add('incorrect');
                options[correctIndex].classList.add('correct');
                feedbackContainer.innerHTML = `<span class="text-danger"><i class="fa-solid fa-times-circle me-2"></i>Incorrecto. La respuesta correcta era la marcada en verde.</span>`;
            }
            
            this.updateProgress();

            // Animación con GSAP
            if (typeof gsap !== 'undefined') {
              gsap.from(feedbackContainer, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' });
            }

            this.nextButton.style.display = 'inline-block';
        }

        updateProgress() {
            const progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            if (typeof gsap !== 'undefined') {
                gsap.to(this.progressBar, { width: `${progressPercentage}%`, duration: 0.5 });
            } else {
                this.progressBar.style.width = `${progressPercentage}%`;
            }
            this.progressBar.setAttribute('aria-valuenow', this.currentQuestionIndex + 1);
        }

        nextQuestion() {
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex < this.questions.length) {
                this.showQuestion();
            } else {
                this.showResults();
            }
        }

        showResults() {
            const finalScore = Math.round((this.score / this.questions.length) * 100);
            this.questionsWrapper.innerHTML = `
                <div class="text-center">
                    <h4 class="fw-bold">¡Completaste la autoevaluación!</h4>
                    <p class="lead">Tu puntaje: <strong>${this.score} de ${this.questions.length} correctas (${finalScore}%)</strong>.</p>
                    <p class="text-muted small">Este es solo un ejercicio para repasar. ¡Lo importante es seguir aprendiendo!</p>
                    <button class="btn btn-sm btn-outline-secondary" id="restart-btn"><i class="fa-solid fa-redo me-2"></i>Reintentar</button>
                </div>
            `;
            this.nextButton.style.display = 'none';
            this.element.querySelector('#restart-btn').addEventListener('click', () => {
                this.reset();
                this.render();
            });

            this.progress.completed = true;
            this.progress.score = finalScore;
            this.saveProgress();
        }

        showCompletedState() {
             this.element.innerHTML = `
                <div class="card-body text-center p-4 bg-body-secondary rounded">
                    <h5 class="fw-bold"><i class="fa-solid fa-check-double text-success me-2"></i>Ya completaste esta autoevaluación.</h5>
                    <p class="mb-2">Tu último puntaje fue del <strong>${this.progress.score}%</strong>.</p>
                    <button class="btn btn-sm btn-outline-primary" id="restart-btn"><i class="fa-solid fa-redo me-2"></i>Volver a realizar</button>
                </div>
            `;
            this.element.querySelector('#restart-btn').addEventListener('click', () => {
                this.reset();
                this.render();
            });
        }
        
        reset() {
            this.currentQuestionIndex = 0;
            this.score = 0;
        }

        saveProgress() {
            let allProgress = JSON.parse(localStorage.getItem('esinteractiva_quices')) || {};
            allProgress[this.id] = this.progress;
            localStorage.setItem('esinteractiva_quices', JSON.stringify(allProgress));
        }

        loadProgress() {
            const allProgress = JSON.parse(localStorage.getItem('esinteractiva_quices')) || {};
            return allProgress[this.id] || { completed: false, score: 0 };
        }
    }
});
