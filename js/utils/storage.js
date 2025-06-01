/**
 * Guarda datos en localStorage bajo una clave específica.
 */
export function saveToStorage(key, data) {
  if (!key) {
    console.error("No se proporcionó una clave para el almacenamiento.");
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
}

/**
 * Carga datos desde localStorage por clave.
 */
export function loadFromStorage(key) {
  if (!key) {
    console.error("No se proporcionó una clave para la lectura.");
    return null;
  }
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error al leer desde localStorage:", error);
    return null;
  }
}
