require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        const user = await User.findOneAndUpdate(
            { email: "admin@gmail.com" },
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            console.log("Admin not found");
        } else {
            console.log("Admin Password Reset Successfully!");
        }

    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

resetPassword();