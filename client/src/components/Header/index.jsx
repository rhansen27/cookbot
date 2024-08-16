import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="header-title">Cook Bot</h1>
        </Link>
      </div>
      <nav className="nav-links">
        {Auth.loggedIn() ? (
          <>
            <Link to="/me" className="nav-button">View My Profile</Link>
            <Link to="/AddRecipe" className="nav-button">Add Recipe</Link>
            <Link to="/FindIngredients" className="nav-button">AI Recipe with Ingredients</Link>
            <Link to="/NewRecipe" className="nav-button">Find New Recipe</Link>
            <button className="nav-button logout-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
