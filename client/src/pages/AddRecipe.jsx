import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_USER } from '../utils/queries'
import AddIngredient from "../components/AddIngredient";
import AddIngredientForm from "../components/AddIngredientForm"
import ProtectedRoute from "../components/ProtectedRoute";

const AddRecipe = () => {
  const { profielId } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    varialbes: { profielId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>
  }

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
