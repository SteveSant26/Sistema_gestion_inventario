// Importaciones
import { DOM } from "./utils/domElements.js";
import { loadBuildingsData } from "./utils/dataLoader.js";
import {
  addBuilding,
  deleteBuilding,
  editBuilding,
} from "./utils/formHandlers.js";

// Inicializa la vista: carga datos y asocia el evento al botón de agregar
function init() {
  loadBuildingsData();
  DOM.addButton.addEventListener("click", addBuilding);
}

// Delegación de eventos para los botones de editar y eliminar dentro del contenedor de edificios
DOM.container.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (!target) return;

  const id = parseInt(target.dataset.id); // Obtiene el ID del edificio desde el atributo data-id

  if (target.classList.contains("delete-btn")) {
    deleteBuilding(id);
  } else if (target.classList.contains("edit-btn")) {
    editBuilding(id);
  }
});

// Llama a la función principal al cargar el script
init();
