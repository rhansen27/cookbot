import { useState } from 'react';
import { useMutation } from '@apollo/client'


const AddIngredientForm = () => {
  const [recipe, setRecipe] = useState('');

  const [addRecipe, { error }] = useMutation(ADD_RECIPE)

  const handleFormSubmit = async e => {
    e.preventDefault()

    await addRecipe({
      variables: { profileId, recipe }
    })

    setRecipe('')
  }

  return (
    <div>
      <h4>Endorse some more skills below.</h4>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <input
            placeholder="Endorse some skills..."
            value={recipe}
            className="form-input w-100"
            onChange={(event) => setRecipe(event.target.value)}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Endorse Skill
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default AddIngredientForm;
