// api.js - Funciones que llaman a la API de Rick and Morty

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Obtiene un listado paginado de personajes con filtros opcionales.
 * @param {number} page - Número de página a consultar.
 * @param {Object} filters - Objeto con filtros: { name, status, species, gender }.
 * @returns {Promise<Object>} - Respuesta de la API con { info, results }.
 */
async function fetchCharacters(page = 1, filters = {}) {
    // Construir la URL con los parámetros de página y filtros
    const params = new URLSearchParams({ page });

    if (filters.name)    params.append('name',    filters.name);
    if (filters.status)  params.append('status',  filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender)  params.append('gender',  filters.gender);

    const url = `${BASE_URL}/character?${params.toString()}`;

    // Realizar la petición con fetch y async/await
    const response = await fetch(url);

    // Si la respuesta no es exitosa (ej: 404 sin resultados) lanzar error
    if (!response.ok) {
        throw new Error(`Error al obtener personajes: ${response.status}`);
    }

    const data = await response.json();
    return data; // { info: { count, pages, next, prev }, results: [...] }
}

/**
 * Obtiene el detalle de un personaje específico por su ID.
 * @param {number} id - ID del personaje.
 * @returns {Promise<Object>} - Objeto con los datos del personaje.
 */
async function fetchCharacterById(id) {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
        throw new Error(`No se encontró el personaje con ID: ${id}`);
    }

    return await response.json();
}
