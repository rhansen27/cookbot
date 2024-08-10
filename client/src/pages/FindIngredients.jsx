import IngredientBot from "../components/IngredientBot";


const FindIngredient = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h2>Find Recipe with Ingredients</h2>
          <IngredientBot />
        </div>
      </div>
    </main>
  );
};

export default FindIngredient;
