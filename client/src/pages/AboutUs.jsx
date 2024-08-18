import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <main className="about-us-container">
      <div className="about-us-content">
        <h1 className="about-us-title">About Us</h1>
        <p className="about-us-text">
          This React project, developed by four full-stack web development
          students, offers you a variety of beautiful and delicious recipes. We
          incorporate artificial intelligence to enhance your experience. Simply
          input the ingredients you have at home, and our AI will suggest a
          customized recipe based on what you have.
        </p>
        <p className="about-us-text">
          You can explore countless recipes on our site, filter options for
          allergies or specific diets, and even adjust the cuisine or meal type
          to find what suits you best. If you’re looking for inspiration, you
          can search for recipes using just one key ingredient.
        </p>
        <p className="about-us-text">
          We also have a community page where you can share your own recipes.
          Once saved, your recipes can be shared with everyone. People can like
          your creations with a single click and add them to their profiles.
        </p>
        <p className="about-us-text">
          As four dedicated students, our goal is to help you discover all the
          delicious recipes that will make your home even more delightful.
        </p>
        <h2 style={{textAlign: 'center'}}>Github Links to Contributors</h2>
        <div className="link-buttons">
          <Link to="https://github.com/rhansen27/cookbot" className="link-btn" target="_blank">CookBot Repo</Link>
          <Link to="https://github.com/tburzynski2" className="link-btn" target="_blank">
            Tom Burzynski
          </Link>
          <Link to="https://github.com/veyselarslan12" className="link-btn" target="_blank">
            Veysel Arslan
          </Link>
          <Link to="https://github.com/rhansen27" className="link-btn" target="_blank">
            Ryan Hansen
          </Link>
          <Link to="https://github.com/parros" className="link-btn" target="_blank">
            Parker T. Rosemeyer
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;

