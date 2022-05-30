// Environnement security
const express = require("express");
const mongoose = require('mongoose');
const  bodyParser  =  require( 'body-parser' );
const  mongoSanitize  =  require( 'express-mongo-sanitize' );
const  rateLimit  =  require( 'express-rate-limit' );
const helmet = require("helmet");

const app = express();

// Secret Key doenv
S3_BUCKET="Cameron"
SECRET_KEY="Sososo91"

// Configuring 'express-mongo-sanitize'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

// To remove data using these defaults:
app.use(mongoSanitize());

// Or, to replace these prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

// Or, to sanitize data that only contains $, without .(dot)
app.use(
  mongoSanitize({
    allowDots: true,
  }),
);

// Mongoose
mongoose.connect('mongodb+srv://Cameron:Sososo91@cluster0.5fhem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*Setting up express-rate-limit */
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Helmet
app.use(helmet());
