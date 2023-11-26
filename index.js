const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


let i =0;

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

// get all mentors
app.get("/mentor",(req,res)=>{
  res.render('mentor',{dataArray});
})
// get student form 
app.post("/process-add-student",(req,res)=>{
  res.render('addStudentFrom');
})
// add new student to mentor 
app.post('/mentor', (req, res) => {
   dataArray.push({
    id:updateId(),
    name: req.body.name,
    studentId: req.body.studentId,
    rollNo: req.body.rollNumber
  })
res.redirect("mentor")
  
});

// delete student from mentor 
app.post('/deleteStudent', (req, res) => {
  const { id } = req.body;
  const index = dataArray.findIndex(data => data.id === parseInt(id));
  if (index !== -1) {
    dataArray.splice(index, 1);
    console.log(`Element with id ${id} deleted successfully.`);
  } else {
    console.log(`Element with id ${id} not found.`);
  }
  res.redirect("/mentor");
  
});

//  get update student form
app.post('/updateStudentForm', (req, res) => {
  const id = parseInt(req.body.id);
  let student=dataArray.find((data)=> data.id === id);
  //console.log(student);
  res.render("updateStudentFrom",{student})
  
});

// update student 
app.post('/updateStudent',(req,res)=>{
  const name = req.body.name;
  const studentId = req.body.studentId;
  const rollNumber = req.body.rollNumber;
  const id = req.body.id;
  
  let index= dataArray.findIndex((data)=>data.id===parseInt(id));
  dataArray[index].name=name;
  dataArray[index].studentId=studentId
  dataArray[index].rollNo= rollNumber

  res.redirect('/mentor')
})

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});

/*  
*/
