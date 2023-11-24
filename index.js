const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();

app.set('view engine', 'ejs');

// Database Connection//
const sequelize = new Sequelize('hit_mentoring_DB', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

//server code

const user = {
  firstName: 'Tim',
  lastName: 'Cook',
};

app.get('/', (req, res) => {
  res.render('pages/index', { user: user });
});

app.listen(2000);
