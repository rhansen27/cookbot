const db = require("../config/connection");
const { User, Ingredient, Recipe } = require("../models");
const cleanDB = require("./cleanDB");
const userSeeds = require("./userSeeds.json");
const ingredientSeeds = require("./ingredientSeeds.json");
const recipeSeeds = require("./recipeSeeds.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Ingredient", "ingredients");
    await cleanDB("Recipe", "recipes");
    const users = await User.create(userSeeds);
    const ingredients = await Ingredient.create(ingredientSeeds);
    const recipes = await Recipe.create(recipeSeeds);
    for (const recipe of recipes) {
      const randIngredientIndex = Math.floor(
        Math.random() * ingredients.length
      );
      const randIngredient = ingredients[randIngredientIndex];
      const randUserIndex = Math.floor(Math.random() * users.length);
      const randUser = users[randUserIndex];
      await Recipe.findByIdAndUpdate(recipe._id, {
        createdBy: randUser._id,
        $push: {
          ingredients: { ingredientId: randIngredient._id, quantity: "1tbsp" },
        },
      });
    }

    await console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
