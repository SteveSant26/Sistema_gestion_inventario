// Función para crear una tarjeta de categoría
export function createCategoryCard(cat) {
  return `
    <div class="list-card">
      <div class="card-info">
        <h3>${cat.name}</h3>
        <p><strong>ID:</strong> ${cat.id}</p>
        <p><strong>Descripción:</strong> ${cat.description}</p>
      </div>
      <div class="card-actions">
        <button class="edit-btn" data-id="${cat.id}">✏️</button>
        <button class="delete-btn" data-id="${cat.id}">🗑️</button>
      </div>
    </div>
  `;
}