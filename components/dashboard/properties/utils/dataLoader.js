import { statusColors } from "./constants.js";
import { getPropertyDOM } from "./domElements.js";
import { showProperties } from "./renderData.js";
import { coursesManager } from "./../../courses/utils/dataManager.js";
import { categoriesManager } from "./../../categories/utils/dataManager.js";
import { propertiesManager } from "./dataManager.js";

// Cargar categorías en el select
function loadCategoriesOnSelect(DOM) {
  const categoriesData = categoriesManager.getCategories();

  DOM.categorySelect.innerHTML = `<option value="">Seleccione una categoría</option>`;
  categoriesData.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    DOM.categorySelect.appendChild(option);
  });
}

// Cargar cursos en el select
function loadCoursesOnSelect(DOM) {
  const coursesData = coursesManager.getCourses();

  DOM.courseSelect.innerHTML = `<option value="">Seleccione un curso</option>`;
  coursesData.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    DOM.courseSelect.appendChild(option);
  });
}

// Cargar estados en el select
function loadStatusOnSelect(DOM) {
  DOM.statusSelect.innerHTML = `<option value="">Seleccione un estado</option>`;
  Object.keys(statusColors).forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    DOM.statusSelect.appendChild(option);
  });
}

// Cargar todos los datos de la vista de propiedades
export function loadPropertiesData() {
  const DOM = getPropertyDOM(); // Obtener referencias actualizadas al DOM

  loadCategoriesOnSelect(DOM);
  loadCoursesOnSelect(DOM);
  loadStatusOnSelect(DOM);

  showProperties(propertiesManager.getProperties());
}
