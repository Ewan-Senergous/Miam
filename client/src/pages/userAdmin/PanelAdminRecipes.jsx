import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../styles/panelAdmin/AdminRecipes.css";

export default function AdminRecipe() {
  const loadedRecipes = useLoaderData(); // Charger toutes les recettes initialement
  const [recipes, setRecipes] = useState(loadedRecipes);
  const [editingRecipe, setEditingRecipe] = useState(null); // État pour suivre la recette à modifier

  // Supprimer une recette
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`, {
        withCredentials: true,
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
    }
  };

  // Enregistrer les modifications
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/recipes/${editingRecipe.id}`,
        editingRecipe,
        { withCredentials: true }
      );
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === editingRecipe.id ? editingRecipe : recipe
        )
      );
      setEditingRecipe(null); // Quitter le mode édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la recette :", error);
    }
  };

  // Gestion des changements dans le formulaire de modification
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="recipe-AdminList">
      <h1 className="recipe-AdminTitle">Recettes</h1>
      <div className="recipe-AdminCards">
        {recipes.map((recipe) =>
          editingRecipe && editingRecipe.id === recipe.id ? (
            <form
              key={recipe.id}
              className="recipe-AdminCard"
              onSubmit={handleSaveEdit}
            >
              <input
                type="text"
                name="title"
                value={editingRecipe.title}
                onChange={handleEditChange}
                className="recipe-edit-input"
                placeholder="Titre"
              />
              <textarea
                name="description"
                value={editingRecipe.description}
                onChange={handleEditChange}
                className="recipe-edit-textarea"
                placeholder="Description"
              />
              <input
                type="text"
                name="category"
                value={editingRecipe.category}
                onChange={handleEditChange}
                className="recipe-edit-input"
                placeholder="Catégorie"
              />
              <input
                type="text"
                name="difficulty"
                value={editingRecipe.difficulty}
                onChange={handleEditChange}
                className="recipe-edit-input"
                placeholder="Difficulté"
              />
              <div className="edit-buttons">
                <button type="submit" className="save-button">
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setEditingRecipe(null)}
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="recipe-AdminCard" key={recipe.id}>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="recipe-AdminImage"
              />
              <div className="recipe-details">
                <p>{recipe.title}</p>
                <div className="admin-actions">
                  <button
                    onClick={() => setEditingRecipe(recipe)}
                    className="edit-button"
                    type="button"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="delete-button"
                    type="button"
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
