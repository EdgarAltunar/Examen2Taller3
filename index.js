const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authoController = require('./controllers/authController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static( 'public' ));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.post('/login', authoController.login);
app.get('/dashboard', authoController.dashboard);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'))