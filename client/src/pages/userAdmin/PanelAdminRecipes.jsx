import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/panelAdmin/AdminRecipes.css";

export default function AdminRecipe() {
  const loadedRecipes = useLoaderData();
  const [recipes, setRecipes] = useState(loadedRecipes);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleEditClick = (recipe) => {
    setEditingRecipeId(recipe.id);
    setUpdatedTitle(recipe.title);
  };

  const handleCancelEdit = () => {
    setEditingRecipeId(null);
    setUpdatedTitle("");
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/recipes/${id}/title`,
        { title: updatedTitle },
        { withCredentials: true }
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, title: updatedTitle } : recipe
        )
      );

      setEditingRecipeId(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du titre :", error);
    }
  };

  const handleDelete = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.error("Erreur lors de la requête DELETE :", error);
      });
  };

  return (
    <div className="recipe-AdminList">
      <h1 className="recipe-AdminTitle">Recettes</h1>
      <div className="recipe-AdminCards">
        {recipes.map((recipe) => (
          <div className="recipe-AdminCard" key={recipe.id}>
            {/* Link around image */}
            <Link to={`/recipes-instruction/${recipe.id}`}>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="recipe-AdminImage"
              />
            </Link>
            <div className="recipe-details">
              {editingRecipeId === recipe.id ? (
                <div>
                  <input
                    type="text"
                    className="recipe-input"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Modifier le titre"
                  />
                  <div className="recipe-buttons">
                    <button
                      type="button"
                      className="save-button"
                      onClick={() => handleSave(recipe.id)}
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Link around title */}
                  <Link to={`/recipes-instruction/${recipe.id}`}>
                    <p className="recipe-title">{recipe.title}</p>
                  </Link>
                  <div className="actions-buttons">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleEditClick(recipe)}
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
