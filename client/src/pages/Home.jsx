import RecipeCarousel from "../components/RecipeCarousel";

const Home = () => {
  return (
    <main>
      <div className="new-recipe-container">
        <div className="content-box">
          <h1 className="page-title">Delicious Recipes</h1>
        </div>
      </div>
      <RecipeCarousel />
    </main>
  );
};

export default Home;
