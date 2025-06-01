// Singleton para manejar los datos de cursos
import { loadFromStorage, saveToStorage } from "/js/utils/storage.js";
import { STORAGE_KEYS } from "./constants.js";

class CoursesDataManager {
  constructor() {
    if (CoursesDataManager.instance) {
      return CoursesDataManager.instance;
    }

    this._coursesData = this.loadFromStorage();
    CoursesDataManager.instance = this;
  }

  // Carga los datos desde el storage
  loadFromStorage() {
    return loadFromStorage(STORAGE_KEYS.COURSES) || [];
  }

  // Guarda los datos en el storage
  saveToStorage() {
    saveToStorage(STORAGE_KEYS.COURSES, this._coursesData);
  }

  // Getter para obtener todos los cursos
  getCourses() {
    return [...this._coursesData]; // Retorna una copia para evitar mutaciones externas
  }

  // Setter para establecer todos los cursos
  setCourses(coursesArray) {
    this._coursesData = [...coursesArray];
    this.saveToStorage();
  }

  // Agrega un nuevo curso
  addCourse(course) {
    this._coursesData.unshift(course);
    this.saveToStorage();
  }

  // Elimina un curso por ID
  deleteCourse(id) {
    const index = this._coursesData.findIndex((c) => c.id === id);
    if (index !== -1) {
      this._coursesData.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Busca un curso por ID
  findCourseById(id) {
    return this._coursesData.find((c) => c.id === id);
  }

  // Busca el índice de un curso por ID
  findCourseIndex(id) {
    return this._coursesData.findIndex((c) => c.id === id);
  }

  // Actualiza un curso existente
  updateCourse(id, updatedCourse) {
    const index = this.findCourseIndex(id);
    if (index !== -1) {
      this._coursesData[index] = { ...updatedCourse };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Verifica si existe un curso con el ID dado
  existsById(id) {
    return this._coursesData.some((c) => c.id === id);
  }

  // Verifica si existe un curso con el nombre dado
  existsByName(name) {
    return this._coursesData.some((c) => c.name === name);
  }

  // Obtiene la cantidad total de cursos
  getCount() {
    return this._coursesData.length;
  }

  // Limpia todos los datos
  clear() {
    this._coursesData = [];
    this.saveToStorage();
  }

  // Carga datos desde JSON
  async loadJson() {
    try {
      const response = await fetch(
        "/components/dashboard/courses/courses.json"
      );
      const coursesData = await response.json();
      this._coursesData = coursesData;
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error("Error loading courses JSON:", error);
      return false;
    }
  }
}

// Exporta una instancia única del singleton
export const coursesManager = new CoursesDataManager();
