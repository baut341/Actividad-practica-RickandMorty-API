// Logica principal y eventos

let currentPage = 1;
let totalPages = 1;
let currentFilters = {};

// Carga los personajes segun la pagina y filtros actuales
async function loadCharacters() {
    try {
        const data = await fetchCharacters(currentPage, currentFilters);
        totalPages = data.info.pages;
        renderCharacters(data.results);
        updatePaginationControls(currentPage, totalPages);
    } catch (error) {
        showError(error.message || 'Ocurrio un error al cargar los personajes.');
        updatePaginationControls(1, 1);
    }
}

// Lee el formulario y aplica los filtros desde la pagina 1
function applyFilters() {
    currentFilters = {
        name:    document.getElementById('name-filter').value.trim(),
        status:  document.getElementById('status-filter').value,
        species: document.getElementById('species-filter').value.trim(),
        gender:  document.getElementById('gender-filter').value,
    };
    currentPage = 1;
    loadCharacters();
}

// Envio del formulario de busqueda
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    applyFilters();
});

// Boton anterior
document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters();
    }
});

// Boton siguiente
document.getElementById('next-btn').addEventListener('click', function() {
    if (currentPage < totalPages) {
        currentPage++;
        loadCharacters();
    }
});

// Boton limpiar: resetea los campos y vuelve a la pagina 1
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('search-form').reset();
    currentFilters = {};
    currentPage = 1;
    loadCharacters();
});

// Carga inicial al abrir la pagina
loadCharacters();
