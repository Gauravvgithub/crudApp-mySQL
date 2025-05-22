const express = require("express");
const app = express();
const path = require("path")
const DataBase = require("./models/connection");
const AllUsers = require("./AllUsers")


const PORT = 3000;

app.use(express.json()); // accepts json data

app.use(express.static("public"));

app.get("/",(request, response)=>{
    response.send("this is home page")
})

app.get("/showAllUsers",(request, response)=>{
    response.json(AllUsers)
})

app.post("/addUser", (request, response) => {
  const user = {
    name: request.body.name,
    email: request.body.email,
    phone: request.body.mobile,
    city: request.body.city,
  };
    console.log(user)
  const sql = "INSERT INTO `employee` SET ?";
  DataBase.query(sql, user, (error, result) => {
    if (error) console.log(error.sqlMessage);
    else response.json(user);
  });
});

app.get("/getUser",(request, response)=>{
    let sql = `SELECT * from employee`
    DataBase.query(sql, (error,result)=>{
        if(error) console.log(error.sqlMessage)
            else response.json(result)
    })
})

app.listen(PORT, () => {
  console.log(`server is running pn port http://localhost:${PORT}`);
});
