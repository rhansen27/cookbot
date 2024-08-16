import LikeButton from "../components/Likebutton";
import DislikeButton from "../components/DislikeButton";
import IngredientBot from "../components/IngredientBot";

import RecipeCarousel from "../components/RecipeCarousel";

const Home = () => {
  return (
    <main>
      <div className="new-recipe-container">
        <div className="content-box">
          <h1 className="page-title">Home</h1>
        </div>
      </div>
      <RecipeCarousel />
    </main>
  );
};

export default Home;
