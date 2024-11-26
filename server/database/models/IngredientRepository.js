const AbstractRepository = require("./AbstractRepository");

class IngredientRepository extends AbstractRepository {
  constructor() {
    super({ table: "ingredient" });
  }

  // Méthode pour ajouter un ingrédient
  async create(ingredient) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (id, name) VALUES (?, ?)`,
      [ingredient.id, ingredient.name]
    );
    return result.insertId;
  }

  // Méthode pour lire un ingrédient par son ID
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // Méthode pour récupérer tous les ingrédients
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // Méthode pour mettre à jour un ingrédient
  async update(ingredient) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [ingredient.name, ingredient.id]
    );
    return result.affectedRows;
  }

  // Méthode pour supprimer un ingrédient
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  // Nouvelle méthode : ajouter un ingrédient à une recette dans la table recipe_ingredient
  async addIngredientToRecipe({
    recipeId,
    ingredientId,
    quantity = null,
    unit = null,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)`,
      [recipeId, ingredientId, quantity, unit]
    );
    return result.insertId;
  }

  // Nouvelle méthode : récupérer les ingrédients d'une recette
  async getIngredientsByRecipeId(recipeId) {
    const [rows] = await this.database.query(
      `SELECT i.*, ri.quantity, ri.unit 
       FROM recipe_ingredient ri 
       INNER JOIN ${this.table} i ON ri.ingredient_id = i.id 
       WHERE ri.recipe_id = ?`,
      [recipeId]
    );
    return rows;
  }
}

module.exports = IngredientRepository;
