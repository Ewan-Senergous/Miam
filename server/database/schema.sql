CREATE TABLE Difficulty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE User (
   id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
   name VARCHAR(100) NOT NULL,
   password VARCHAR(255) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   role VARCHAR(20) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO User (username, name, password, email, role)
VALUES ('Ewan', 'Senergous', 'password', 'ewan@outlook.fr', 'admin')
,('Anais', 'Dufourneau', 'password', 'anais@outlook.fr', 'user');

CREATE TABLE Recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    difficulty_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    cooking_time VARCHAR(50),
    preparation_time VARCHAR(50),
    instruction TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (difficulty_id) REFERENCES Difficulty(id)
);

CREATE TABLE Image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE
);

CREATE TABLE Ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO Ingredient (name) VALUES 
('Ail'),
('Artichaut'),
('Asperge'),
('Aubergine'),
('Basilic'),
('Betterave'),
('Betterave chioggia'),
('Blette'),
('Brocoli'),
('Carotte'),
('Carotte violette'),
('Céleri'),
('Champignon de Paris'),
('Champignon portobello'),
('Champignon shiitake'),
('Chayotte'),
('Chicorée'),
('Chou chinois'),
('Chou de Bruxelles'),
('Chou-fleur'),
('Chou-rave'),
('Chou rouge'),
('Chou vert'),
('Ciboulette'),
('Coriandre'),
('Cresson'),
('Crosne'),
('Courge butternut'),
('Courge spaghetti'),
('Courgette'),
('Daikon'),
('Endive'),
('Épinard'),
('Fève'),
('Fenouil'),
('Haricot vert'),
('Kale'),
('Laitue'),
('Laurier'),
('Mâche'),
('Navet'),
('Oignon'),
('Pak-choï'),
('Patate douce'),
('Patisson'),
('Petit pois'),
('Pois chiche'),
('Pois mange-tout'),
('Poire de terre'),
('Poireau'),
('Poivron jaune'),
('Poivron rouge'),
('Poivron vert'),
('Potiron'),
('Radicchio'),
('Radis'),
('Radis noir'),
('Romaine'),
('Roquette'),
('Rutabaga'),
('Salsifis'),
('Salicorne'),
('Scarole'),
('Thym'),
('Topinambour'),
('Tomate'),
('Abricot'),
('Ananas'),
('Avocat'),
('Banane'),
('Cerise'),
('Citron'),
('Clémentine'),
('Coco'),
('Datte'),
('Figue'),
('Fraise'),
('Framboise'),
('Fruit de la passion'),
('Grenade'),
('Groseille'),
('Kiwi'),
('Kumquat'),
('Litchi'),
('Mandarine'),
('Mangue'),
('Melon'),
('Mirabelle'),
('Mûre'),
('Myrtille'),
('Nectarine'),
('Noisette'),
('Noix'),
('Orange'),
('Pamplemousse'),
('Papaye'),
('Pastèque'),
('Pêche'),
('Poire'),
('Pomme'),
('Prune'),
('Quetsche'),
('Raisin'),
('Raisin sec'),
('Rhubarbe'),
('Yuzu');

CREATE TABLE Recipe_Ingredient (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10,2),
    unit VARCHAR(20),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id) ON DELETE CASCADE
);

CREATE TABLE Favorites (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE
);