const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Pour accéder au path de notre serveur :
const path = require('path');

// Enregistrement de notre routeur User dans l'application
const userRoutes = require('./router/user');
//Route pour les sauces
const sauceRoutes = require('./router/sauce');

const app = express();

app.use(express.json());

//Error CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Mongoose
mongoose.connect('mongodb+srv://Cameron:Sososo91@cluster0.5fhem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/////////////////////////////////////////////////////////////////////////////

// Route sauce
app.post('/api/sauces', (req, res, next) => {
  const sauce = [
    {
      sauce : '',
      imageUrl : '',
    }
  ];
  res.status(200).json(sauce);
});

/////////////////////////////////////////////////////////////////////////////

// Modele email et password
app.get('/api/auth', (req, res, next) => {
  const stuff = [
    {
      email: '',
      password: '',
    }
  ];
  res.status(200).json(stuff);
});

app.use(bodyParser.json());
/////////////////////////////////////////////////////////////////////////////

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth/', userRoutes);

module.exports = app;