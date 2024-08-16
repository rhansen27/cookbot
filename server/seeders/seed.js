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
      const randUserIndex = Math.floor(Math.random() * users.length);
      const randUser = users[randUserIndex];

      const selectedIngredients = ingredients
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((ingredient) => ({
          ingredientId: ingredient._id,
          quantity: `${Math.floor(Math.random() * 5) + 1} tbsp`,
        }));

      await Recipe.findByIdAndUpdate(recipe._id, {
        createdBy: randUser._id,
        ingredients: selectedIngredients,
      });
    }

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
