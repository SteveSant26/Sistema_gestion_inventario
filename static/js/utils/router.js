import { routesConfig } from "../config/routes-config.js";
import { loadComponent } from "./load-component.js";
import { getElement } from "./get-element.js";

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
  try {
    const rawPath = window.location.hash || "";
    const defaultPath = routesConfig.dashboard.children.buildings.pattern;

    const path = rawPath.startsWith("#/")
      ? rawPath
      : rawPath.startsWith("#")
        ? `#/${rawPath.slice(1)}`
        : defaultPath;

    const allRoutes = getFlatRoutes(routesConfig);
    const route = allRoutes.find((r) => r.pattern === path);
    const component = route?.page || routesConfig.notFound.page;

    if (component === routesConfig.notFound.page) {
      await loadComponent("#layout-container", component);
      return;
    }

    if (path.startsWith("#/dashboard/")) {
      if (!layoutLoaded) {
        await loadComponent("#layout-container", routesConfig.dashboard.page);
        layoutLoaded = true;
      }

      const tryLoad = async () => {
        const target = getElement("#main-content-container");
        if (target) {
          await loadComponent("#main-content-container", `/${component}`);
        } else {
          setTimeout(tryLoad, 50);
        }
      };

      tryLoad();
    } else {
      layoutLoaded = false;
      await loadComponent("#layout-container", `/${component}`);
    }
  } catch (err) {
    await loadComponent("#layout-container", routesConfig.notFound.page);
  }
}
