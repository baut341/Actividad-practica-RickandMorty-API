// main.js - Lógica principal y manejo de eventos

// --- Estado de la aplicación ---
let currentPage  = 1;  // Página actual
let totalPages   = 1;  // Total de páginas disponibles
let currentFilters = {}; // Filtros activos

/**
 * Carga y muestra los personajes aplicando la página y los filtros actuales.
 */
async function loadCharacters() {
    try {
        // Llamar a la API con la página y los filtros actuales
        const data = await fetchCharacters(currentPage, currentFilters);

        // Actualizar el total de páginas según la respuesta de la API
        totalPages = data.info.pages;

        // Renderizar las tarjetas de personajes
        renderCharacters(data.results);

        // Actualizar los botones de paginación
        updatePaginationControls(currentPage, totalPages);

    } catch (error) {
        // Mostrar mensaje de error al usuario
        showError(error.message || 'Ocurrió un error al cargar los personajes.');
        // Deshabilitar paginación si hay error
        updatePaginationControls(currentPage, 1);
    }
}

/**
 * Lee los valores del formulario de búsqueda y actualiza los filtros.
 */
function applyFilters() {
    // Obtener los valores de los campos del formulario
    currentFilters = {
        name:    document.getElementById('name-filter').value.trim(),
        status:  document.getElementById('status-filter').value,
        species: document.getElementById('species-filter').value,
        gender:  document.getElementById('gender-filter').value,
    };

    // Reiniciar a la primera página al aplicar un nuevo filtro
    currentPage = 1;

    loadCharacters();
}

// --- Eventos de la interfaz ---

// Evento: enviar el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que la página se recargue
    applyFilters();
});

// Evento: clic en botón "Anterior"
document.getElementById('prev-btn').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters();
    }
});

// Evento: clic en botón "Siguiente"
document.getElementById('next-btn').addEventListener('click', function () {
    if (currentPage < totalPages) {
        currentPage++;
        loadCharacters();
    }
});

// --- Carga inicial al abrir la página ---
loadCharacters();
