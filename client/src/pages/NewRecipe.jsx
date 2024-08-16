import Filter from "../components/Filter";
import ProtectedRoute from "../components/ProtectedRoute";

const NewRecipe = () => {
  return (
    <ProtectedRoute>
      <main className="new-recipe-container">
        <div className="content-wrapper">
          <div className="content-box">
            <h1 className="page-title">Find New Recipe</h1>
            <Filter />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default NewRecipe;
