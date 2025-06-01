// Importa una función para obtener un elemento del DOM por selector
import { getElement } from "/static/js/utils/get-element.js";

// Obtiene el botón para agregar categorías y el contenedor de mensajes de error
export const DOM = {
  addButton: getElement("#addCategoryBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerCategories"),
};