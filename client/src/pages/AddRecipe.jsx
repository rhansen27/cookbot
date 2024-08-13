import AddImage from "../components/AddImage";
import AddIngredient from "../components/AddIngredient";
import Filter from "../components/Filter";

const AddRecipe = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Add Recipe</h1>
          <Filter />
          <AddImage/>
          <AddIngredient/>
        </div>
      </div>
    </main>
  );
};

export default AddRecipe;
