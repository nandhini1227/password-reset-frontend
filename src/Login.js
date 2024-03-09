import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`${config.api}`, values);
        localStorage.setItem("react_app_token", user.data.token);
        alert(user.data.message);

        if (user.data.message) {  
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed! Please check your credentials."); 
      }
    },
  });

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
              <label for="username" class="form-label">
                UserName
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p className="form-label">
                <Link to="/resetpassword"> Forget Password?</Link>
              </p>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>

            <div class="mb-3">
              <p class="form-label">
                Don't have account,
                <Link to="/register">Click here</Link> to SignUP
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
