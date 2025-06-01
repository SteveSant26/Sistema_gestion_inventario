// Importa función para obtener un elemento del DOM por selector
import { getElement } from "/js/utils/get-element.js";

// Obtiene el botón para agregar edificios y el contenedor de mensajes de error
export const DOM = {
  addButton: getElement("#addBuildingBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerBuildings"),
};
