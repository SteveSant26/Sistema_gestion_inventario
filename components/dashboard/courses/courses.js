// Archivo principal para inicializar el módulo de cursos
import { getCourseDOM } from "./utils/domElements.js";
import { loadCoursesData } from "./utils/dataLoader.js";
import { addCourse, deleteCourse, editCourse } from "./utils/formHandlers.js";

// Controller para manejar la cancelación de eventos
let abortController = new AbortController();

// Función para manejar el click del contenedor
function handleContainerClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = parseInt(btn.dataset.id);
  if (btn.classList.contains("delete-btn")) {
    deleteCourse(id);
  } else if (btn.classList.contains("edit-btn")) {
    editCourse(id);
  }
}

// Inicializa la página: carga los datos y configura los eventos
function init() {
  const DOM = getCourseDOM();
  // Cancelar eventos anteriores
  abortController.abort();
  abortController = new AbortController();
  
  loadCoursesData();

  // Agregar eventos con AbortController
  DOM.addButton.addEventListener("click", addCourse, {
    signal: abortController.signal
  });

  DOM.container.addEventListener("click", handleContainerClick, {
    signal: abortController.signal
  });
}

// Llamada inicial
init();