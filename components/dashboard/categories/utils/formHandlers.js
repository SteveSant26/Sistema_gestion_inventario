// Módulo para manejar las operaciones del formulario de categorías
import {
  getFormData,
  isDuplicate,
  clearForm,
  displayError,
  hideError,
} from "/static/js/utils/form-utils.js";
import { formFields, formSelectors } from "./constants.js";
import { showCategories } from "./renderData.js";
import { getElement } from "/static/js/utils/get-element.js";
import { getCategoryDOM } from "./domElements.js";
import { categoriesManager } from "./dataManager.js"; // Importa el singleton

// Validación de datos de categoría
export function validateCategoryData(category) {
  if (
    typeof category.id !== "number" ||
    isNaN(category.id) ||
    category.id < 0
  ) {
    throw new Error("El ID debe ser un número positivo.");
  }

  if (typeof category.name !== "string" || category.name.trim() === "") {
    throw new Error("El nombre debe ser una cadena no vacía.");
  }

  if (
    typeof category.description !== "string" ||
    category.description.trim() === ""
  ) {
    throw new Error("La descripción debe ser una cadena no vacía.");
  }
}

// Agregar categoría
export function addCategory(event) {
  const DOM = getCategoryDOM();
  event.preventDefault();
  hideError(DOM.errorBox);

  try {
    const category = getFormData(formFields);
    validateCategoryData(category);

    const existingCategories = categoriesManager.getCategories();

    // Verifica si ya existe una categoría con el mismo ID o nombre
    const { idExists, nameExists } = isDuplicate(category, existingCategories, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe una categoría con ese ID.");
    if (nameExists) throw new Error("Ya existe una categoría con ese nombre.");

    categoriesManager.addCategory(category);
    showCategories(categoriesManager.getCategories());
    clearForm(formSelectors);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
  }
}

// Elimina una categoría por ID
export function deleteCategory(id) {
  const deleted = categoriesManager.deleteCategory(id);
  if (deleted) {
    showCategories(categoriesManager.getCategories());
  }
}

// Edita una categoría llenando el formulario con los datos seleccionados y luego lo elimina temporalmente
export function editCategory(id) {
  const category = categoriesManager.findCategoryById(id);
  if (!category) return;

  // Carga los datos de la categoría en el formulario
  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = category[key];
  }

  // Elimina la categoría original para permitir la edición
  categoriesManager.deleteCategory(id);
}
