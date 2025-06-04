// Importamos utilidades para manipular elementos del DOM
import { getElement } from "/static/js/utils/get-element.js";

// Referencias a elementos del DOM: botón de agregar y mensaje de error


export function getCourseDOM() {
  return {
  addButton: getElement("#addCourseBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerCourses"),
  buildingsSelect: getElement("#buildingIdSelect"),
  };
}
