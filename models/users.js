const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    // martialStatus: { type: String, enum: ["Married", "Single", "Widow"], default: "Single" },
    // skills: { type: Array },
    // age: { type: Number, require: true },
    password: { type: String }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;