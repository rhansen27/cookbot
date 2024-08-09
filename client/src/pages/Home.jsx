import LikeButton from "../components/Likebutton";
import DislikeButton from "../components/DislikeButton";
import IngredientBot from "../components/IngredientBot";


const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Home</h1>
          <LikeButton />
          <DislikeButton />
          <IngredientBot />
        </div>
      </div>
    </main>
  );
};

export default Home;
