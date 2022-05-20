# PIIQUANTE #

Piiquante est une application web de critique des sauces piquantes appelée « Hot Takes » . Sur ce site, le principe est de mettre en place des sauces piquante avec la critique de chaque utilisateur pour permettre des échanges et y mettre nos avis  sur le sujet des sauces piquantes.

# 1er étape = Construction du dossier backend et installation des Framework (express, mongoose, node.js) #
- Pour installer node.js, nous nous plaçons sur le dossier backend et nous effectuons la commande "npm install"
- Ensuite, nous créons un fichier ".gitignore" avec écris dedant =  node-modules/
- "npm install express" sur le dossier backend pour installer : "express.js"
- "npm install mongoose" sur le dossier backend pour installer "mongoose"

# 2eme étape = Création du serveur et du fichier app.js #
- Création du fichier server.js sur le dossier backend ou nous allons créer le serveur sur un port 3000
- Ensuite, nous nous dirigeons vers le site MongoDB" pour créer notre base de donnee
- Ensuite, Nous créons notre fichier app.js ou nous mettons un "mongoose.connect" avec votre login et votre mot de passe pour relier notre projet a notre base de donnee "MongoDB"
- Pour éviter l'erreur CORS, dans l'app.js il faut ajouter des headers à notre objet "response" !

# 3eme étape = Installation du dossier Front-end à partir d'un reposite GitHub, Mise en place des routes, un contrôleur, et un modèle utilisateur, pour pouvoir créer un compte ou se connecter au site. #

- Installation de notre front-end dans le dossier du projet.
- Création d'un dossier "models.js" ou serons implanter notre schéma de donnée dans le fichier "user.js". Ainsi qu'un "mogoose unique validator" pour être utiliser par seulement une seule personne. Faite "npm install mongoose-unique-validator" pour l'installer dans le dossier backend
- Mise en place d'une route Get dans notre fichier "app.js". Dans ce middleware, nous créons un groupe d'articles avec le schéma de données spécifique requis par le front-end, que nous récupérons depuis notre fichier "user" situer dans notre dossier "models".
- Création du dossier "route". Dans ce dossier, créer un fichier "user" où nous implantons nos routes qui concerne le "user" !
- Créations du dossier "controllers" pour le package de chiffrement "bcrypt" pour notre fonction signup et login. Pour installer "bcrypt", entrer la commande "npm install bcrypt"
- Et pour finir nous devons installer un Token d'authentification. Pour commencer il faut installer jsonwebtoken avec la commande "npm install jsonwebtoken" qui permet de créer et de vérifier un token. Et ensuite le creer dans notre fonction login !

# 4eme etapes = #

