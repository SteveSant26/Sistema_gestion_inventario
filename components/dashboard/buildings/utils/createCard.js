export function createBuildingCard(b) {
  return `
    <div class="list-card">
      <div class="card-content">
        <div class="card-info">
          <h3>${b.name}</h3>
          <p><strong>ID:</strong> ${b.id}</p>
          <p><strong>Ubicación:</strong> ${b.location}</p>
          <p><strong>Pisos:</strong> ${b.floors}</p>
          <p><strong>Capacidad:</strong> ${b.capacity}</p>
        </div>
        <div class="card-actions">
          <button class="edit-btn" data-id="${b.id}">✏️</button>
          <button class="delete-btn" data-id="${b.id}">🗑️</button>
        </div>
      </div>
    </div>
  `;
}
