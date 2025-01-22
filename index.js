// Import the modules we need
require('dotenv').config(); 
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')


// Create the express application object
const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: true }))

const cartRoutes = require('./routes/cart'); // Import the cart routes

// Set up css
app.use(express.static(__dirname + '/public'));

const session = require('express-session');
app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
}));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

app.get('/', (req, res) => {
    res.render('index', { user: req.session.user }); // Render homepage with user session.
  });

// cart routes.
app.use('/cart', cartRoutes);
// Authentication routes.
app.use('/authentication', require('./routes/authentication')); 
// Render register page.
app.get('/register', (req, res) => res.render('register')); 
// Render login page.
app.get('/login', (req, res) => res.render('login')); 
// Render add food page.
app.use('/price-list', (req, res) => res.render('price-list')); 
// Render AI service form page
app.get('/AI-recommendation', (req, res) => {
    res.render('AI-recommendation');
  });

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))