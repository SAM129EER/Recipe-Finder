import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [120, "Recipe title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [600, "Description cannot exceed 600 characters"],
      default: "",
    },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one ingredient is required",
      },
    },
    steps: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one cooking step is required",
      },
    },
    prepTimeMinutes: {
      type: Number,
      min: [0, "Prep time cannot be negative"],
      default: 0,
    },
    cookTimeMinutes: {
      type: Number,
      min: [0, "Cook time cannot be negative"],
      default: 0,
    },
    servings: {
      type: Number,
      min: [1, "Servings must be at least 1"],
      default: 1,
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

recipeSchema.index({ owner: 1, updatedAt: -1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
