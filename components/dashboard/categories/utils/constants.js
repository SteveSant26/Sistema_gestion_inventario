// Configuración de constantes y campos del formulario para categorías
import { STORAGE_KEYS } from "/static/js/config/storage-keys.js";

// Define los campos del formulario con su selector, tipo y etiqueta
export const formFields = {
  id: { selector: "#categoryId", type: "number", label: "ID" },
  name: { selector: "#categoryName", type: "string", label: "Nombre" },
  description: {
    selector: "#categoryDescription",
    type: "string",
    label: "Descripción",
  },
};

// Extrae una lista de los selectores para limpiar el formulario fácilmente luego
export const formSelectors = Object.values(formFields);
export { STORAGE_KEYS };