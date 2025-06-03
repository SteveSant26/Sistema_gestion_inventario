// Archivo principal para inicializar el módulo de categorías
import { DOM } from "./utils/domElements.js";
import { loadCategories } from "./utils/dataLoader.js";
import { addCategory, deleteCategory, editCategory } from "./utils/formHandlers.js";

// Controller para manejar la cancelación de eventos
let abortController = new AbortController();

// Función para manejar el click del contenedor
function handleContainerClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = parseInt(btn.dataset.id);
  if (btn.classList.contains("delete-btn")) {
    deleteCategory(id);
  } else if (btn.classList.contains("edit-btn")) {
    editCategory(id);
  }
}

// Inicializa la vista: carga datos y asocia el evento al botón de agregar
function init() {
  // Cancelar eventos anteriores
  abortController.abort();
  abortController = new AbortController();
  
  loadCategories();
  
  // Agregar eventos con AbortController
  DOM.addButton.addEventListener("click", addCategory, {
    signal: abortController.signal
  });
  
  DOM.container.addEventListener("click", handleContainerClick, {
    signal: abortController.signal
  });
}

// Llama a la función principal al cargar el script
init();