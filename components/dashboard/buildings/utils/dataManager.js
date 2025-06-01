// Singleton para manejar los datos de edificios
import { loadFromStorage, saveToStorage } from "/static/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";

class BuildingsDataManager {
  constructor() {
    if (BuildingsDataManager.instance) {
      return BuildingsDataManager.instance;
    }

    this._buildingsData = this.loadFromStorage();
    BuildingsDataManager.instance = this;
  }

  // Carga los datos desde el storage
  loadFromStorage() {
    return loadFromStorage(STORAGE_KEYS.BUILDINGS) || [];
  }

  // Guarda los datos en el storage
  saveToStorage() {
    saveToStorage(STORAGE_KEYS.BUILDINGS, this._buildingsData);
  }

  // Getter para obtener todos los edificios
  getBuildings() {
    return [...this._buildingsData]; // Retorna una copia para evitar mutaciones externas
  }

  // Setter para establecer todos los edificios
  setBuildings(buildingsArray) {
    this._buildingsData = [...buildingsArray];
    this.saveToStorage();
  }

  // Agrega un nuevo edificio
  addBuilding(building) {
    this._buildingsData.unshift(building);
    this.saveToStorage();
  }

  // Elimina un edificio por ID
  deleteBuilding(id) {
    const index = this._buildingsData.findIndex((b) => b.id === id);
    if (index !== -1) {
      this._buildingsData.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Busca un edificio por ID
  findBuildingById(id) {
    return this._buildingsData.find((b) => b.id === id);
  }

  // Busca el índice de un edificio por ID
  findBuildingIndex(id) {
    return this._buildingsData.findIndex((b) => b.id === id);
  }

  // Actualiza un edificio existente
  updateBuilding(id, updatedBuilding) {
    const index = this.findBuildingIndex(id);
    if (index !== -1) {
      this._buildingsData[index] = { ...updatedBuilding };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Verifica si existe un edificio con el ID dado
  existsById(id) {
    return this._buildingsData.some((b) => b.id === id);
  }

  // Verifica si existe un edificio con el nombre dado
  existsByName(name) {
    return this._buildingsData.some((b) => b.name === name);
  }

  // Obtiene la cantidad total de edificios
  getCount() {
    return this._buildingsData.length;
  }

  // Limpia todos los datos
  clear() {
    this._buildingsData = [];
    this.saveToStorage();
  }

  // Carga datos desde JSON
  async loadJson() {
    try {
      const response = await fetch("/components/dashboard/buildings/buildings.json");
      const buildingsData = await response.json();
      this._buildingsData = buildingsData;
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error("Error loading buildings JSON:", error);
      return false;
    }
  }
}

// Exporta una instancia única del singleton
export const buildingsManager = new BuildingsDataManager();