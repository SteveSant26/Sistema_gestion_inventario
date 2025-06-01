import { AuthService } from "../services/auth.js";
import { routesConfig } from "../config/routes-config.js";

export function guestGuard() {
  // Se crea una instancia del servicio de autenticación
  const authService = new AuthService();

  // Se obtiene la ruta actual del navegador (hash), o se usa "#/" por defecto
  const currentHash = window.location.hash || "#/";

  // Si el usuario está autenticado
  if (authService.isLoggedIn()) {
    // Si intenta acceder a la página de login, se redirige al dashboard
    if (currentHash === routesConfig.login.pattern) {
      window.location.hash = routesConfig.dashboard.pattern;
    }
  } else {
    // Si no está autenticado y la ruta actual no es la del login,
    // se lo redirige a la página de login
    if (currentHash !== routesConfig.login.pattern) {
      window.location.hash = routesConfig.login.pattern;
    }
  }
}
