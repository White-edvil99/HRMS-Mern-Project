require("dotenv").config(); // Load environment variables early

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const connectToDb = require("./Database/Db");
const departmentRouter = require("./routes/department");
const employeeRoutes = require("./routes/EmployeRoute");
const salaryRouter = require("./routes/salary");
const settingRouter = require("./routes/setting")
const { userRegister } = require("./UserSeed");
const path = require("path");
const leaveRouter = require("./routes/leave");
// const connectToDb = require("./Database/Db");
const dashboardRouter = require("./routes/dashboard")
const userRouter = require("./routes/user")

connectToDb(); // Call the function to connect to the database

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/salary", salaryRouter);
app.use('/api/leave', leaveRouter);
// app.use('/api/employee', leaveRouter);
app.use("/api/setting/", settingRouter);
app.use("/api/dashboard/", dashboardRouter);
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 7000;


app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, async() => {
  // const resp = await userRegister() 
  // console.log("-------------->",resp)
  console.log(`Server running on port ${PORT}`);
});
