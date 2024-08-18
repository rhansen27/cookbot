const db = require("../config/connection");
const { User, Ingredient, Recipe } = require("../models");
const cleanDB = require("./cleanDB");
const userSeeds = require("./userSeeds.json");
const ingredientSeeds = require("./ingredientSeeds.json");
const recipeSeeds = require("./recipeSeeds.json");

db.once("open", async () => {
  try {
    // Clean database collections
    await cleanDB("User", "users");
    await cleanDB("Ingredient", "ingredients");
    await cleanDB("Recipe", "recipes");

    // Seed database with initial data
    const users = await User.create(userSeeds);
    const ingredients = await Ingredient.create(ingredientSeeds);
    const recipes = await Recipe.create(recipeSeeds);

    // Update recipes
    for (const recipe of recipes) {
      const randUserIndex = Math.floor(Math.random() * users.length);
      const randUser = users[randUserIndex];

      // Add random ingredients
      const selectedIngredients = ingredients
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((ingredient) => ({
          ingredientId: ingredient._id,
          quantity: `${Math.floor(Math.random() * 5) + 1} tbsp`,
        }));

      // Split users for addition to likes and dislikes arrays
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      const halfLength = Math.floor(shuffledUsers.length / 2);
      const randomUsersForLikes = shuffledUsers.slice(0, halfLength);
      const randomUsersForDislikes = shuffledUsers.slice(halfLength);

      // Update recipes
      await Recipe.findByIdAndUpdate(recipe._id, {
        createdBy: randUser._id,
        ingredients: selectedIngredients,
        likes: randomUsersForLikes.map((user) => user._id),
        dislikes: randomUsersForDislikes.map((user) => user._id),
      });
    }

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
