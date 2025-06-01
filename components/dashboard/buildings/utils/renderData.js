import { DOM } from "./domElements.js";
import { createBuildingCard } from "./createCard.js";
import { getElement } from "/js/utils/get-element.js";

export function showBuildings(list) {
  DOM.container = getElement("#containerBuildings");
  if (!DOM.container || !document.contains(DOM.container)) {
    return;
  }
  DOM.container.innerHTML = list.length
    ? list.map(createBuildingCard).join("")
    : `<p class="error-message" style="display: block;">No hay edificios registrados.</p>`;
}
