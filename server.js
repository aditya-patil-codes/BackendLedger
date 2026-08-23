require("dotenv").config()

const app = require("./src/app.js")
const connectDB = require('./src/config/db.js');


connectDB();

app.listen(3200,()=>{
    console.log("server is running on 3200");
})