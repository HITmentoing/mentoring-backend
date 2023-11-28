const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();
const { adminData, mentorData, studentData, updateId } = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// design file
app.use(express.static('public'));
app.set('view engine', 'ejs');

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

// routers
app.get('/', (req, res) => {
  res.render('login');
});

//login routes
app.post('/login', (req, res) => {
  if (req.body.empId) {
    const { empId, name, password } = req.body;
    const mentorProfile = mentorData.find((mentor) => {
      return (
        mentor.empId == empId &&
        mentor.name == name &&
        mentor.password == password
      );
    });
    if (mentorProfile) {
      res.redirect('/mentor');
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  } else if (req.body.studentId) {
    const { studentId, name, password } = req.body;

    const studenProfile = studentData.find((student) => {
      return (
        student.studentId == studentId &&
        student.name == name &&
        student.password == password
      );
    });
    if (studenProfile) {
      res.send(`Welcome, ${stu.name}!`);
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  } else if (req.body.adminEmail) {
    const { adminEmail, password } = req.body;
    const adminProfile = adminData.find((admin) => {
      return admin.email == adminEmail && admin.password == password;
    });
    if (adminProfile) {
      res.redirect('/admin');
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  }
});

//admin routes
app.get('/admin', (req, res) => {
  res.render('admin', { mentorData });
});
app.post('/admin', (req, res) => {
  mentorData.push({
    mentorId: updateId(mentorData),
    empId: req.body.mentorId,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.phNo,
    password: req.body.password,
  });
  res.redirect('admin');
});
app.get('/addMentor', (req, res) => {
  res.render('addMentor');
});
app.post('/updateMentorForm', (req, res) => {
  const id = parseInt(req.body.id);
  const mentor = mentorData.find((data) => data.uuid === id);
  res.render('updateMentor', { mentor });
});
//mentor update
app.post('/updateMentor', (req, res) => {
  const empId = req.body.empId;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const _id = req.body.id;

  let index = mentorData.findIndex((data) => data.uuid === parseInt(_id));
  mentorData[index].empId = empId;
  mentorData[index].name = name;
  mentorData[index].email = email;
  mentorData[index].mobile = mobile;
  res.redirect('/admin');
});
//mentor delete
// delete student from mentor
app.post('/deleteMentor', (req, res) => {
  const id = parseInt(req.body.id);
  const index = mentorData.findIndex((data) => data.uuid === parseInt(id));
  if (index !== -1) {
    mentorData.splice(index, 1);
    console.log(`Element with id ${id} deleted successfully.`);
  } else {
    console.log(`Element with id ${id} not found.`);
  }
  res.redirect('/admin');
});

//mentor routes
// get all mentors
app.get('/mentor', (req, res) => {
  res.render('mentor', { studentData });
});
// get student form
app.post('/process-add-student', (req, res) => {
  res.render('addStudentFrom');
});
// add new student to mentor
app.post('/mentor', (req, res) => {
  studentData.push({
    uuid: updateId(studentData),
    stuId: req.body.studentId,
    name: req.body.name,
    roll: req.body.rollNumber,
    password: req.body.password,
  });
  res.redirect('mentor');
});

// delete student from mentor
app.post('/deleteStudent', (req, res) => {
  const { id } = req.body;
  const index = studentData.findIndex((data) => data.uuid === parseInt(id));
  if (index !== -1) {
    studentData.splice(index, 1);
    console.log(`Element with id ${id} deleted successfully.`);
  } else {
    console.log(`Element with id ${id} not found.`);
  }
  res.redirect('/mentor');
});

//  get update student form
app.post('/updateStudentForm', (req, res) => {
  const id = parseInt(req.body.id);
  let student = studentData.find((data) => data.uuid === id);
  res.render('updateStudentFrom', { student });
});

// update student
app.post('/updateStudent', (req, res) => {
  const studentId = req.body.studentId;
  const name = req.body.name;
  const rollNumber = req.body.rollNumber;
  const _id = req.body.id;

  let index = studentData.findIndex((data) => data.uuid === parseInt(_id));
  studentData[index].stuId = studentId;
  studentData[index].name = name;
  studentData[index].roll = rollNumber;
  res.redirect('/mentor');
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
