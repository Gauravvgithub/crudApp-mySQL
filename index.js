const express = require("express");
const app = express();
const path = require("path");
const DataBase = require("./models/connection");
const AllUsers = require("./AllUsers");
const { request } = require("http");

const PORT = 3000;

app.use(express.json()); // accepts json data

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("this is home page");
});

app.get("/showAllUsers", (request, response) => {
  response.json(AllUsers);
});

app.post("/addUser", (request, response) => {
  const user = {
    name: request.body.name,
    email: request.body.email,
    phone: request.body.mobile,
    city: request.body.city,
  };
  console.log(user);
  const sql = "INSERT INTO `employee` SET ?";
  DataBase.query(sql, user, (error, result) => {
    if (error) console.log(error.sqlMessage);
    else response.json(user);
  });
});

app.get("/getUser", (request, response) => {
  let sql = `SELECT * from employee`;
  DataBase.query(sql, (error, result) => {
    if (error) console.log(error.sqlMessage);
    else response.json(result);
  });
});

app.get("/getUser/:emailId", (request, response) => {
  let sql = `SELECT * from employee where email = "${request.params.emailId}"`;
  DataBase.query(sql, (error, result) => {
    if (error) console.log(error.sqlMessage);
    else response.json(result);
  });
});

app.delete("/deleteUser/:emailId", (request, response) => {
  let sql = `DELETE from employee where email = "${request.params.emailId}"`;
  DataBase.query(sql, (error, result) => {
    if (error) console.log(error.sqlMessage);
    else response.json("User Data Deleted Successfully", result);
  });
});

// app.put("/updateUser/:emailId",(request,response)=>{

//     const {name, email, phone, city} = request.body
//     const find = employee.some(employee=> employee.emailId === email)

//     if(find){
//         employee.forEach(employee=>{
//             if(employee.id === id){
//                 if(name) employee.name = name
//                 if(email) employee.emailId = email
//                 if(phone) employee.phone = phone
//                 if(city) employee.city = city
//             }
//         })
//     }

//     let sql = `UPDATE from employee where email = "${request.params.emailId}"`
//     DataBase.query(sql, (error,result)=>{
//         if(error) console.log(error.sqlMessage)
//             else response.json(result)
//     })
// })

app.put("/updateUser/:emailId", (request, response) => {
  const { name, email, phone, city } = request.body;

  const sql = `
        UPDATE employee 
        SET name = ?, email = ?, phone = ?, city = ?
        WHERE email = ?
    `;

  const values = [name, email, phone, city, request.params.emailId];

  DataBase.query(sql, values, (error, result) => {
    if (error) {
      console.log(error.sqlMessage);
    //   response.status(500).json({ error: error.sqlMessage });
    } else {
      response.json({ message: "User updated successfully", result });
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running pn port http://localhost:${PORT}`);
});
