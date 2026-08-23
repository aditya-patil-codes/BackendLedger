const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("server is connected to the database");
    })
    .catch(err=>{
        console.log(err);
        process.exit(1) // if db  not connecting stop the server.
    })
}


module.exports = connectDB
