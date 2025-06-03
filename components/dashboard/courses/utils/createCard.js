import { authService } from "/static/js/services/auth.js";

// Función para crear una tarjeta de curso
export function createCourseCard(course, buildingsData) {
  const showActions = authService.isAdmin();
  const actionsStyle = showActions ? "flex" : "none";
  const building = buildingsData.find((b) => b.id === course.buildingId);

  // Crear información del tooltip del edificio
  const buildingTooltip = building
    ? `Ubicación: ${building.location || "N/A"}\nPisos: ${
        building.floors || "N/A"
      }\nCapacidad total: ${building.capacity || "N/A"} personas`
    : "Información del edificio no disponible";

  return `
    <div class="list-card">
      <div class="card-content">
        <div class="card-info">
          <h3>${course.name}</h3>
          <p><strong>ID:</strong> ${course.id}</p>
          <p><strong>Edificio:</strong> 
            <span class="building-name-tooltip" title="${buildingTooltip}">
              ${building?.name || "N/A"}
            </span> 
            (#${course.buildingId})
          </p>
          <p><strong>Capacidad:</strong> ${course.capacity}</p>
        </div>
        <div class="card-actions" style="display: ${actionsStyle};">
          <button class="edit-btn" data-id="${course.id}">✏️</button>
          <button class="delete-btn" data-id="${course.id}">🗑️</button>
        </div>
      </div>
    </div>
  `;
}
