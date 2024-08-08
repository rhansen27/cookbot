const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  // TODO
  // title: String, required
  // ingredients: Array of ObjectId references to Ingredient
  // instructions: String, required
  // cuisineType: Array of strings
  // dietType: Array of strings
  // createdBy: ObjectId reference to User
  // createdAt: Date, default: current date
  // updatedAt: Date, default: current date
  // imageURL: String
  // aiGenerated: Boolean, default: true
  // likes: Array of ObjectId references to User
  // dislikes: Array of ObjectId references to User
});

const Recipe = new model(recipeSchema);

module.exports = Recipe;
