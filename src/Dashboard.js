import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "./config";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [students, setStudents] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${config.api}/dashboard`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await axios.post(`${config.api}/dashboard`, values, {
          headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          },
        });
        alert(data.data.message);
        getData(); // Refresh data after submission
      } catch (error) {
        console.error("Error submitting data:", error);
        // Handle error gracefully
      }
    },
  });

  const doLogout = () => {
    localStorage.removeItem("react_app_token");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="btn btn-warning" onClick={doLogout}>
            Logout
          </div>
          <div className="col">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>  {/* Add key prop for better performance */}
                    <th scope="row">{student._id}</th>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
