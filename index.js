const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();
//const bodyParser = require('bodyParser');
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD


=======
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

>>>>>>> 259d44bc75499cf3994ab1d37c81137627ae5153
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
