const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredientId: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  cuisineType: [String],
  dietType: [String],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
  aiGenerated: {
    type: Boolean,
    default: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Recipe = new model(recipeSchema);

module.exports = Recipe;
