const express = require("express");
const verifyUser = require("../middleware/authMiddleware");
const { LeaveType, Leave } = require("../models/Leave");

const {
  addLeave,
  getLeaves,
  getName,
  updateLeaveStatus,
} = require("../controller/leaveController");

// const departmentRouter = express.Router();
const router = express.Router();

// Route to add a leave type form admin side
// router.post("/add-leave-type", async (req, res) => {
//     try {
//         const { name, description, monthlyAllocation, adminId } = req.body;

//         const newLeaveType = new LeaveType({
//             name,
//             description,
//             monthlyAllocation,
//             createdBy: adminId,
//         });

//         await newLeaveType.save();
//         res.status(201).json({ message: "Leave type created successfully!", leaveType: newLeaveType });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating leave type", error });
//     }
// });


router.post("/add/:id", verifyUser, addLeave);

router.get(
  "leaves/:id",
  (req, res, next) => {
    console.log("fecthing leave for ids", req.params.id);
    next();
  },
  verifyUser,
  getName
); //get /leave by empid
router.get("/:id", verifyUser, getLeaves);
router.patch("/status/:leaveId", verifyUser, updateLeaveStatus);
router.get("/leaves/status-count", async (req, res) => {
  try {
    const leaveStatusCount = await Leave.aggregate([
      {
        $group: {
          _id: "$status", // Group by status
          count: { $sum: 1 }, // Count the number of leaves in each status
        },
      },
    ]);

    res.status(200).json(leaveStatusCount);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching leave status counts." });
  }
});
module.exports = router;
