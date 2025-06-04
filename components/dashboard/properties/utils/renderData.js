import { getPropertyDOM } from "./domElements.js";
import { createPropertyCard } from "./createCard.js";
import { coursesManager } from "./../../courses/utils/dataManager.js";
import { categoriesManager } from "./../../categories/utils/dataManager.js";

// Renderiza las tarjetas de inmuebles
export function showProperties(list) {
  // Actualizar la referencia antes de usar
  const DOM = getPropertyDOM();

  const courses = coursesManager.getCourses();
  const categories = categoriesManager.getCategories();

  DOM.container.innerHTML = list.length
    ? list.map((p) => createPropertyCard(p, courses, categories)).join("")
    : `<div class="error-message" style="display: block">No hay inmuebles registrados.</div>`;
}
