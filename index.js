const express = require("express")
const app = express()

const PORT = 4848

app.listen(PORT, ()=>{
    console.log(`server is running pn port https://localhost:${PORT}`)
})