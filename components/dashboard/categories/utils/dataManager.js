// Singleton para manejar los datos de categorías
import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";

class CategoriesDataManager {
  constructor() {
    if (CategoriesDataManager.instance) {
      return CategoriesDataManager.instance;
    }

    this._categoriesData = this.loadFromStorage();
    CategoriesDataManager.instance = this;
  }

  // Carga los datos desde el storage
  loadFromStorage() {
    return loadFromStorage(STORAGE_KEYS.CATEGORIES) || [];
  }

  // Guarda los datos en el storage
  saveToStorage() {
    saveToStorage(STORAGE_KEYS.CATEGORIES, this._categoriesData);
  }

  // Getter para obtener todas las categorías
  getCategories() {
    return [...this._categoriesData]; // Retorna una copia para evitar mutaciones externas
  }

  // Setter para establecer todas las categorías
  setCategories(categoriesArray) {
    this._categoriesData = [...categoriesArray];
    this.saveToStorage();
  }

  // Agrega una nueva categoría
  addCategory(category) {
    this._categoriesData.unshift(category);
    this.saveToStorage();
  }

  // Elimina una categoría por ID
  deleteCategory(id) {
    const index = this._categoriesData.findIndex((c) => c.id === id);
    if (index !== -1) {
      this._categoriesData.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Busca una categoría por ID
  findCategoryById(id) {
    return this._categoriesData.find((c) => c.id === id);
  }

  // Busca el índice de una categoría por ID
  findCategoryIndex(id) {
    return this._categoriesData.findIndex((c) => c.id === id);
  }

  // Actualiza una categoría existente
  updateCategory(id, updatedCategory) {
    const index = this.findCategoryIndex(id);
    if (index !== -1) {
      this._categoriesData[index] = { ...updatedCategory };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Verifica si existe una categoría con el ID dado
  existsById(id) {
    return this._categoriesData.some((c) => c.id === id);
  }

  // Verifica si existe una categoría con el nombre dado
  existsByName(name) {
    return this._categoriesData.some((c) => c.name === name);
  }

  // Obtiene la cantidad total de categorías
  getCount() {
    return this._categoriesData.length;
  }

  // Limpia todos los datos
  clear() {
    this._categoriesData = [];
    this.saveToStorage();
  }

  // Carga datos desde JSON
  async loadJson() {
    try {
      const response = await fetch(
        "/components/dashboard/categories/categories.json"
      );
      const categoriesData = await response.json();
      this._categoriesData = categoriesData;
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error("Error loading categories JSON:", error);
      return false;
    }
  }
}

// Exporta una instancia única del singleton
export const categoriesManager = new CategoriesDataManager();
