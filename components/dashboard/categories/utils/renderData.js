// Módulo para renderizar los datos de categorías en el DOM
import { DOM } from "./domElements.js";
import { createCategoryCard } from "./createCard.js";
import { getElement } from "/js/utils/get-element.js";

// Función para mostrar todas las categorías en la vista
export function showCategories(list) {
  // Actualizar la referencia antes de usar
  DOM.container = getElement("#containerCategories");
  if (!DOM.container || !document.contains(DOM.container)) {
    return;
  }

  DOM.container.innerHTML = list.length
    ? list.map(createCategoryCard).join("")
    : `<p class="error-message" style="display: block;">No hay categorías registradas.</p>`;
}
