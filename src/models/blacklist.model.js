const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to add to blacklist"],
        unique: true,
        index: true
    },

}, {
    timestamps: true
});

tokenBlacklistSchema.index({ createdAt: 1},{expireAfterSeconds: 60*60*24}); // created an index for the token field

const tokenBlacklistModel = mongoose.model("tokenBlacklist", tokenBlacklistSchema);

module.exports = tokenBlacklistModel;