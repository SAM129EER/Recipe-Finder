import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import { listRecipesApi } from '../api/recipeApi';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const params = useMemo(
    () => ({
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(tag.trim() ? { tag: tag.trim() } : {}),
    }),
    [search, tag],
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await listRecipesApi(params);
        setRecipes(response.data.recipes || []);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Could not load recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [params]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Kitchen Library</p>
          <h1 className="text-3xl font-black text-gray-950 mt-1">Your Recipes</h1>
        </div>
        <Link to="/recipes/new">
          <Button variant="primary" className="w-full lg:w-auto px-6 py-3">
            Add Recipe
          </Button>
        </Link>
      </div>

      <Card className="rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, ingredient, or note"
          />
          <input
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            placeholder="Filter by tag"
          />
        </div>
      </Card>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="text-gray-600">Loading recipes...</div>
      ) : recipes.length === 0 ? (
        <Card className="rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-950 mb-2">No recipes yet</h2>
          <p className="text-gray-600 mb-6">
            Save your first dish with ingredients, steps, tags, and cooking time.
          </p>
          <Link to="/recipes/new">
            <Button variant="primary" className="mx-auto px-6 py-3">
              Create First Recipe
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="block h-full">
              <Card className="rounded-lg p-0 overflow-hidden h-full hover:border-blue-300 hover:shadow-md transition">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="h-40 w-full object-cover bg-gray-100"
                  />
                ) : (
                  <div className="h-40 w-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    Recipe
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-950 line-clamp-1">{recipe.title}</h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-10">
                    {recipe.description || 'No description added yet.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(recipe.tags || []).slice(0, 3).map((recipeTag) => (
                      <span
                        key={recipeTag}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600"
                      >
                        {recipeTag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>{recipe.ingredients.length} ingredients</span>
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
