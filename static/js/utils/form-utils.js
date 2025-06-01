
import { getElement } from "./get-element.js";

// Extrae los valores de los campos de un formulario basado en un objeto de configuración
export function getFormData(fields) {
  const data = {};

  for (const [key, { selector, type, label }] of Object.entries(fields)) {
    const el = getElement(selector);
    
    // Lanza un error si no se encuentra el campo en el DOM
    if (!el) {
      throw new Error(`No se encontró el campo ${label} con selector ${selector}`);
    }

    // Obtiene el valor del campo y elimina espacios
    let value = el.value.trim();

    // Si el tipo esperado es número, valida el valor
    if (type === "number") {
      if (value === "") {
        throw new Error(`El campo "${label}" debe ser un número y no puede estar vacío.`);
      }

      const parsed = parseInt(value, 10);

      if (isNaN(parsed)) {
        throw new Error(`El valor del campo "${label}" no es un número válido.`);
      }

      data[key] = parsed;
    } else {
      // Si no es número, solo valida que no esté vacío
      if (value === "") {
        throw new Error(`El campo "${label}" no puede estar vacío.`);
      }

      data[key] = value;
    }
  }

  return data;
}

// Verifica si los valores proporcionados ya existen en el dataset actual
export function isDuplicate(data, dataset, fields) {
  const exists = {};
  
  for (const field of fields) {
    exists[`${field}Exists`] = dataset.some((item) => {
      const valueA = item[field];
      const valueB = data[field];

      // Comparación case-insensitive si ambos son strings
      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.toLowerCase() === valueB.toLowerCase();
      }

      return valueA === valueB;
    });
  }

  return exists;
}

// Limpia los valores de los campos de formulario especificados
export function clearForm(fields) {
  for (const { selector } of Object.values(fields)) {
    const el = getElement(selector);
    if (el) el.value = "";
  }
}

// Muestra un mensaje de error en un contenedor
export function displayError(container, message) {
  container.textContent = message;
  container.style.display = "block";
}

// Oculta el mensaje de error de un contenedor
export function hideError(container) {
  container.textContent = "";
  container.style.display = "none";
}
