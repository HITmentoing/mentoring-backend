const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
var i =0;

 function updateId() {
  return ++i;
 }
const dataArray = [
  {
    id : updateId(),
    name: "Rajdeep Chowdhury",
    studentId: "001-20-3500",
    rollNo: 12568525
  },
  {
    id: updateId(),
    name: "Rajpratim Patra",
    studentId: "001-20-3500",
    rollNo: 12568525
  },
  {
    id: updateId(),
    name: "Jayanta Barik",
    studentId: "001-20-3500",
    rollNo: 12568525
  }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Database Connection*/
// const sequelize = new Sequelize(
//   'hit_mentoring_DB',
//   'root',
//   process.env.DB_PASSWORD,
//   {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   }
// );
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//   });

// design file
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routers
app.get('/', (req, res) => {
  res.render('login');
});
app.get("/mentor",(req,res)=>{
  res.render('mentor',{dataArray});
})
app.post("/process-add-student",(req,res)=>{
  res.render('addStudentFrom');
})
app.post('/mentor', (req, res) => {
   dataArray.push({
    id:updateId(),
    name: req.body.name,
    studentId: req.body.studentId,
    rollNo: req.body.rollNumber
  })
  console.log(dataArray);
 res.render('mentor', { dataArray});
  
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});

/*  
*/
