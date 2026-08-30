const mongoose = require("mongoose");



const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account", // this is the name of the model we are referring to. not the name of the collection.
        required: [true, "Transaction must be associated with a from account"],
        index: true
    },

    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account", // this is the name of the model we are referring to. not the name of the collection.
        required: [true, "Transaction must be associated with a to account"],
        index: true
    },

    status:{
        type: String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either PENDING, COMPLETED, REVERSED or FAILED"
        },
        default: "PENDING"
    },

    amount:{
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Transaction amount must be greater than 0"]
    },

    idempotencyKey:{ // always generates from client, is always unique for every transaction.
        type: String,
        required: [true, "Transaction must have an idempotency key"],
        unique: true,
        index: true
    }
},{
    timestamps: true
})


const transactionModel = mongoose.model("transaction" , transactionSchema)


module.exports = transactionModel