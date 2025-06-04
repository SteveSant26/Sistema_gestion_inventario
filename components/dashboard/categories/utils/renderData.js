// Módulo para renderizar los datos de categorías en el DOM
import { getCategoryDOM } from "./domElements.js";
import { createCategoryCard } from "./createCard.js";

// Función para mostrar todas las categorías en la vista
export function showCategories(list) {
  // Actualizar la referencia antes de usar
  const DOM = getCategoryDOM();

  DOM.container.innerHTML = list.length
    ? list.map(createCategoryCard).join("")
    : `<p class="error-message" style="display: block;">No hay categorías registradas.</p>`;
}
