const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Your Project Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
