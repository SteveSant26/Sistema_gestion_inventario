import { getElement } from "/js/utils/get-element.js";

export const DOM = {
  addButton: getElement("#addPropertyBtn"),
  errorBox: getElement(".error-message"),
  container: getElement("#containerProperties"),
  categorySelect: getElement("#categorySelect"),
  courseSelect: getElement("#courseSelect"),
  statusSelect: getElement("#statusSelect"),
  arrivalDate: getElement("#arrivalDate"),
  quantity: getElement("#quantity"),
};