import { getElement } from "/js/utils/get-element.js";

export async function loadComponent(id, path) {
  try {
    // Se hace una petición al recurso especificado en `path`
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Error loading ${path}: ${response.status}`);
    }

    const html = await response.text();

    // Se obtiene el contenedor objetivo donde se insertará el contenido cargado
    const target = typeof id === "string" ? getElement(id) : id;

    // Se valida que el contenedor exista y sea un elemento HTML
    if (!(target instanceof HTMLElement)) {
      console.warn("Invalid target element:", id);
      return;
    }

    // Se crea un contenedor temporal para insertar el HTML cargado
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Se eliminan los <script> del HTML antes de insertar en el DOM
    const scripts = temp.querySelectorAll("script");
    scripts.forEach((s) => s.remove());

    // Se procesan los <link> para asegurarse de que las rutas sean absolutas
    const links = temp.querySelectorAll("link[href]");
    links.forEach((link) => {
      const href = link.getAttribute("href");

      // Si el href es relativo, lo convertimos a una ruta absoluta
      if (href && !href.startsWith("/") && !href.startsWith("http")) {
        const absoluteHref = new URL(href, window.location.origin + path)
          .pathname;
        link.setAttribute("href", absoluteHref);
      }

      // Se evita insertar enlaces duplicados en el <head>
      const isAlreadyLoaded = [...document.head.querySelectorAll("link")].some(
        (l) => l.href === link.href
      );
      if (!isAlreadyLoaded) {
        document.head.appendChild(link.cloneNode());
      }
    });

    // Se limpia el contenedor de destino antes de insertar el nuevo contenido
    target.innerHTML = "";
    Array.from(temp.childNodes).forEach((node) => target.appendChild(node));

    // Se reinsertan los scripts extraídos para que se ejecuten correctamente
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      // Se copian los atributos del script original
      [...oldScript.attributes].forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Si es un script externo, se le agrega un parámetro para evitar cache
      if (oldScript.src) {
        const url = new URL(oldScript.src, location.origin);
        url.searchParams.set("_", Date.now());
        newScript.src = url.toString();
      } else {
        // Si es un script inline, se copia su contenido
        newScript.textContent = oldScript.textContent;
      }

      // Se agrega el nuevo script al final del body
      document.body.appendChild(newScript);
    });
  } catch (err) {
    // Manejo de errores en caso de fallas en la carga del componente
    console.error("Error loading component:", err);
  }
}
