import fruitDeMer from "../../assets/images/fruit_de_mer.png";
import gateauChocolat from "../../assets/images/gateau_chocolat.png";

export default function Buffet() {
  return (
    <div className="buffet">
      <img src={fruitDeMer} alt="Fruit de mer" />
      <section className="description">
        <h2>Le buffet</h2>
        <p>
          Composez votre planning de recettes grace à notre buffet spécialement
          conçu pour vous proposer différents plats équilibrés en fonctions de
          vos critères
        </p>
        <button type="button">Cliquez ici</button>
      </section>
      <img src={gateauChocolat} alt="Gateau aux chocolats et fruits rouges" />
    </div>
  );
}
