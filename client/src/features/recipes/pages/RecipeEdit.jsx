import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import { getRecipeApi, updateRecipeApi } from '../api/recipeApi';
import { emptyRecipeForm, formToRecipePayload, recipeToForm } from '../utils/recipeForm';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyRecipeForm);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getRecipeApi(id);
        setForm(recipeToForm(response.data));
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || 'Could not load this recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await updateRecipeApi(id, formToRecipePayload(form));
      navigate(`/recipes/${response.data.recipe.id}`);
    } catch (saveError) {
      setError(saveError.response?.data?.message || 'Could not update recipe.');
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading recipe...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to={`/recipes/${id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to recipe
        </Link>
        <h1 className="text-3xl font-black text-gray-950 mt-2">Edit Recipe</h1>
      </div>

      <RecipeForm
        form={form}
        onChange={setForm}
        onSubmit={handleSubmit}
        isSaving={isSaving}
        error={error}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default RecipeEdit;
