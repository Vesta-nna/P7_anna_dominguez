# Back-end

## Installation
Veuillez vous assurer que PostgreSQL est installé et lancé. Créez une base de données puis veuillez créer un fichier `.env` à la racine du dossier back en renseignant les informations demandées dans `.env.example`.


Vous pouvez ensuite installés tous les packages mentionnés dans le fichier `package.json` en lancant la commande: `npm install`.


Pour créer la base de données et y insérer des éléments de base dans notre projet, prisma a maintenant été installé.
Veuillez lancer les commandes suivantes:

`npx prisma migrate dev --name init`

`npx prisma db seed --preview-feature`

`npx prisma generate`


Si vous voulez voir votre base de données évoluer en direct sur une page internet:

`npx prisma studio`


## La base de données
Les tables suivantes ont maintenant été crées:

### User
Champ | Type
----- | ----
id | int
email | string
password | string
role | string

Les utilisateurs sont reliés à un profile et peuvent avoir plusieurs posts, leur email est unique

### Profile 
Champ | Type
----- | ----
id | int
firstName | string
lastName | string
bio | string
userId | int

Un profile est relié à un utilisateur

### Post 
Champ | Type
----- | ----
id | int
content | string
createdAt | DateTime
updatedAt | DateTime
authorId | Int

Un post est relié à un utilisateur


## Lancer le backend
Pour lancer le backend il faut lancer la commande: `nodemon index.js`
