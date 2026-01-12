import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import "./Auth.css";
import FormInput from "../../components/formInput/FormInput.jsx";
import { useAuth } from "../../hooks/useAuth.js";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuth();

  const validationSchema = Yup.object({
    email: Yup
      .string()
      .required("Required")
      .email("Invalid email"),
    password: Yup
      .string()
      .required("Required")
      .min(8, "Minimum length is 8 characters")
      .max(20, "Maximum length is 20 characters")
      .matches(/^[A-Za-z\d]+$/, " Invalid password: only letters and digits are allowed"),
  });

  const handleLogin = (values) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    .then(({data: {token}}) => {
      setIsLoading(false);
      toast.success("Logged in successfully", {id: toastId});
      localStorage.setItem('token', token);
      setToken(token);
      setTimeout(() => navigate("/"), 1000);
    })
    .catch(({response: {data: { message }}}) => {
      setIsLoading(false);
      toast.error(message, {id: toastId});
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const {
    handleSubmit,
    isValid,
    dirty,
  } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="section-title">login</h1>
        <FormInput formik={formik} inputName="email" inputType="email" labelText="email" />
        <FormInput formik={formik} inputName="password" inputType={showPassword ? "text" : "password"} labelText="password">
          <button onClick={() => setShowPassword(!showPassword)} type="button" className="btn password-icon">
            <FontAwesomeIcon icon={"fa-regular " + (showPassword ? " fa-eye" : " fa-eye-slash")} />
          </button>
        </FormInput>
        <Link to="/forgetPassword" className="forget-password-link">forget password?</Link>
        {isLoading ? (
          <button disabled type="submit" className="btn btn-main mt-0">
            <Bars
              height="24"
              width="24"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{ paddingInline: "15px" }}
              visible={true}
            />
          </button>
        ) : (
          <button disabled={!(isValid && dirty)} type="submit" className="btn btn-main mt-0">login</button>
        )}
      </form>
    </section>
  );
}

export default Login;
