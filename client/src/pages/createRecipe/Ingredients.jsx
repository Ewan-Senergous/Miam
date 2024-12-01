import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/create/ingredients.css";

export default function Ingredients({
  selectedIngredients,
  updateIngredients,
}) {
  const { ingredients: allIngredients } = useLoaderData();
  console.info("Ingrédients chargés depuis le loader :", allIngredients);
  const [filteredIngredients, setFilteredIngredients] =
    useState(allIngredients);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = allIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.info("Ingrédients filtrés :", results);
    setFilteredIngredients(results);
  }, [searchTerm, allIngredients]);

  const handleIngredientToggle = (ingredient) => {
    const updatedIngredients = selectedIngredients.some(
      (i) => i.id === ingredient.id
    )
      ? selectedIngredients.filter((i) => i.id !== ingredient.id)
      : [
          ...selectedIngredients,
          { ...ingredient, quantity: "", unit: "" }, // Ajouter des champs pour quantité et unité
        ];
    console.info("Ingrédients sélectionnés après toggle :", updatedIngredients);
    updateIngredients(updatedIngredients);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedIngredients = selectedIngredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, quantity } : ingredient
    );
    updateIngredients(updatedIngredients);
  };

  const handleUnitChange = (id, unit) => {
    const updatedIngredients = selectedIngredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, unit } : ingredient
    );
    updateIngredients(updatedIngredients);
  };

  return (
    <div className="ingredients-section">
      <h2>Ingrédients</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un ingrédient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ingredient-search"
        />
      </div>
      <div className="ingredients-container">
        <div className="ingredients-list">
          {filteredIngredients.map((ingredient) => (
            <label key={ingredient.id} className="ingredient-item">
              <input
                type="checkbox"
                checked={selectedIngredients.some(
                  (i) => i.id === ingredient.id
                )}
                onChange={() => handleIngredientToggle(ingredient)}
              />
              <span className="ingredient-name">{ingredient.name}</span>
            </label>
          ))}
        </div>
      </div>
      {selectedIngredients.length > 0 ? (
        <div className="selected-ingredients">
          <h3>Ingrédients sélectionnés</h3>
          <ul>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient.id} className="selected-ingredient-item">
                <span>{ingredient.name}</span>
                <input
                  type="text"
                  placeholder="Quantité"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleQuantityChange(ingredient.id, e.target.value)
                  }
                  className="ingredient-quantity-input"
                />
                <input
                  type="text"
                  placeholder="Unité"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleUnitChange(ingredient.id, e.target.value)
                  }
                  className="ingredient-unit-input"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

Ingredients.propTypes = {
  selectedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string,
      unit: PropTypes.string,
    })
  ).isRequired,
  updateIngredients: PropTypes.func.isRequired,
};
