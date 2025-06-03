// Singleton para manejar los datos de inmuebles
import { loadFromStorage, saveToStorage } from "/static/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";

class PropertiesDataManager {
  constructor() {
    if (PropertiesDataManager.instance) {
      return PropertiesDataManager.instance;
    }

    this._propertiesData = this.loadFromStorage();
    PropertiesDataManager.instance = this;
  }

  // Carga los datos desde el storage
  loadFromStorage() {
    return loadFromStorage(STORAGE_KEYS.PROPERTIES) || [];
  }

  // Guarda los datos en el storage
  saveToStorage() {
    saveToStorage(STORAGE_KEYS.PROPERTIES, this._propertiesData);
  }

  // Getter para obtener todos los inmuebles
  getProperties() {
    return [...this._propertiesData]; // Retorna una copia para evitar mutaciones externas
  }

  // Setter para establecer todos los inmuebles
  setProperties(propertiesArray) {
    this._propertiesData = [...propertiesArray];
    this.saveToStorage();
  }

  // Agrega un nuevo inmueble
  addProperty(property) {
    this._propertiesData.unshift(property);
    this.saveToStorage();
  }

  // Elimina un inmueble por ID
  deleteProperty(id) {
    const index = this._propertiesData.findIndex((p) => p.id === id);
    if (index !== -1) {
      this._propertiesData.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Busca un inmueble por ID
  findPropertyById(id) {
    return this._propertiesData.find((p) => p.id === id);
  }

  // Busca el índice de un inmueble por ID
  findPropertyIndex(id) {
    return this._propertiesData.findIndex((p) => p.id === id);
  }

  // Actualiza un inmueble existente
  updateProperty(id, updatedProperty) {
    const index = this.findPropertyIndex(id);
    if (index !== -1) {
      this._propertiesData[index] = { ...updatedProperty };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Verifica si existe un inmueble con el ID dado
  existsById(id) {
    return this._propertiesData.some((p) => p.id === id);
  }

  // Verifica si existe un inmueble con el nombre/título dado
  existsByName(name) {
    return this._propertiesData.some(
      (p) => p.name === name || p.title === name
    );
  }

  // Busca inmuebles por categoría
  findByCategory(categoryId) {
    return this._propertiesData.filter((p) => p.categoryId === categoryId);
  }

  // Busca inmuebles por edificio
  findByBuilding(buildingId) {
    return this._propertiesData.filter((p) => p.buildingId === buildingId);
  }

  // Busca inmuebles por estado (disponible, ocupado, etc.)
  findByStatus(status) {
    return this._propertiesData.filter((p) => p.status === status);
  }

  // Obtiene la cantidad total de inmuebles
  getCount() {
    return this._propertiesData.length;
  }

  // Limpia todos los datos
  clear() {
    this._propertiesData = [];
    this.saveToStorage();
  }

  // Carga datos desde JSON
  async loadJson() {
    try {
      const response = await fetch(
        "/components/dashboard/properties/properties.json"
      );
      const propertiesData = await response.json();
      this._propertiesData = propertiesData;
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error("Error loading properties JSON:", error);
      return false;
    }
  }
}

// Exporta una instancia única del singleton
export const propertiesManager = new PropertiesDataManager();
