import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav>
        <section>
          <Link to="/passer-en-cuisine">Passer en cuisine</Link>
          <Link to="/recettes">Recettes</Link>
        </section>
        <img src={Logo} alt="Miam" />
        <section>
          <Link to="/inscription">Inscription</Link>
          <button type="button">Connexion</button>
        </section>
      </nav>
      <hr />
    </>
  );
}
