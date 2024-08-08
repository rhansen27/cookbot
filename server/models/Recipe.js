const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      new Schema({
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      }),
    ],
    default: [],
  },
  instructions: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    default: [],
  },
  cuisineType: [String],
  dietType: [String],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  imageURL: {
    type: String,
  },
  aiGenerated: {
    type: Boolean,
    default: true,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  dislikes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
});

const Recipe = new model("Recipe", recipeSchema);

module.exports = Recipe;
