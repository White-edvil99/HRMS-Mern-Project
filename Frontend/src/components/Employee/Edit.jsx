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
    const fetchDepartments = async () => {
      try {
        
        const response = await axios.get("http://localhost:3000/api/departments", {
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

  console.log("department response ============> ", departments)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
        setEmployee(response.data.data);
        console.log("Fetched employee:", response.data.data);
      } catch (err) {
        console.error("Error fetching employee data", err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedDepartment = departments.find(dep=>dep._id === value);
    
    setEmployee({ ...employee, departmentId: {
      ...selectedDepartment
    } });
    
  };

  useEffect(()=>{

    console.log("employee" , employee);
  },[employee])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(employee).forEach((key) => {
      formDataObj.append(key, employee[key]);
    });
    if (image) {
      formDataObj.append("image", image);
    }

    
    try {
      const response = await axios.put(`http://localhost:3000/api/employees/${id}`, formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("=====>",response)
      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      console.error("Failed to edit employee:", error);
      alert("Failed to EDIT employee.");
    }
  };

  return (
    <>
      {employee ? (
        <div style={styles.container}>
          <h2 style={styles.title}>Edit Employee</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
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
            <div style={styles.row}>
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                value={employee.employeeId || ""}
                readOnly
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="dateOfBirth"
                defaultValue={employee.dateOfBirth || ""}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.row}>
              <select
                name="maritalStatus"
                defaultValue={employee.maritalStatus || ""}
                onChange={handleChange}
                style={styles.input}
              >
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
                defaultValue={employee.designation || ""}
                onChange={handleChange}
                style={styles.input}
              />
              {console.log(employee.departmentId?._id)}
              <select
                name="department"
                value={employee.departmentId?._id}
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
                defaultValue={employee.salaryId?.basicSalary || ""}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
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
