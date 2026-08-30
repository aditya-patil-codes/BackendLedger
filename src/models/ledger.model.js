const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId, // this is the name of the model we are referring to. not the name of the collection.

      ref: "account",
      required: [true, "Ledger must be associated with an account"],
      index: true,
      immutable: true
    },
    amount: {
      type: Number,
      required: [true, "Ledger must have an amount"],
      immutable: true
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
      required: [true, "Ledger must be associated with a transaction"],
      index: true,
      immutable: true
    },
    type: {
      type: String,
      enum: {
        values: ["CREDIT", "DEBIT"],
        message: "Ledger type can be either CREDIT or DEBIT"
      },
      required: [true, "Ledger must have a type"],
      immutable: true
    }
  },
  {
    timestamps: true
  }
);

function preventLegerModification() {

    return new Error("Ledger is immutable and cannot be modified");

}

ledgerSchema.pre("findOneAndUpdate", preventLegerModification);
ledgerSchema.pre("updateOne", preventLegerModification);
ledgerSchema.pre("updateMany", preventLegerModification);
ledgerSchema.pre("update", preventLegerModification);
ledgerSchema.pre("deleteOne", preventLegerModification);
ledgerSchema.pre("deleteMany", preventLegerModification);
ledgerSchema.pre("findOneAndDelete", preventLegerModification);
ledgerSchema.pre("findOneAndReplace", preventLegerModification);
ledgerSchema.pre("remove", preventLegerModification);


const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;
