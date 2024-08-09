const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  ],
  allergies: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
});

const Ingredient = new model("Ingredient", ingredientSchema);

module.exports = Ingredient;
