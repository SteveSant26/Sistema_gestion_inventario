// Importación de utilidades y módulos
import {
  getFormData,
  displayError,
  hideError,
  clearForm,
  isDuplicate,
} from "/static/js/utils/form-utils.js";
import { formFields, formSelectors } from "./constants.js";
import { getPropertyDOM } from "./domElements.js";
import { showProperties } from "./renderData.js";
import { propertiesManager } from "./dataManager.js";

// Validación de datos del inmueble
export function validatePropertyData(property) {
  if (typeof property.id !== "number" || isNaN(property.id) || property.id < 0)
    throw new Error("El ID debe ser un número positivo.");
  if (typeof property.name !== "string" || property.name.trim() === "")
    throw new Error("El nombre debe ser una cadena no vacía.");
  if (typeof property.categoryId !== "number" || isNaN(property.categoryId))
    throw new Error("La ID de la categoría debe ser un número positivo.");
  if (typeof property.courseId !== "number" || isNaN(property.courseId))
    throw new Error("El ID del curso debe ser un número positivo.");
  if (typeof property.status !== "string" || property.status.trim() === "")
    throw new Error("El estado debe ser seleccionado.");
  if (
    typeof property.arrivalDate !== "string" ||
    property.arrivalDate.trim() === ""
  )
    throw new Error("La fecha de llegada es requerida.");
  if (
    typeof property.quantity !== "number" ||
    isNaN(property.quantity) ||
    property.quantity < 1
  )
    throw new Error("La cantidad debe ser un número positivo mayor a 0.");

  // Validar que la fecha no sea futura
  const today = new Date();
  const arrival = new Date(property.arrivalDate);
  if (arrival > today) {
    throw new Error("La fecha de llegada no puede ser futura.");
  }
}

// Agrega un nuevo inmueble
export function addProperty(e) {
  const DOM = getPropertyDOM();
  e.preventDefault();
  hideError(DOM.errorBox);

  try {
    const property = getFormData(formFields);
    validatePropertyData(property);

    const properties = propertiesManager.getProperties();
    const { idExists, nameExists } = isDuplicate(property, properties, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe un inmueble con ese ID.");
    if (nameExists) throw new Error("Ya existe un inmueble con ese nombre.");

    propertiesManager.addProperty(property);
    showProperties(propertiesManager.getProperties());
    clearForm(formSelectors);
  } catch (err) {
    displayError(DOM.errorBox, err.message);
  }
}

// Elimina un inmueble por ID
export function deleteProperty(id) {
  propertiesManager.deleteProperty(id);
  showProperties(propertiesManager.getProperties());
}

// Edita un inmueble cargándolo al formulario y eliminándolo temporalmente
export function editProperty(id) {
  const property = propertiesManager.findPropertyById(id);
  if (!property) return;

  for (const key in formFields) {
    const input = document.querySelector(formFields[key].selector);
    if (input) input.value = property[key];
  }

  propertiesManager.deleteProperty(id);
  showProperties(propertiesManager.getProperties());
}
