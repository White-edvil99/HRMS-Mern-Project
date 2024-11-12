require("dotenv").config(); // Load environment variables early

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const connectToDb = require("./Database/Db");
const departmentRouter = require("./routes/department");
const employeeRoutes = require("./routes/EmployeRoute");
const { userRegister } = require("./UserSeed");

connectToDb(); // Call the function to connect to the database

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 7000;


app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, async() => {
  // const resp = await userRegister() 
  // console.log("-------------->",resp)
  console.log(`Server running on port ${PORT}`);
});
