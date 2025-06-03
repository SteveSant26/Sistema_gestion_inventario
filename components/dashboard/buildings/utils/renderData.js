import { getBuildingDOM } from "./domElements.js";
import { createBuildingCard } from "./createCard.js";

export function showBuildings(list) {
  const DOM = getBuildingDOM();
  DOM.container.innerHTML = list.length
    ? list.map(createBuildingCard).join("")
    : `<p class="error-message" style="display: block;">No hay edificios registrados.</p>`;
}
