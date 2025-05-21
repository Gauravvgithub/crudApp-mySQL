const express = require("express");
const app = express();
const DataBase = require("./models/connection");

const PORT = 3000;

app.use(express.json()); // accepts json data

app.get("/",(request, response)=>{
    response.send("this is home page")
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

app.listen(PORT, () => {
  console.log(`server is running pn port http://localhost:${PORT}`);
});
