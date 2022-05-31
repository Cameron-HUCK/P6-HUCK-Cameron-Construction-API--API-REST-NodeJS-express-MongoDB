// express
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.use('/images', express.static(path.join(__dirname, 'images'))); // Images route !
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// express-mongo-sanitize
const mongoSanitize = require('express-mongo-sanitize');
app.use(
	mongoSanitize({
		replaceWith: '_',
		allowDots: true,
	}),
);

// express-rate-limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

// helmet
const helmet = require('helmet');
app.use(helmet());

// CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// mongoose
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)
.then(() => console.log('MongoDB connection succeed !'))
.catch(() => console.log('MongoDB connection failed !'));

// Route for sauces
const saucesRoutes = require('./routes/sauce');
app.use('/api/sauces', saucesRoutes);

// Route for users
const userRoutes = require('./routes/user');
app.use('/api/auth/', userRoutes);

module.exports = app;



