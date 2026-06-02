import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import { createRecipeApi } from '../api/recipeApi';
import { emptyRecipeForm, formToRecipePayload } from '../utils/recipeForm';

const RecipeCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyRecipeForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await createRecipeApi(formToRecipePayload(form));
      navigate(`/recipes/${response.data.recipe.id}`);
    } catch (saveError) {
      setError(saveError.response?.data?.message || 'Could not create recipe.');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/recipes" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to recipes
        </Link>
        <h1 className="text-3xl font-black text-gray-950 mt-2">Add New Recipe</h1>
      </div>

      <RecipeForm
        form={form}
        onChange={setForm}
        onSubmit={handleSubmit}
        isSaving={isSaving}
        error={error}
        submitLabel="Create Recipe"
      />
    </div>
  );
};

export default RecipeCreate;
