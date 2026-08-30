const accountModel = require("../models/account.model.js")

async function createAccountController(req,res){
    const user = req.user; // Assuming the user is attached to the request object by the auth middleware
    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        message: "Account created successfully",
        account
    })
}

async function getAllAccountsController(req, res) {
    const user = req.user;
    const accounts = await accountModel.find({ user: user._id });

    res.status(200).json({
        message: "Accounts retrieved successfully",
        accounts
    });
}


async function getAccountBalanceController(req, res) {
    const user = req.user;
    const { accountId } = req.params;

    const account = await accountModel.findOne({ _id: accountId, user: user._id });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    const balance = await account.getBalance();

    res.status(200).json({
        message: "Account balance retrieved successfully",
        balance
    });
}

module.exports = {
    createAccountController,
    getAllAccountsController,
    getAccountBalanceController
};  