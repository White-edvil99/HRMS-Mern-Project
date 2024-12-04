require("dotenv").config(); // Load environment variables early

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const connectToDb = require("./Database/Db");
const departmentRouter = require("./routes/department");
const employeeRoutes = require("./routes/EmployeRoute");
const salaryRouter = require("./routes/salary");
const settingRouter = require("./routes/setting");
const { userRegister } = require("./UserSeed");
const leaveRouter = require("./routes/leave");
const leaveTypeRouter = require('./routes/leavetype');
const AttendanceRouter = require("./routes/attandanceRouter");
const dashboardRouter = require("./routes/dashboard");
const userRouter = require("./routes/user");
const path = require("path");

connectToDb(); // Call the function to connect to the database

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/salary", salaryRouter);
app.use('/api/leave', leaveRouter);
app.use("/api/leave-type", leaveTypeRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/setting/", settingRouter);
app.use("/api/dashboard/", dashboardRouter);
app.use("/api/user", userRouter);

// Static file serving for frontend
const frontendPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendPath));

// Fallback route for SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});


// require("dotenv").config(); // Load environment variables early

// const express = require("express");
// const cors = require("cors");
// const authRouter = require("./routes/auth");
// const connectToDb = require("./Database/Db");
// const departmentRouter = require("./routes/department");
// const employeeRoutes = require("./routes/EmployeRoute");
// const salaryRouter = require("./routes/salary");
// const settingRouter = require("./routes/setting")
// const { userRegister } = require("./UserSeed");
// const leaveRouter = require("./routes/leave");
// const leaveTypeRouter = require('./routes/leavetype')
// // const connectToDb = require("./Database/Db");
// const AttendanceRouter = require("./routes/attandanceRouter")
// const dashboardRouter = require("./routes/dashboard")
// const userRouter = require("./routes/user")
// const path = require("path");

// connectToDb(); // Call the function to connect to the database

// const app = express();

// // const __dirname = path.resolve();



// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRouter);
// app.use('/api/departments', departmentRouter);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/salary", salaryRouter);
// app.use('/api/leave', leaveRouter);
// app.use("/api/leave-type", leaveTypeRouter)
// app.use("/api/attendance", AttendanceRouter)
// // app.use('/api/employee', leaveRouter);
// app.use("/api/setting/", settingRouter);
// app.use("/api/dashboard/", dashboardRouter);
// app.use("/api/user", userRouter);


// const PORT = process.env.PORT || 7000;


// // app.get("/", (req, res) => {
// //   res.send("Hello from server");
// // });

// app.use(express.static(path.join(__dirname, 'Frontend/dist')));

// app.get('*', (_, res)=>{
//   res.sendFile(path.resolve(__dirname,"..","Frontend","dist","index.html"));
// })

// app.listen(PORT, async() => {
//   // const resp = await userRegister() 
//   // console.log("-------------->",resp)
//   console.log(`Server running on port ${PORT}`);
// });
