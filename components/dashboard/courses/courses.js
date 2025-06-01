// Archivo principal para inicializar el módulo de cursos
import { DOM } from "./utils/domElements.js";
import { loadCoursesAndBuildings } from "./utils/dataLoader.js";
import { addCourse, deleteCourse, editCourse } from "./utils/formHandlers.js";

// Inicializa la página: carga los datos y configura los eventos
function init() {
  loadCoursesAndBuildings();

  // Evento para agregar un nuevo curso
  DOM.addButton.addEventListener("click", addCourse);

  // Eventos para los botones de editar y eliminar
  DOM.container.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const id = parseInt(target.dataset.id);
    if (target.classList.contains("delete-btn")) {
      deleteCourse(id);
    } else if (target.classList.contains("edit-btn")) {
      editCourse(id);
    }
  });
}

// Llamada inicial
init();