import { STORAGE_KEYS } from "/static/js/config/storage-keys.js";

export const formFields = {
  id: { selector: "#propertyId", type: "number", label: "ID del inmueble" },
  name: {
    selector: "#propertyName",
    type: "string",
    label: "Nombre del inmueble",
  },
  categoryId: {
    selector: "#categorySelect",
    type: "number",
    label: "Categoría",
  },
  courseId: { selector: "#courseSelect", type: "number", label: "Curso" },
  status: { selector: "#statusSelect", type: "string", label: "Estado" },
  arrivalDate: {
    selector: "#arrivalDate",
    type: "string",
    label: "Fecha de llegada",
  },
  quantity: { selector: "#quantity", type: "number", label: "Cantidad" },
};

export const statusColors = {
  Disponible: "#28a745",
  "En uso": "#ffc107",
  Mantenimiento: "#fd7e14",
  "Fuera de servicio": "#dc3545",
  Perdido: "#a62b1f",
};

export const formSelectors = Object.values(formFields);

export { STORAGE_KEYS };
