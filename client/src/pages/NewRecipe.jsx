import LikeButton from "../components/Likebutton";
import DislikeButton from "../components/DislikeButton";
import Filter from "../components/Filter";

const NewRecipe = () => {
  return (
    <main>
      <Filter />
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Find New Recipe</h1>
          <LikeButton />
          <DislikeButton />
        </div>
      </div>
    </main>
  );
};

export default NewRecipe;
