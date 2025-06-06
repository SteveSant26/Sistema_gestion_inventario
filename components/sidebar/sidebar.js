import { getElement } from "/static/js/utils/get-element.js";
import {authService} from "/static/js/services/auth.js";
import RolesEnum from "/static/js/services/roles-enum.js";

// Personaliza el sidebar según el rol
function adjustSidebarForRole() {
  const header = getElement(".sidebar-header h2");
  header.textContent = authService.isAdmin() ? "Panel Admin" : "Panel Auditor";

}

// Espera a que el sidebar esté disponible antes de marcar el ítem activo
function waitForSidebarAndSetActive() {
  const sidebar = document.querySelector("#sidebar");
  if (sidebar) {
    adjustSidebarForRole();
    selectMenuItemByPath(window.location.hash);
  } else {
    // Si aún no existe en el DOM, vuelve a intentar luego
    setTimeout(waitForSidebarAndSetActive, 50);
  }
}

waitForSidebarAndSetActive();

// Marca como activo el ítem del menú correspondiente al hash actual
function selectMenuItemByPath(path) {
  document.querySelectorAll(".menu-item, .tab-item").forEach((menuItem) => {
    const href = menuItem.getAttribute("href");
    if (href === path) {
      menuItem.classList.add("active");
    } else {
      menuItem.classList.remove("active");
    }
  });
}

// Si el ancho supera el límite móvil, cierra el sidebar (por si quedó abierto)
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const sidebar = getElement("#sidebar");
    sidebar.classList.remove("active");
  }
});

// Actualiza el ítem activo si se cambia el hash manualmente o por navegación
window.addEventListener("hashchange", () => {
  waitForSidebarAndSetActive();
});
