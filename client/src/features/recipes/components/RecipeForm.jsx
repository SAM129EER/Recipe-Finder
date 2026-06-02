import React from 'react';

import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const labelClass = 'block text-sm font-semibold text-gray-800 mb-2';

const RecipeForm = ({ form, onChange, onSubmit, isSaving, error, submitLabel }) => {
  const updateField = (field) => (event) => {
    onChange({ ...form, [field]: event.target.value });
  };

  return (
    <Card className="max-w-4xl mx-auto rounded-lg">
      <form onSubmit={onSubmit} className="space-y-6">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={inputClass}
            value={form.title}
            onChange={updateField('title')}
            placeholder="Chicken biryani, paneer tacos, lemon rice..."
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={inputClass}
            value={form.description}
            onChange={updateField('description')}
            rows={3}
            placeholder="A short note about the recipe, flavor, or when you like to cook it."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass} htmlFor="prepTimeMinutes">
              Prep Time
            </label>
            <input
              id="prepTimeMinutes"
              className={inputClass}
              min="0"
              type="number"
              value={form.prepTimeMinutes}
              onChange={updateField('prepTimeMinutes')}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="cookTimeMinutes">
              Cook Time
            </label>
            <input
              id="cookTimeMinutes"
              className={inputClass}
              min="0"
              type="number"
              value={form.cookTimeMinutes}
              onChange={updateField('cookTimeMinutes')}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="servings">
              Servings
            </label>
            <input
              id="servings"
              className={inputClass}
              min="1"
              type="number"
              value={form.servings}
              onChange={updateField('servings')}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="ingredients">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            className={inputClass}
            value={form.ingredients}
            onChange={updateField('ingredients')}
            rows={6}
            placeholder={'Add one ingredient per line\n2 cups rice\n1 tbsp ghee\nSalt to taste'}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="steps">
            Steps
          </label>
          <textarea
            id="steps"
            className={inputClass}
            value={form.steps}
            onChange={updateField('steps')}
            rows={7}
            placeholder={'Add one step per line\nWash and soak the rice\nCook spices until fragrant\nSimmer until done'}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              className={inputClass}
              value={form.tags}
              onChange={updateField('tags')}
              placeholder="dinner, quick, vegetarian"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="imageUrl">
              Image URL
            </label>
            <input
              id="imageUrl"
              className={inputClass}
              value={form.imageUrl}
              onChange={updateField('imageUrl')}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="px-6 py-3" disabled={isSaving}>
            {isSaving ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RecipeForm;
