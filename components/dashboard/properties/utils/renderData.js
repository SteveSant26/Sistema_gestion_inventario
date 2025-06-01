import { DOM } from "./domElements.js";
import { createPropertyCard } from "./createCard.js";
import { getElement } from "/static/js/utils/get-element.js";
import { coursesManager } from "./../../courses/utils/dataManager.js";
import { categoriesManager } from "./../../categories/utils/dataManager.js";

// Renderiza las tarjetas de inmuebles
export function showProperties(list) {
  // Actualizar la referencia antes de usar
  DOM.container = getElement("#containerProperties");
  if (!DOM.container || !document.contains(DOM.container)) {
    return;
  }

  const courses = coursesManager.getCourses();
  const categories = categoriesManager.getCategories();

  DOM.container.innerHTML = list.length
    ? list.map((p) => createPropertyCard(p, courses, categories)).join("")
    : `<div>No hay inmuebles registrados.</div>`;
}
