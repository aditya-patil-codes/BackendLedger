const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required to create a user"],
        trim:true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,"invalid email adress"],
        unique:[true,"Email already exists"]
    },
    name:{
        type: String,
        required:[true,"Name is required to create the account"]
    },

    password:{
        type:String,
        required:[true,"Password is required to create the acccount"],
        minlength:[6,"password should contain more than 6 chars"],
        select: false // by default will not fetch the password with the queries
    },
    timestamps: true
})

userSchema.pre("save", async function(next){ // befrore saving into DB hash the password
    if(!this.isModified("password")){
        return next()
    }

    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash;

    return next()
})

userSchema.methods.comparePassword = async function(password){ // pre will make it into hash and save it into DB // this funtion will return true or false depending upon the pasowrd is correct 
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model("user" , userSchema)

module.exports = userModel