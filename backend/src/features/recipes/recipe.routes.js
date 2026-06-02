import express from "express";

import { protect } from "../../shared/middleware/auth.middleware.js";
import { createRecipe, deleteRecipe, getRecipe, listRecipes, updateRecipe } from "./recipe.controller.js";

const router = express.Router();

router.use(protect);

router.route("/").get(listRecipes).post(createRecipe);
router.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

export default router;
