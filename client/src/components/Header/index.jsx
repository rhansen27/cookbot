import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-info text-dark  display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <img src={logo} alt="logo" style={{borderRadius: 30}} />
          <h1 className="m-0" style={{ fontSize: '2rem' }}>
            Cook Bot 
          </h1>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-1" to="/me">
                View My Profile
              </Link>
              <Link className="btn btn-lg btn-primary m-1" to="/AddRecipe">
                Add Recipe
              </Link>
              <Link className="btn btn-lg btn-primary m-1" to="/FindIngredients">
                AI Recipe with Ingredients
              </Link>
              <Link className="btn btn-lg btn-primary m-1" to="/NewRecipe">
                Find New Recipe
              </Link>
              <button className="btn btn-lg btn-light m-1" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-1" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
