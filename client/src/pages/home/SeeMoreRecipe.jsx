import PropTypes from "prop-types";

export default function SeeMoreRecipe({ littleRecipes }) {
  return (
    <div className="See_more">
      <h3>Voir aussi...</h3>
      {littleRecipes.map((littleRecipe) => (
        <article key={littleRecipe.id}>
          <h4>IDEE RECETTE</h4>
          <h5>{littleRecipe.name}</h5>
          <img src={littleRecipe.image} alt={littleRecipe.name} />
          <p>{littleRecipe.description}</p>
        </article>
      ))}
    </div>
  );
}

SeeMoreRecipe.propTypes = {
  littleRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
