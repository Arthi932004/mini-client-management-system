const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
{
name: {
type: String,
required: [true, "Client name is required"],
trim: true
},


    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true
    },

    company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    address: {
        type: String,
        default: "",
        trim: true
    },

    notes: {
        type: String,
        default: "",
        trim: true
    }
},
{
    timestamps: true
}


);

module.exports = mongoose.model("Client", clientSchema);
