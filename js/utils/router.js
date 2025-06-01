import { routesConfig } from "/js/config/routes-config.js";
import { loadComponent } from "/js/utils/load-component.js";
import { getElement } from "/js/utils/get-element.js";

let layoutLoaded = false;

/**
 * Convierte una estructura anidada de rutas en una lista plana para fácil búsqueda.
 */
function getFlatRoutes(config) {
  const flat = [];

  for (const key in config) {
    const route = config[key];

    if (route.pattern && route.page) {
      flat.push({
        pattern: route.pattern,
        page: route.page,
        label: route.label,
      });
    }

    if (route.children) {
      flat.push(...getFlatRoutes(route.children));
    }
  }

  return flat;
}

/**
 * Función principal de enrutamiento. Carga dinámicamente los componentes de cada ruta.
 */
export async function router() {
  const defaultPath = routesConfig.dashboard.children.buildings.pattern;
  const path = window.location.hash || defaultPath;

  const allRoutes = getFlatRoutes(routesConfig);
  const route = allRoutes.find((r) => r.pattern === path);
  const component = route?.page || routesConfig.notFound.page;

  // Si no se encuentra la ruta, renderiza el componente 404
  if (component === routesConfig.notFound.page) {
    await loadComponent("#layout-container", component);
    return;
  }

  // Rutas del dashboard
  if (path.startsWith("#/dashboard/")) {
    // Cargar layout una sola vez
    if (!layoutLoaded) {
      await loadComponent("#layout-container", routesConfig.dashboard.page);
      layoutLoaded = true;
    }

    // Espera hasta que #main-content-container esté en el DOM
    const tryLoad = async () => {
      const target = getElement("#main-content-container");
      if (target) {
        await loadComponent("#main-content-container", `/${component}`);
      } else {
        setTimeout(tryLoad, 50); // Reintenta después de 50ms
      }
    };

    tryLoad();
  } else {
    layoutLoaded = false; // Reiniciar layout si se cambia de sección
    await loadComponent("#layout-container", `/${component}`);
  }
}
