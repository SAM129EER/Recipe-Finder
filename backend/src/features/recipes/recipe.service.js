import mongoose from "mongoose";

import AppError from "../../shared/errors/AppError.js";
import Recipe from "./recipe.model.js";
import recipeMessages from "./recipe.messages.js";
import { serializeRecipe, serializeRecipes } from "./recipe.serializer.js";

const toCleanStringArray = (value) => {
  if (!Array.isArray(value)) return [];

  return value.map((item) => String(item).trim()).filter(Boolean);
};

const toNonNegativeNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;

  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 0 ? numericValue : fallback;
};

const toPositiveNumber = (value, fallback = 1) => {
  if (value === undefined || value === null || value === "") return fallback;

  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 1 ? numericValue : fallback;
};

const normalizeRecipePayload = (payload) => ({
  title: String(payload.title || "").trim(),
  description: String(payload.description || "").trim(),
  ingredients: toCleanStringArray(payload.ingredients),
  steps: toCleanStringArray(payload.steps),
  prepTimeMinutes: toNonNegativeNumber(payload.prepTimeMinutes),
  cookTimeMinutes: toNonNegativeNumber(payload.cookTimeMinutes),
  servings: toPositiveNumber(payload.servings),
  tags: toCleanStringArray(payload.tags).map((tag) => tag.toLowerCase()),
  imageUrl: String(payload.imageUrl || "").trim(),
});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const validateRecipePayload = (payload) => {
  if (!payload.title) {
    throw new AppError(recipeMessages.missingTitle, 400);
  }

  if (payload.ingredients.length === 0) {
    throw new AppError(recipeMessages.missingIngredients, 400);
  }

  if (payload.steps.length === 0) {
    throw new AppError(recipeMessages.missingSteps, 400);
  }
};

const buildRecipeQuery = ({ ownerId, search, tag }) => {
  const query = { owner: ownerId };

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), "i");
    query.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { ingredients: searchRegex },
      { tags: searchRegex },
    ];
  }

  if (tag) {
    query.tags = tag.toLowerCase();
  }

  return query;
};

const list = async ({ ownerId, search = "", tag = "" }) => {
  const recipes = await Recipe.find(buildRecipeQuery({ ownerId, search, tag }))
    .sort({ updatedAt: -1 })
    .lean();

  return serializeRecipes(recipes);
};

const getById = async ({ ownerId, recipeId }) => {
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  const recipe = await Recipe.findOne({ _id: recipeId, owner: ownerId }).lean();

  if (!recipe) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  return serializeRecipe(recipe);
};

const create = async ({ ownerId, payload }) => {
  const normalizedPayload = normalizeRecipePayload(payload);
  validateRecipePayload(normalizedPayload);

  const recipe = await Recipe.create({
    ...normalizedPayload,
    owner: ownerId,
  });

  return {
    recipe: serializeRecipe(recipe),
    message: recipeMessages.created,
  };
};

const update = async ({ ownerId, recipeId, payload }) => {
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  const normalizedPayload = normalizeRecipePayload(payload);
  validateRecipePayload(normalizedPayload);

  const recipe = await Recipe.findOneAndUpdate(
    { _id: recipeId, owner: ownerId },
    normalizedPayload,
    { new: true, runValidators: true },
  );

  if (!recipe) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  return {
    recipe: serializeRecipe(recipe),
    message: recipeMessages.updated,
  };
};

const remove = async ({ ownerId, recipeId }) => {
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  const recipe = await Recipe.findOneAndDelete({ _id: recipeId, owner: ownerId });

  if (!recipe) {
    throw new AppError(recipeMessages.notFound, 404);
  }

  return { message: recipeMessages.deleted };
};

const recipeService = {
  create,
  getById,
  list,
  remove,
  update,
};

export default recipeService;
