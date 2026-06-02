import asyncHandler from "../../shared/utils/asyncHandler.js";
import recipeService from "./recipe.service.js";

const listRecipes = asyncHandler(async (req, res) => {
  const recipes = await recipeService.list({
    ownerId: req.user._id,
    search: req.query.search,
    tag: req.query.tag,
  });

  res.json({ recipes });
});

const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await recipeService.getById({
    ownerId: req.user._id,
    recipeId: req.params.id,
  });

  res.json(recipe);
});

const createRecipe = asyncHandler(async (req, res) => {
  const result = await recipeService.create({
    ownerId: req.user._id,
    payload: req.body,
  });

  res.status(201).json(result);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const result = await recipeService.update({
    ownerId: req.user._id,
    recipeId: req.params.id,
    payload: req.body,
  });

  res.json(result);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const result = await recipeService.remove({
    ownerId: req.user._id,
    recipeId: req.params.id,
  });

  res.json(result);
});

export { createRecipe, deleteRecipe, getRecipe, listRecipes, updateRecipe };
