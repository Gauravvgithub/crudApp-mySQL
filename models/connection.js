const mysql = require("mysql")

const DataBase =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ems"
})

DataBase.connect((error,result)=>{
    if(error) console.log(error)
    else console.log("database connected successfully!!")
})

// DataBase.end();

module.exports = DataBase;