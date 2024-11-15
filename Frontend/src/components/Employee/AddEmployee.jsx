import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDepartments(response.data.data); // Assuming response.data contains an array of department objects
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the form data object
    const formDataObj = new FormData();
  
    // Prepare the data in the required format
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      employInfo: {
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        designation: formData.designation,
      },
      departmentId: formData.department,
      salaryInfo: {
        salary: formData.salary,
      },
    };
  
    // Append the main data to the formDataObj
    formDataObj.append("name", data.name);
    formDataObj.append("email", data.email);
    formDataObj.append("password", data.password);
    formDataObj.append("role", data.role);
  
    // Append the nested objects as JSON strings
    formDataObj.append("employInfo", JSON.stringify(data.employInfo));
    formDataObj.append("departmentInfo", JSON.stringify(data.departmentInfo));
    formDataObj.append("salaryInfo", JSON.stringify(data.salaryInfo));
  
    // If there's an image, append it as well
    if (image) {
      formDataObj.append("image", image);
    }
  
    // Log the formDataObj to see the structure
    console.log(data);
  
    // Now you can send the formDataObj to the backend (e.g., using axios or fetch)
    // Example:
    try {
      const response = await axios.post("http://localhost:3000/api/employees/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert("Failed to add employee.");
    }
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={styles.input}>
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div style={styles.row}>
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="department"
            value={formData.department}
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
        <div style={styles.row}>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            style={styles.inputFile}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
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
  inputFile: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
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

export default AddEmployee;
