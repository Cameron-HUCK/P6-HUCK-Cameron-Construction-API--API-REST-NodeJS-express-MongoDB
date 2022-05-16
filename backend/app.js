const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const thing = require('./models/thing');

// Enregistrement de notre routeur dans l'application
const userRoutes = require('./router/user');

const app = express();

app.get(express.json());

// Mongoose
mongoose.connect('mongodb+srv://Cameron:Sososo91@cluster0.5fhem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/////////////////////////////////////////////////////////////////////////////

app.post('/api', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});


/////////////////////////////////////////////////////////////////////////////

app.get('/api/auth/', (req, res, next) => {
  const stuff = [
    {
      email: '',
      password: '',
    }
  ];
  res.status(200).json(stuff);
});

/////////////////////////////////////////////////////////////////////////////

app.use('/api/auth/', userRoutes);

module.exports = app;