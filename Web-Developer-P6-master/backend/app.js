const express = require('express');
const mongoose = require('mongoose');

// Enregistrement de notre routeur dans l'application
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});
// Mongoose
mongoose.connect('mongodb+srv://Cameron:Sososo91@cluster0.5fhem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;