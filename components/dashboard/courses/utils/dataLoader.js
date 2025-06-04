// Módulo para cargar y gestionar los datos de cursos y edificios
import { showCourses } from "./renderData.js";
import { coursesManager } from "./dataManager.js";
import { buildingsManager } from "../../buildings/utils/dataManager.js";
import { getCourseDOM } from "./domElements.js";




// Función para cargar las opciones del select con los edificios disponibles
function loadBuildingsOnSelect() {
  const DOM = getCourseDOM();
  DOM.buildingsSelect.innerHTML = `<option value="">Seleccione un edificio</option>`;

  // Obtiene los edificios directamente desde el singleton
  const buildings = buildingsManager.getBuildings();
  buildings.forEach((b) => {
    const option = document.createElement("option");
    option.value = b.id;
    option.textContent = `${b.name} (#${b.id})`;
    DOM.buildingsSelect.appendChild(option);
  });
}

// Carga los datos de los cursos y edificios desde el singleton
export async function loadCoursesData() {
  // Los datos ya están cargados desde localStorage por los singletons
  // Cargar opciones del select con edificios disponibles
  loadBuildingsOnSelect();

  // Mostrar los cursos en pantalla
  showCourses(coursesManager.getCourses());
}
