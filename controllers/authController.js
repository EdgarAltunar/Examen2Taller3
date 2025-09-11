const userModel = require('../models/userModel');
const path = require('path');

exports.login = (req, res) => {
    const { username, password } = req.body;
    userModel.findUser(username, password, (results) => {
        if (results.length > 0) {
            req.session.user = username;
            res.redirect('/dashboard');
        } else {
            res.send('Usuario o contraseña incorrectos');
        }
    });
};


exports.dashboard = (req, res) => {
  if (req.session.user) {
    const filePath = path.join(__dirname, '../views/dashboard.html');
    res.sendFile(filePath, { root: '/' });
  } else {
    res.redirect('/');
  }
};