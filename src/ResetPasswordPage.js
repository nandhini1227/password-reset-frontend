import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "./config";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetPasswordString: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`${config.api}/reset-password-page`, values);
        alert(user.data.message);
        navigate("/");
      } catch (error) {
        console.error("Error resetting password:", error);
        alert("Failed to reset password. Please try again."); 
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Enter Reset Password String
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            name="resetPasswordString"
            onChange={formik.handleChange}
            value={formik.values.resetPasswordString}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Enter Email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Enter New Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputEmail1"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Reset Password
        </button>
      </form>
    </>
  );
}

export default ResetPasswordPage;
