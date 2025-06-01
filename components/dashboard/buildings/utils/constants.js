import { STORAGE_KEYS } from "/static/js/config/storage-keys.js";

export const formFields = {
  id: { selector: "#buildingId", type: "number", label: "ID" },
  name: { selector: "#buildingName", type: "string", label: "Nombre" },
  location: { selector: "#buildingLocation", type: "string", label: "Ubicación" },
  floors: { selector: "#buildingFloors", type: "number", label: "Pisos" },
  capacity: { selector: "#buildingCapacity", type: "number", label: "Capacidad" },
};

export const formSelectors = Object.values(formFields);
export { STORAGE_KEYS };
