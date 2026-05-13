// Funciones para consumir la Rick and Morty API

const BASE_URL = 'https://rickandmortyapi.com/api';

// Trae los personajes de la API según la página y los filtros aplicados
async function fetchCharacters(page = 1, filters = {}) {

    // URLSearchParams arma la query string automáticamente (ej: ?page=1&name=rick)
    const params = new URLSearchParams({ page });

    // Solo se agregan los filtros que el usuario completó
    if (filters.name)    params.append('name',    filters.name);
    if (filters.status)  params.append('status',  filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender)  params.append('gender',  filters.gender);

    const response = await fetch(`${BASE_URL}/character?${params.toString()}`);

    // La API devuelve 404 cuando no hay resultados para los filtros aplicados
    if (!response.ok) {
        throw new Error(`Error al obtener personajes: ${response.status}`);
    }

    // Devuelve { info: { count, pages, next, prev }, results: [...] }
    return await response.json();
}

// Trae los datos de un personaje específico por su ID
async function fetchCharacterById(id) {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
        throw new Error(`No se encontró el personaje con ID: ${id}`);
    }

    return await response.json();
}
