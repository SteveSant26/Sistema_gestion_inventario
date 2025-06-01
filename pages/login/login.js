import { AuthService } from "/static/js/services/auth.js"; // Importa el servicio de autenticación
import { routesConfig } from "/static/js/config/routes-config.js"; // Importa la configuración de rutas
import { renderAuthButton } from "/components/header/header.js"; // Importa función para mostrar el botón de autenticación
import { getElement } from "/static/js/utils/get-element.js"; // Importa función para obtener elementos del DOM

// Obtiene los elementos del formulario de login
const emailInput = getElement("email");
const passwordInput = getElement("password");
const errorMessage = getElement(".error-message");
const loginBtn = getElement("#loginBtn");

const authService = new AuthService(); // Crea una instancia del servicio de autenticación

// Función que maneja el evento de login
async function handleLogin(event) {
  event.preventDefault(); // Previene el comportamiento por defecto del formulario
  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = ""; // Limpia mensajes de error previos

  // Valida que los campos no estén vacíos
  if (!email || !password) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Por favor, rellena todos los campos";
    return;
  }

  try {
    // Intenta iniciar sesión con el servicio de autenticación
    const result = await authService.login(email, password);

    if (result.success) {
      renderAuthButton(); // Actualiza el botón de autenticación en el header
      window.location.href = routesConfig.dashboard.children.buildings.pattern; // Redirige al dashboard
    }
  } catch (error) {
    // Muestra mensaje de error si falla el login
    errorMessage.style.display = "block";
    errorMessage.textContent = error.message;
  }
}

// Asigna el evento click al botón de login
loginBtn.addEventListener("click", handleLogin);

// Permite iniciar sesión presionando Enter en los campos de email o contraseña
if (emailInput && passwordInput) {
  emailInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleLogin();
  });

  passwordInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") handleLogin();
  });
}
