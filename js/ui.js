// ui.js - Funciones que manipulan el DOM

/**
 * Determina la clase CSS y etiqueta de texto según el estado del personaje.
 * @param {string} status - Estado: 'Alive', 'Dead' o 'unknown'.
 * @returns {{ cssClass: string, label: string }}
 */
function getStatusInfo(status) {
    const normalized = status.toLowerCase();
    if (normalized === 'alive')  return { cssClass: 'alive',   label: 'Alive' };
    if (normalized === 'dead')   return { cssClass: 'dead',    label: 'Dead' };
    return { cssClass: 'unknown', label: 'Unknown' };
}

/**
 * Genera el HTML de una tarjeta de personaje.
 * @param {Object} character - Objeto con datos del personaje de la API.
 * @returns {string} - String HTML de la tarjeta.
 */
function createCharacterCard(character) {
    const { cssClass, label } = getStatusInfo(character.status);

    return `
        <article class="character-card">
            <img src="${character.image}" alt="${character.name}" loading="lazy">
            <div class="card-info">
                <h2>${character.name}</h2>
                <p class="status">
                    <span class="status-icon ${cssClass}"></span>
                    ${label} - ${character.species}
                </p>
                <p class="origin">${character.origin.name}</p>
            </div>
        </article>
    `;
}

/**
 * Renderiza la lista de personajes en el contenedor del DOM.
 * @param {Array} characters - Array de objetos personaje.
 */
function renderCharacters(characters) {
    const container = document.getElementById('characters-container');

    if (!characters || characters.length === 0) {
        container.innerHTML = `<p class="empty-message">No se encontraron personajes con esos filtros.</p>`;
        return;
    }

    // Crear todas las tarjetas y renderizarlas de una sola vez
    container.innerHTML = characters.map(createCharacterCard).join('');
}

/**
 * Actualiza el estado de los controles de paginación.
 * @param {number} currentPage - Página actual.
 * @param {number} totalPages  - Total de páginas disponibles.
 */
function updatePaginationControls(currentPage, totalPages) {
    const prevBtn  = document.getElementById('prev-btn');
    const nextBtn  = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    // Mostrar "Página X de Y"
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    // Deshabilitar botones según corresponda
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
}

/**
 * Muestra un mensaje de error visible al usuario.
 * @param {string} message - Texto del error a mostrar.
 */
function showError(message) {
    const container = document.getElementById('characters-container');
    container.innerHTML = `<p class="error-message">⚠️ ${message}</p>`;
}
