import React from "react";
import { useDispatch } from "react-redux";
import { startLoginUser } from "../actions/userAction.js";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import "../App.css";
//import { Button } from "antd";
import isStrongPassword from "validator/lib/isStrongPassword";
import "./../styles/Login.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="main-form">
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "required";
            } else if (!isStrongPassword(values.password)) {
              errors.password = "password must be mixed combination";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const formData = {
              email: values.email,
              password: values.password,
            };
            dispatch(startLoginUser(formData, navigate));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="sub-form">
              <h2 className="heading-two">Login Here</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="eamil">email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="error-show">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div>
                  <label htmlFor="password">password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <span className="error-show">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>
                <button
                  className="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  LogIn
                </button>
                <p>
                  do not have an account?<Link to="/register">SignUp</Link>
                </p>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
