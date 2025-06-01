import { loadPropertiesData } from "./utils/dataLoader.js";
import { DOM } from "./utils/domElements.js";
import {
  addProperty,
  deleteProperty,
  editProperty,
} from "./utils/formHandlers.js";

function init() {
  loadPropertiesData();
  DOM.addButton.addEventListener("click", addProperty);
  DOM.container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    if (btn.classList.contains("delete-btn")) deleteProperty(id);
    if (btn.classList.contains("edit-btn")) editProperty(id);
  });
}

init();
