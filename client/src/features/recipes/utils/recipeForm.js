const splitLines = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const splitTags = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const emptyRecipeForm = {
  title: '',
  description: '',
  ingredients: '',
  steps: '',
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  servings: 1,
  tags: '',
  imageUrl: '',
};

export const recipeToForm = (recipe) => ({
  title: recipe.title || '',
  description: recipe.description || '',
  ingredients: (recipe.ingredients || []).join('\n'),
  steps: (recipe.steps || []).join('\n'),
  prepTimeMinutes: recipe.prepTimeMinutes || 0,
  cookTimeMinutes: recipe.cookTimeMinutes || 0,
  servings: recipe.servings || 1,
  tags: (recipe.tags || []).join(', '),
  imageUrl: recipe.imageUrl || '',
});

export const formToRecipePayload = (form) => ({
  title: form.title,
  description: form.description,
  ingredients: splitLines(form.ingredients),
  steps: splitLines(form.steps),
  prepTimeMinutes: Number(form.prepTimeMinutes || 0),
  cookTimeMinutes: Number(form.cookTimeMinutes || 0),
  servings: Number(form.servings || 1),
  tags: splitTags(form.tags),
  imageUrl: form.imageUrl,
});
