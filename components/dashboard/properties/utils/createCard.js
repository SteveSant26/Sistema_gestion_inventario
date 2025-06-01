import { statusColors } from "./constants.js";

export function createPropertyCard(p, coursesData, categoriesData) {
  // Crear una tarjeta de propiedad
  const course = coursesData.find((c) => c.id === p.courseId);
  const category = categoriesData.find((cat) => cat.id === p.categoryId);

  // Formatear la fecha de llegada
  const formattedDate = new Date(p.arrivalDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Crear información del tooltip del curso
  const courseTooltip = course
    ? `Id: ${course.id || "N/A"}\nNombre: ${
        course.name || "Sin nombre"
      }\nId del Edificio: ${course.buildingId || "N/A"}\nCapacidad: ${
        course.capacity || "N/A"
      }`
    : "Información no disponible";

  // Crear información del tooltip de la categoría
  const categoryTooltip = category
    ? `Id: ${category.id || "N/A"}\nNombre: ${
        category.name || "Sin nombre"
      }\nDescripción: ${category.description || "Sin descripción"}`
    : "Información no disponible";

  const statusColor = statusColors[p.status] || "#6c757d";

  return `
  <div class="list-card">
    <div class="card-content">
      <div class="card-info">
        <h3>${p.name}</h3>
        <p><strong>ID:</strong> ${p.id}</p>
         <p><strong>Categoría:</strong> 
          <span class="category-name-tooltip" title="${categoryTooltip}">
            ${category ? category.name : "N/A"}
          </span> 
          (#${p.categoryId})
        </p>
        <p><strong>Curso:</strong> 
          <span class="course-name-tooltip" title="${courseTooltip}">
            ${course ? course.name : "N/A"}
          </span> 
          (#${p.courseId})
        </p>
        <p><strong>Estado:</strong> <span style="color: ${statusColor}; font-weight: bold;">${
    p.status
  }</span></p>
        <p><strong>Fecha de llegada:</strong> ${formattedDate}</p>
        <p><strong>Cantidad:</strong> ${p.quantity} unidad${
    p.quantity > 1 ? "es" : ""
  }</p>
      </div>
      <div class="card-actions">
        <button class="edit-btn" data-id="${p.id}">✏️</button>
        <button class="delete-btn" data-id="${p.id}">🗑️</button>
      </div>
    </div>
  </div>`;
}
