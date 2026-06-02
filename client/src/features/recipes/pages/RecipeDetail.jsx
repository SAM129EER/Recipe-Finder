import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import { deleteRecipeApi, getRecipeApi } from '../api/recipeApi';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getRecipeApi(id);
        setRecipe(response.data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Could not load this recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this recipe permanently?');
    if (!confirmed) return;

    setIsDeleting(true);
    setError('');

    try {
      await deleteRecipeApi(id);
      navigate('/recipes');
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || 'Could not delete this recipe.');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading recipe...</div>;
  }

  if (error && !recipe) {
    return (
      <Card className="rounded-lg">
        <p className="text-red-700">{error}</p>
        <Link to="/recipes" className="inline-block mt-4">
          <Button variant="outline">Back to Recipes</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <Link to="/recipes" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Back to recipes
          </Link>
          <h1 className="text-3xl font-black text-gray-950 mt-2">{recipe.title}</h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            {recipe.description || 'No description added.'}
          </p>
        </div>

        <div className="flex gap-3">
          <Link to={`/recipes/${recipe.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full max-h-96 object-cover rounded-lg border border-gray-200 bg-gray-100"
        />
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Prep</p>
          <p className="text-2xl font-black text-gray-950 mt-1">{recipe.prepTimeMinutes} min</p>
        </Card>
        <Card className="rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Cook</p>
          <p className="text-2xl font-black text-gray-950 mt-1">{recipe.cookTimeMinutes} min</p>
        </Card>
        <Card className="rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Servings</p>
          <p className="text-2xl font-black text-gray-950 mt-1">{recipe.servings}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-lg">
          <h2 className="text-xl font-bold text-gray-950 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`} className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-lg">
          <h2 className="text-xl font-bold text-gray-950 mb-4">Steps</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={`${step}-${index}`} className="flex gap-3 text-gray-700">
                <span className="h-7 w-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {recipe.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((recipeTag) => (
            <span
              key={recipeTag}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
            >
              {recipeTag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RecipeDetail;
