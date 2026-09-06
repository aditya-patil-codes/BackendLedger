const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes.js");
const accountRouter = require("./routes/account.routes.js");
const transactionRoutes = require("./routes/transaction.routes.js");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json()); // this is a middleware - by default the express server cant read the req.body data. so that we use that.
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to the Ledger API");
});
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes);

module.exports = app;
