const express=require('express');
const app = express();
const {sequelize} = require('sequelize');



const sequelize = new Sequelize(
    'hit_mentoring_db',
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















// function addDetails(){
//     let name=document.getElementById("nameInput").value;
//     let email=document.getElementById("emailInput").value;
//     let mentorId=document.getElementById("idInput").value;
//     let phNum=document.getElementById("numberInput").value;


//     let table=document.getElementById("outputTable");
//     let newRow=table.insert

// }