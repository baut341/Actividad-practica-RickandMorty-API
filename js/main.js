// Logica principal y eventos

// Variables que guardan el estado actual de la aplicación
let currentPage = 1;
let totalPages = 1;
let currentFilters = {};

// Carga los personajes según la página y filtros actuales
async function loadCharacters() {
    showLoading();
    try {
        const data = await fetchCharacters(currentPage, currentFilters);

        // info.pages tiene el total de páginas disponibles según los filtros
        totalPages = data.info.pages;

        renderCharacters(data.results);
        updatePaginationControls(currentPage, totalPages);
    } catch (error) {
        // Si la API falla o no hay resultados, se muestra el error al usuario
        showError(error.message || 'Ocurrio un error al cargar los personajes.');
        updatePaginationControls(1, 1);
    }
}

// Lee el formulario y aplica los filtros desde la página 1
function applyFilters() {
    currentFilters = {
        name:    document.getElementById('name-filter').value.trim(),
        status:  document.getElementById('status-filter').value,
        species: document.getElementById('species-filter').value.trim(),
        gender:  document.getElementById('gender-filter').value,
    };
    // Al aplicar nuevos filtros se vuelve a la primera página
    currentPage = 1;
    loadCharacters();
}

// preventDefault evita que el formulario recargue la página al enviarse
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    applyFilters();
});

// Boton anterior
document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Boton siguiente
document.getElementById('next-btn').addEventListener('click', function() {
    if (currentPage < totalPages) {
        currentPage++;
        loadCharacters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Boton limpiar: resetea los campos y vuelve a la página 1
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('search-form').reset();
    currentFilters = {};
    currentPage = 1;
    loadCharacters();
});

// Carga inicial al abrir la página
loadCharacters();
