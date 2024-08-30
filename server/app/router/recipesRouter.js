const express = require("express");

const router = express.Router();

const recipesActions = require("../controllers/recipeActions");

router.get("/", recipesActions.browse); // Récupérer toutes les recettes

router.get("/:id", recipesActions.read); // Récupérer une recette par ID

router.post("/", recipesActions.add); // Créer une nouvelle recette

module.exports = router;
