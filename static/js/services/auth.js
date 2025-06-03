import { User } from "../models/user.js";
import RolesEnum from "./roles-enum.js";

class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    const userData = localStorage.getItem("user");
    this.user = userData ? JSON.parse(userData) : null;
    AuthService.instance = this;
  }

  async login(email, password) {
    try {
      const users = await fetch("/static/js/services/users.json").then((res) =>
        res.json()
      );
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (foundUser) {
            const user = new User(email, password, foundUser.role);
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
            resolve({ success: true, user });
          } else {
            reject(new Error("Correo o contraseña incorrectos"));
          }
        }, 500);
      });
    } catch (error) {
      return Promise.reject(new Error("Error al cargar usuarios"));
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.user !== null;
  }

  getRole() {
    return this.user ? this.user.role : null;
  }

  isAdmin() {
    return this.user ? this.user.role === RolesEnum.ADMIN : false;
  }
}

// Exporta siempre la misma instancia
export const authService = new AuthService();
