import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AddIngredient from "../components/AddIngredient";
import { QUERY_SINGLE_USER } from "../utils/queries";
import ProtectedRoute from "../components/ProtectedRoute";

const AddRecipe = () => {
  const { profielId } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    varialbes: { profielId },
  });

  const profile = data?.profile || {};

  return (
    <ProtectedRoute>
      <main className="new-recipe-container">
        <div className="content-wrapper">
          <div className="content-box">
            <h1 className="page-title">Add Recipe</h1>
            <AddIngredient />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default AddRecipe;
