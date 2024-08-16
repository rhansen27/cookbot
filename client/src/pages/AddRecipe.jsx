import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import AddIngredient from "../components/AddIngredient";
import { QUERY_SINGLE_USER } from '../utils/queries'

const AddRecipe = () => {
  const {profielId} = useParams()

  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {varialbes:
      {profielId}
  })

  const profile = data?.profile || {}

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Add Recipe</h1>
          <AddIngredient/>
        </div>
      </div>
    </main>
  );
};

export default AddRecipe;
