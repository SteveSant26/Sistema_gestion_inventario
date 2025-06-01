import { User } from "../models/user.js";

export class AuthService {
  constructor() {
    // Intenta recuperar el usuario guardado en localStorage
    const userData = localStorage.getItem("user");
    this.user = userData ? JSON.parse(userData) : null;
  }

  async login(email, password) {
    try {
      // Carga la lista de usuarios desde un archivo JSON
      const users = await fetch("/static/js/services/users.json").then((res) =>
        res.json()
      );

      // Busca un usuario que coincida con el email y la contraseña proporcionados
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      // Simula un pequeño retraso para el proceso de login (por ejemplo, efecto de carga)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (foundUser) {
            // Si se encuentra, crea una instancia de User y la guarda en localStorage
            const user = new User(email, password);
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
            resolve({ success: true, user });
          } else {
            // Si no se encuentra, rechaza con un error de autenticación
            reject(new Error("Correo o contraseña incorrectos"));
          }
        }, 500);
      });
    } catch (error) {
      // Si ocurre un error al cargar el archivo JSON, lanza un error genérico
      return Promise.reject(new Error("Error al cargar usuarios"));
    }
  }

  // Cierra la sesión eliminando el usuario de localStorage y de la instancia
  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }

  // Devuelve el usuario autenticado actualmente
  getUser() {
    return this.user;
  }

  // Verifica si hay un usuario autenticado
  isLoggedIn() {
    return this.user !== null;
  }
}
