import { AuthService } from "/js/services/auth.js";
import { routesConfig } from "/js/config/routes-config.js";
import { getElement } from "/js/utils/get-element.js";

// Esta función controla qué botón mostrar según el estado de autenticación
export function renderAuthButton() {
  const logoutBtnNav = getElement("logout");
  const loginLinkNav = getElement("#auth-actions a");

  // Asegura que el botón de login apunte siempre a la ruta definida
  loginLinkNav.href = routesConfig.login.pattern;

  // Si los elementos no se encuentran, no se hace nada
  if (!logoutBtnNav || !loginLinkNav) {
    return;
  }

  const authService = new AuthService();

  // Si el usuario está autenticado, se muestra el botón de logout
  if (authService.isLoggedIn()) {
    logoutBtnNav.style.display = "inline-block";
    loginLinkNav.style.display = "none";

    // Al hacer logout, se limpia la sesión y se redirige al login
    logoutBtnNav.addEventListener("click", () => {
      authService.logout();
      renderAuthButton(); // Actualiza los botones
      window.location.href = routesConfig.login.pattern;
    });
  } else {
    // Si no está autenticado, se muestra el botón de login
    logoutBtnNav.style.display = "none";
    loginLinkNav.style.display = "inline-block";
  }
}

// Ejecuta la función al cargar
renderAuthButton();
