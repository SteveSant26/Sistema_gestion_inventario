import { statusColors } from "./constants.js";
import { DOM } from "./domElements.js";
import { showProperties } from "./renderData.js";
import { coursesManager } from "./../../courses/utils/dataManager.js";
import { categoriesManager } from "./../../categories/utils/dataManager.js";
import { propertiesManager } from "./dataManager.js";

export function loadPropertiesData() {
  // Cargar categorías desde singleton
  const categoriesData = categoriesManager.getCategories();

  // Cargar cursos desde singleton
  const coursesData = coursesManager.getCourses();

  // Llenar select de categorías
  DOM.categorySelect.innerHTML = `<option value="">Seleccione una categoría</option>`;
  categoriesData.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    DOM.categorySelect.appendChild(option);
  });

  // Llenar select de cursos
  DOM.courseSelect.innerHTML = `<option value="">Seleccione un curso</option>`;
  coursesData.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    DOM.courseSelect.appendChild(option);
  });

  // Llenar select de estados
  DOM.statusSelect.innerHTML = `<option value="">Seleccione un estado</option>`;
  Object.keys(statusColors).forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    DOM.statusSelect.appendChild(option);
  });

  // Mostrar las propiedades cargadas
  showProperties(propertiesManager.getProperties());  
}
