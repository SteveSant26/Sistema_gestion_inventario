// Configuración de constantes y campos del formulario para cursos
import { STORAGE_KEYS } from "/static/js/config/storage-keys.js";

// Estructura del formulario, con selectores, tipo de dato y etiquetas
export const formFields = {
  id: { selector: "#courseId", type: "number", label: "ID del curso" },
  name: { selector: "#courseName", type: "string", label: "Nombre del curso" },
  buildingId: {
    selector: "#buildingIdSelect",
    type: "number",
    label: "Edificio",
  },
  capacity: { selector: "#courseCapacity", type: "number", label: "Capacidad" },
};

// Lista de los campos para poder recorrerlos más fácilmente
export const formSelectors = Object.values(formFields);
export { STORAGE_KEYS };