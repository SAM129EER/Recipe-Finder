import API from '../../../shared/api/client';

export const listRecipesApi = (params = {}) => API.get('/recipes', { params });

export const getRecipeApi = (id) => API.get(`/recipes/${id}`);

export const createRecipeApi = (recipe) => API.post('/recipes', recipe);

export const updateRecipeApi = (id, recipe) => API.put(`/recipes/${id}`, recipe);

export const deleteRecipeApi = (id) => API.delete(`/recipes/${id}`);
