const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Database Connection*/
const sequelize = new Sequelize(
  'hit_mentoring_DB',
  'root',
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

// design file
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routers
app.get('/', (req, res) => {
  res.render('index');
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
