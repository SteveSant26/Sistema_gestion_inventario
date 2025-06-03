import { getElement } from "/static/js/utils/get-element.js";

export function getBuildingDOM() {
  return {
    addButton: getElement("#addBuildingBtn"),
    errorBox: getElement(".error-message"),
    container: getElement("#containerBuildings"),
    form: getElement("#dashboardForm"),
  };
}
