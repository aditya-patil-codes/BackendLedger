const {Router} = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const transactionController = require("../controllers/transaction.controller.js");
const transactionRoutes = Router();


// post - api/transactions/
// create a new transaction

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction); // this was crazy 

// Post /api/transactions/system/initial-funds 

transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction);

module.exports = transactionRoutes;