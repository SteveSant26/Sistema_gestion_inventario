import { getElement } from "/static/js/utils/get-element.js";


export function getPropertyDOM() {
  return {
  addButton: getElement("#addPropertyBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerProperties"),
  categorySelect: getElement("#categorySelect"),
  courseSelect: getElement("#courseSelect"),
  statusSelect: getElement("#statusSelect"),
  arrivalDate: getElement("#arrivalDate"),
  quantity: getElement("#quantity"),
  };
}
