const AbstractRepository = require("./AbstractRepository");

class RecipeStepRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe_step" });
  }

  // Créer une étape pour une recette donnée
  async create(recipeId, step) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, step_number, description) VALUES (?, ?, ?)`,
      [recipeId, step.number, step.description]
    );
    return result.insertId;
  }

  // Lire toutes les étapes
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // Lire une étape spécifique
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // Mettre à jour une étape spécifique
  async update(recipeId, step) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET description = ? WHERE recipe_id = ? AND step_number = ?`,
      [step.description, recipeId, step.number]
    );
    return result.affectedRows;
  }

  // Supprimer une étape spécifique
  async delete(recipeId, step) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE recipe_id = ? AND step_number = ?`,
      [recipeId, step.number]
    );
    return result.affectedRows;
  }

  // Supprimer toutes les étapes associées à une recette
  async deleteByRecipeId(recipeId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE recipe_id = ?`,
      [recipeId]
    );
    return result.affectedRows;
  }
}

module.exports = RecipeStepRepository;
