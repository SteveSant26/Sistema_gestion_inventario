import { DOM } from "./domElements.js";
import { createCourseCard } from "./createCard.js";
import { getElement } from "/static/js/utils/get-element.js";
import { buildingsManager } from "../../buildings/utils/dataManager.js";

export function showCourses(list) {
  DOM.container = getElement("#containerCourses"); 
  if (!DOM.container || !document.contains(DOM.container)) {
    return;
  } 
  DOM.container.innerHTML = list.length
    ? list.map((c) => createCourseCard(c, buildingsManager.getBuildings())).join("")
    : `<p class="error-message" style="display: block;">No hay edificios registrados.</p>`;
}
