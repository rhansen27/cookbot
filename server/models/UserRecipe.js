const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      new Schema({
        ingredient: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
      }),
    ],
  },
  description: {
        type: String,
        required: true,
    },
  filter: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
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

const UserRecipe = new model("UserRecipe", recipeSchema);

module.exports = UserRecipe;
