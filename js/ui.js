// Funciones para manipular el DOM


// Devuelve la clase CSS y el texto según el estado del personaje
function getStatusInfo(status) {
    const normalized = status.toLowerCase();
    if (normalized === 'alive') return { cssClass: 'alive',   label: 'Alive' };
    if (normalized === 'dead')  return { cssClass: 'dead',    label: 'Dead' };
    return { cssClass: 'unknown', label: 'Unknown' };
}

// Genera el HTML de una tarjeta de personaje
function createCharacterCard(character) {
    const { cssClass, label } = getStatusInfo(character.status);

    // loading="lazy" hace que las imágenes se carguen solo cuando son visibles
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

// Muestra las tarjetas de personajes en el contenedor
function renderCharacters(characters) {
    const container = document.getElementById('characters-container');

    if (!characters || characters.length === 0) {
        container.innerHTML = `<p class="empty-message">No se encontraron personajes con esos filtros.</p>`;
        return;
    }

    // Se generan todas las tarjetas juntas y se insertan de una sola vez para mejor rendimiento
    container.innerHTML = characters.map(createCharacterCard).join('');
}

// Actualiza el texto de página y habilita o deshabilita los botones de navegación
function updatePaginationControls(currentPage, totalPages) {
    document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
    document.getElementById('prev-btn').disabled = currentPage <= 1;
    document.getElementById('next-btn').disabled = currentPage >= totalPages;
}

// Muestra un mensaje de error en el contenedor
function showError(message) {
    const container = document.getElementById('characters-container');
    container.innerHTML = `<p class="error-message">⚠️ ${message}</p>`;
}

// Muestra el indicador de carga mientras se espera la respuesta de la API
function showLoading() {
    const container = document.getElementById('characters-container');
    container.innerHTML = `<p class="loading-message">Cargando personajes...</p>`;
}

// Oculta el indicador de carga
function hideLoading() {
    const loadingMsg = document.querySelector('.loading-message');
    if (loadingMsg) loadingMsg.remove();
}
