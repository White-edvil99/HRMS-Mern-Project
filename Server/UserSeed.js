const User = require("./models/User");
const bcrypt = require("bcryptjs");

const connectToDb = require("./Database/Db");

const userRegister = async () => {
    await connectToDb(); // Ensure the database connection completes
    try {
        const hashPassword = await bcrypt.hash("Vikash", 10); // Await the password hashing
        const newUser = new User({
            name: "Vikash",
            email: "mohitbishtj2@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        await newUser.save();
        console.log("User registered successfully");
    } catch (error) {
        console.log("Error registering user:", error);
    }
}

module.exports = {
    userRegister
}

// userRegister();
