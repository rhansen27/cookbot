import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import RecipeCarousel from "../components/RecipeCarousel/index";

import UserBio from "../components/Input/UserBio";
import SubmitButton from "../components/Input/SubmitButton";
import DeleteButton from "../components/Input/DeleteButton";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();
  console.log(userId);
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  console.log(user);

  // Use React Router's `<Redirect />` component to redirect to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }
  // TODO: add styles
  return (
    <div className="container">
      <h1 className="card-header">{user.name}</h1>
      <DeleteButton />


      <div className="card-body">
        <h5 className="card-title">About Me:</h5>
        <UserBio bio={user.bio} />
        {/* <SubmitButton /> */}
      </div>
      <RecipeCarousel userId={user._id} />
    </div>
  );
};

export default Profile;
