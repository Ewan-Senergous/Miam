import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/images/menu.svg";
import Close from "../../assets/images/close.svg";

export default function MenuNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen((oldState) => !oldState);
  };

  return (
    <div className="menu">
      <button type="button" onClick={handleMenu}>
        <img src={Menu} alt="Menu" />
      </button>
      {menuOpen ? (
        <section>
          <button type="button" onClick={handleMenu}>
            <img src={Close} alt="Close" />
          </button>
          <Link to="/recipes">Recettes</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/login">
            <button type="button">Connexion</button>
          </Link>
        </section>
      ) : null}
    </div>
  );
}
