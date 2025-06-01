import {
  getFormData,
  isDuplicate,
  clearForm,
  displayError,
  hideError,
} from "/static/js/utils/form-utils.js";
import { formFields, formSelectors } from "./constants.js";
import { showBuildings } from "./renderData.js";
import { DOM } from "./domElements.js";
import { getElement } from "/static/js/utils/get-element.js";
import { buildingsManager } from "./dataManager.js";

export function validateBuildingData(building) {
  if (building.id < 0) throw new Error("El ID debe ser positivo.");
  if (building.floors < 0) throw new Error("Pisos debe ser positivo.");
  if (building.capacity < 0) throw new Error("Capacidad debe ser positiva.");
}

export function addBuilding(event) {
  event.preventDefault();
  hideError(DOM.errorBox);

  try {
    const building = getFormData(formFields);
    validateBuildingData(building);
    

    const existingBuildings = buildingsManager.getBuildings();
    const { idExists, nameExists } = isDuplicate(building, existingBuildings, [
      "id",
      "name",
    ]);
    if (idExists) throw new Error("Ya existe un edificio con ese ID.");
    if (nameExists) throw new Error("Ya existe un edificio con ese nombre.");

    buildingsManager.addBuilding(building);
    const updatedData = buildingsManager.getBuildings();
    showBuildings(updatedData);
    clearForm(formSelectors);
  } catch (err) {
    console.log(err);
    displayError(DOM.errorBox, err.message);
  }
}

export function deleteBuilding(id) {
  const deleted = buildingsManager.deleteBuilding(id);
  if (deleted) {
    showBuildings(buildingsManager.getBuildings());
  }
}

export function editBuilding(id) {
  const building = buildingsManager.findBuildingById(id);
  if (!building) return;

  for (const key in formFields) {
    const input = getElement(formFields[key].selector);
    if (input) input.value = building[key];
  }
  deleteBuilding(id, getElement("#containerBuildings"));
}
