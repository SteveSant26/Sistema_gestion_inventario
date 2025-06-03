import { getBuildingDOM } from "./utils/domElements.js";
import { loadBuildingsData } from "./utils/dataLoader.js";
import {
  addBuilding,
  deleteBuilding,
  editBuilding,
} from "./utils/formHandlers.js";

let abortController = new AbortController();

function handleContainerClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = parseInt(btn.dataset.id);

  if (btn.classList.contains("delete-btn")) {
    deleteBuilding(id);
  } else if (btn.classList.contains("edit-btn")) {
    editBuilding(id);
  }
}

function init() {
  abortController.abort();
  abortController = new AbortController();

  loadBuildingsData();

  const DOM = getBuildingDOM(); // ← obtener DOM fresco

  if (DOM.addButton) {
    DOM.addButton.addEventListener("click", addBuilding, {
      signal: abortController.signal
    });
  }

  if (DOM.container) {
    DOM.container.addEventListener("click", handleContainerClick, {
      signal: abortController.signal
    });
  }

  if (DOM.form) {
    DOM.form.addEventListener("submit", (e) => {
      e.preventDefault();
      addBuilding(e);
    }, {
      signal: abortController.signal
    });
  }
}

window.reinitializeBuildings = init;

setTimeout(() => {
  init();
}, 100);
