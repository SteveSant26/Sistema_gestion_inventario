// Módulo para manejar las operaciones del formulario de cursos
import {
  getFormData,
  displayError,
  hideError,
  clearForm,
  isDuplicate,
} from "/static/js/utils/form-utils.js";
import { formFields, formSelectors } from "./constants.js";
import { showCourses } from "./renderData.js";
import { getElement } from "/static/js/utils/get-element.js";
import { DOM } from "./domElements.js";
import { coursesManager } from "./dataManager.js";

// Validación de los datos del curso
function validateCourseData(course) {
  if (typeof course.id !== "number" || isNaN(course.id) || course.id < 0) {
    throw new Error("El ID debe ser un número positivo.");
  }

  if (typeof course.name !== "string" || course.name.trim() === "") {
    throw new Error("El nombre debe ser una cadena no vacía.");
  }

  if (typeof course.capacity !== "number" || isNaN(course.capacity)) {
    throw new Error("La capacidad debe ser un número positivo.");
  }

  if (typeof course.buildingId !== "number" || isNaN(course.buildingId)) {
    throw new Error("Debes seleccionar un ID de edificio válido.");
  }
}

// Agregar curso
export function addCourse(e) {
  e.preventDefault();
  hideError(DOM.errorBox);

  try {
    const newCourse = getFormData(formFields);
    validateCourseData(newCourse);

    const courses = coursesManager.getCourses();
    const { idExists, nameExists } = isDuplicate(newCourse, courses, [
      "id",
      "name",
    ]);

    if (idExists)
      return displayError(DOM.errorBox, "Ya existe un curso con ese ID.");
    if (nameExists)
      return displayError(DOM.errorBox, "Ya existe un curso con ese nombre.");

    coursesManager.addCourse(newCourse);
    showCourses(coursesManager.getCourses());
    clearForm(formSelectors);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
  }
}

// Eliminar curso
export function deleteCourse(id) {
  if (coursesManager.deleteCourse(id)) {
    showCourses(coursesManager.getCourses());
  }
}

// Editar curso
export function editCourse(id) {
  const course = coursesManager.findCourseById(id);
  if (!course) return;

  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = course[key];
  }

  deleteCourse(id);
}
