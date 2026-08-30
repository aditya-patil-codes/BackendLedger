const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware.js");
const accountController = require("../controllers/account.controller.js");

const router = express.Router();

// post /api/accounts
// creating a new account
// protected router

router.post("/", authMiddleware, accountController.createAccountController);

// get method - retrieve all accounts of a user
router.get("/", authMiddleware, accountController.getAllAccountsController);

router.get("/balance/:accountId", authMiddleware, accountController.getAccountBalanceController);

module.exports = router;
