import IngredientBot from "../components/IngredientBot";
import ProtectedRoute from "../components/ProtectedRoute";

const FindIngredient = () => {
  return (
    <ProtectedRoute>
      <main>
        <h2 className="ai-title">AI Recipe with Ingredients</h2>
        <IngredientBot />
      </main>
    </ProtectedRoute>
  );
};

export default FindIngredient;
