const serializeRecipe = (recipe) => ({
  id: recipe._id,
  title: recipe.title,
  description: recipe.description,
  ingredients: recipe.ingredients,
  steps: recipe.steps,
  prepTimeMinutes: recipe.prepTimeMinutes,
  cookTimeMinutes: recipe.cookTimeMinutes,
  servings: recipe.servings,
  tags: recipe.tags,
  imageUrl: recipe.imageUrl,
  createdAt: recipe.createdAt,
  updatedAt: recipe.updatedAt,
});

const serializeRecipes = (recipes) => recipes.map(serializeRecipe);

export { serializeRecipe, serializeRecipes };
