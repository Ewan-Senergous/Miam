import { useState } from "react";
import saladeCésar from "../../assets/images/salade_césar.svg";
import pommeDeTerreFarcies from "../../assets/images/pomme_de_terre_farcies.svg";
import risotto from "../../assets/images/risotto.svg";
import omelette from "../../assets/images/omelette_garnies.svg";
import dahl from "../../assets/images/dahl_de_lentille_curry.svg";
import spaghettisBolognaise from "../../assets/images/spaghettis_bolognaise.svg";
import loupe from "../../assets/images/loupe.png";
import "../../styles/home/reception.css";
import searchRecipes from "../../services/requestSearchbar";

export default function Reception() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    console.info(searchTerm);
    if (searchTerm) {
      try {
        const response = await searchRecipes(searchTerm);
        console.info(response);
        setResults(response);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  };

  return (
    <div className="reception">
      <section className="left">
        <h1>Cuisinez des souvenirs, savourez des instants.</h1>
        <div className="search_box">
          <img src={loupe} alt="loupe" />
          <input
            type="text"
            placeholder="Votre recettes..."
            value={searchTerm}
            onChange={handleChangeSearch}
          />
          <button type="button" onClick={handleSearchClick}>
            Rechercher
          </button>
        </div>

        {results.length > 0 && (
          <div className="search_results">
            <h2>Résultats de la recherche :</h2>
            <ul>
              {results.map((recipe) => (
                <li key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <span>{recipe.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <article className="welcome">
          Bienvenue sur Miam ! Votre destination ultime pour découvrir et
          partager des recettes gourmandes et variées ! Que vous soyez un
          cuisinier débutant ou un chef expérimenté, notre site est conçu pour
          vous inspirer et vous guider à travers une multitude de recettes
          délicieuses, faciles à suivre et adaptées à tous les goûts.
        </article>
      </section>
      <section className="right">
        <img src={saladeCésar} alt="Salade Céasar" />
        <img src={pommeDeTerreFarcies} alt="Pomme de terre farcies" />
        <img src={risotto} alt="Colin et son Risotto" />
        <img src={omelette} alt="Omelette garnies" />
        <img src={dahl} alt="Dahl de lentilles au curry" />
        <img src={spaghettisBolognaise} alt="Spaghettis bolognaise" />
      </section>
    </div>
  );
}
