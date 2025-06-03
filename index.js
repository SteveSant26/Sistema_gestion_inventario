// Importa la función guestGuard para proteger rutas de invitados
import { guestGuard } from "./static/js/utils/guest-guard.js";
// Importa la función loadComponent para cargar componentes HTML dinámicamente
import { loadComponent } from "./static/js/utils/load-component.js";
// Importa el router para manejar la navegación de la aplicación
import { router } from "./static/js/utils/router.js";


// Escucha cambios en el hash de la URL (navegación SPA)
window.addEventListener("hashchange", () => {
  guestGuard(); // Verifica si el usuario tiene acceso a la ruta
  router();     // Actualiza la vista según la ruta actual
});

// Cuando el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("#header", "/components/header/header.html"); // Carga el header
  loadComponent("#footer", "/components/footer/footer.html"); // Carga el footer
  guestGuard(); // Verifica acceso al cargar la página
  router();     // Inicializa la vista según la ruta actual
  // loadJson()
});


// Imports para dataManager (corregidos)
import { buildingsManager } from "./components/dashboard/buildings/utils/dataManager.js";
import { coursesManager } from "./components/dashboard/courses/utils/dataManager.js";
import { categoriesManager } from "./components/dashboard/categories/utils/dataManager.js";
import { propertiesManager } from "./components/dashboard/properties/utils/dataManager.js";

function loadJson() {
buildingsManager.loadJson();
coursesManager.loadJson();
categoriesManager.loadJson();
propertiesManager.loadJson();
}