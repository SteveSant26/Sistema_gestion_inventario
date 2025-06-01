// Módulo para cargar y gestionar los datos de categorías
import { showCategories } from "./renderData.js";
import { categoriesManager } from "./dataManager.js";
// Variable donde se almacenarán los datos de categorías

// Carga las categorías únicamente desde localStorage
export async function loadCategories() {
  // Muestra las categorías (manejará el caso de array vacío)
  showCategories(categoriesManager.getCategories());
}