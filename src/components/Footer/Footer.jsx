import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__name">Developed by Ziah Cunningham</p>
        <p className="footer__date">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
