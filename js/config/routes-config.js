export const routesConfig = {
  // Ruta para la página de inicio de sesión
  login: {
    pattern: "#/login", // Fragmento de URL que identifica la ruta
    page: "pages/login/login.html", // Ruta del archivo HTML a cargar
    label: "Iniciar sesión", // Etiqueta para mostrar en la interfaz
  },

  // Ruta base del dashboard
  dashboard: {
    pattern: "/", // Ruta principal cuando el usuario está autenticado
    page: "pages/site/site.html", // Layout principal del dashboard
    label: "Inicio",
    children: {
      // Subruta para administrar edificios
      buildings: {
        pattern: "#/dashboard/buildings",
        page: "components/dashboard/buildings/buildings.html",
        label: "Administrar edificios",
      },
      // Subruta para administrar cursos
      courses: {
        pattern: "#/dashboard/courses",
        page: "components/dashboard/courses/courses.html",
        label: "Administrar cursos",
      },
      // Subruta para administrar categorías
      categories: {
        pattern: "#/dashboard/categories",
        page: "components/dashboard/categories/categories.html",
        label: "Administrar categorías",
      },
      // Subruta para administrar inmuebles
      properties: {
        pattern: "#/dashboard/properties",
        page: "components/dashboard/properties/properties.html",
        label: "Administrar inmuebles",
      },
    },
  },

  // Ruta para página no encontrada (404)
  notFound: {
    page: "pages/404/404.html", // Página que se muestra si la ruta no coincide
    label: "No encontrado",
  },
};
