// Importamos utilidades para manipular elementos del DOM
import { getElement } from "/js/utils/get-element.js";

// Referencias a elementos del DOM: botón de agregar y mensaje de error
export const DOM = {
  addButton: getElement("#addCourseBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerCourses"),
};