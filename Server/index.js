const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
// Import the connectToDb function
const connectToDb = require("./Database/Db");

const departmentRouter = require("./routes/department");

connectToDb(); // Call the function to connect to the database
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);

require("dotenv").config();

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
