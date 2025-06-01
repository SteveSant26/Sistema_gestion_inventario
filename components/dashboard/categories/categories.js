// Archivo principal para inicializar el módulo de categorías
import { DOM } from "./utils/domElements.js";
import { loadCategories } from "./utils/dataLoader.js";
import { addCategory, deleteCategory, editCategory } from "./utils/formHandlers.js";

// Inicializa la vista: carga datos y asocia el evento al botón de agregar
function init() {
  loadCategories();
  DOM.addButton.addEventListener("click", addCategory);
}

// Delegación de eventos para los botones de editar y eliminar dentro del contenedor de categorías
DOM.container.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const id = parseInt(target.dataset.id);
  if (target.classList.contains("delete-btn")) {
    deleteCategory(id);
  } else if (target.classList.contains("edit-btn")) {
    editCategory(id);
  }
});

// Llama a la función principal al cargar el script
init();