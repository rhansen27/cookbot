const { Schema, model, default: mongoose } = require("mongoose");
const User = require("./User");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
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

const Ingredient = new model(ingredientSchema);

module.exports = Ingredient;
