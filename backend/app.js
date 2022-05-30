const express = require('express');
const mongoose = require('mongoose');
const  mongoSanitize  =  require('express-mongo-sanitize');
const dotenv = require("dotenv")
const security = require('./environnement/env');

// To access the path of our server:
const path = require('path');

const app = express();

require('dotenv').config();

app.use(express.json());

//Error CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* All road ! */

// Road image !
app.use('/images', express.static(path.join(__dirname, 'images')));

//Route for sauces
const saucesRoutes = require('./routes/sauce');
app.use('/api/sauces', saucesRoutes);


// Save our User route in the application
const userRoutes = require('./routes/user');
app.use('/api/auth/', userRoutes);


module.exports = app;