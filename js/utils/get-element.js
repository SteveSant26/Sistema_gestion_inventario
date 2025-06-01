export function getElement(selector) {
  // Si el selector empieza con "#" (id) o "." (clase), se usa querySelector
  if (selector.startsWith("#") || selector.startsWith(".")) {
    return document.querySelector(selector);
  } else {
    // Si no, se asume que es un id sin "#" y se usa getElementById
    return document.getElementById(selector);
  }
}
