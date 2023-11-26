const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
//const bodyParser = require('bodyParser');
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mentorData = [
  {
      name:"Arpita Mam",
      email:"arpita@gmail.com",
      id:"123",
      phNo:12345

},
{
  name:"Mrinmoy Sir",
  email:"Mrinmoy@gmail.com",
  id:"125",
  phNo:67545

},
{
  name:"Sanchita Mam",
  email:"Sanchita@gmail.com",
  id:"130",
  phNo:876524

},
{
  name:"Jayata Mam",
  email:"Jayata@gmail.com",
  id:"131",
  phNo:82677

}
];

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
app.get('/admin', (req, res) => {
  res.render('admin',{mentorData});
});
app.get('/addMentor', (req, res) => {
  res.render('addMentor');
});

app.post('/admin', (req, res) => {
  mentorData.push({
   id: req.body.mentorId,
   name: req.body.name,
   email: req.body.email,
   phNo: req.body.phNo
 })
//  console.log(mentorData);
res.redirect('admin');

 
}); 

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
