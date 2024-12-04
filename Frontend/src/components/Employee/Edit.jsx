import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({});
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch departments
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://hrms-mern-project.onrender.com/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDepartments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Fetch employee data
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://hrms-mern-project.onrender.com/api/employees/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => {
      // Update nested departmentId field if the department is selected
      if (name === "department") {
        // const selectedDepartment = departments.find((dep) => dep._id === value);
        return { ...prev, departmentId: value };
      }

      // Update other fields
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      
      formData.forEach((value, key) => {
        // console.log(`form data  ${key}:`, value);
      });

      // Append image if selected
      if (image) {
        formData.append("image", image);
      }

      // Submit updated data
      const response = await axios.put(
        `https://hrms-mern-project.onrender.com/api/employees/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("==form data==",formData)
      formData.forEach((value, key) => {
        // console.log(`form data  ${key}:`, value);
      });
      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      console.error("Failed to edit employee:", error);
      alert("Failed to edit employee.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Employee</h2>
      {employee ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.row}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={employee.user?.name || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {/* Employee ID and Date of Birth */}
          <div style={styles.row}>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={employee.employeeId || ""}
              readOnly
              style={styles.input}
            />
            <input
              type="date"
              name="dateOfBirth"
              defaultValue={employee.dateOfBirth?.slice(0, 10) || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {/* Marital Status */}
          <div style={styles.row}>
            <select
              name="maritalStatus"
              value={employee.maritalStatus || ""}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          {/* Designation and Department */}
          <div style={styles.row}>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={employee.designation || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <select
              name="department"
              defaultValue={employee.departmentId?._id || ""}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          {/* Salary */}
          <div style={styles.row}>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              defaultValue={employee.salaryId?.basicSalary || ""}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {/* Image Upload */}
          <div style={styles.row}>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "30px",
  },
};

export default Edit;




