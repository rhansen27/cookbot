import Filter from "../components/Filter";

const NewRecipe = () => {
  return (
    <main className="new-recipe-container">
      <div className="content-wrapper">
        <div className="content-box">
          <h1 className="page-title">Find New Recipe</h1>
          <Filter />
        </div>
      </div>
    </main>
  );
};

export default NewRecipe;
