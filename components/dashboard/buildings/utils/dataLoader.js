import { showBuildings } from "./renderData.js";
import { buildingsManager } from "./dataManager.js";

// Carga los datos únicamente desde storage
export async function loadBuildingsData() {
  // Mostrar los edificios (manejará el caso de array vacío)
  showBuildings(buildingsManager.getBuildings());
}