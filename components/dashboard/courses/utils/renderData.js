import { getCourseDOM } from "./domElements.js";
import { createCourseCard } from "./createCard.js";
import { buildingsManager } from "../../buildings/utils/dataManager.js";

export function showCourses(list) {
  const DOM = getCourseDOM();
  DOM.container.innerHTML = list.length
    ? list.map((c) => createCourseCard(c, buildingsManager.getBuildings())).join("")
    : `<p class="error-message" style="display: block;">No hay edificios registrados.</p>`;
}
