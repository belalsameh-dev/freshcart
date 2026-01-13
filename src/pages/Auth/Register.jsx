import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars } from "react-loader-spinner";
import "./Auth.css";
import FormInput from "../../components/FormInput/FormInput.jsx";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .required("Required")
      .min(3, "Minimum length is 3 characters")
      .max(20, "Maximum length is 20 characters"),
    email: Yup
      .string()
      .required("Required")
      .email("Invalid email"),
    password: Yup
      .string()
      .required("Required")
      .min(8, "Minimum length is 8 characters")
      .max(20, "Maximum length is 20 characters")
      .matches(/^[A-Za-z\d]+$/, "Invalid password: only letters and digits are allowed"),
    rePassword: Yup
      .string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup
      .string()
      .required("Required")
      .matches(/^(02)?01[1250][0-9]{8}$/, "Invalid phone number"),
  });

  const handleRegister = (values) => {
    setIsLoading(true);
    const toastId = toast.loading("Registering...");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then(() => {
      setIsLoading(false);
      toast.success("Account registered successfully", {id: toastId});
      setTimeout(() => navigate("/login"), 1000);
    }).catch(({response: {data: {message}}}) => {
      setIsLoading(false);
      toast.error(message, {id: toastId});
    });    
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  const {
    handleSubmit,
    isValid,
    dirty
  } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="section-title">register</h1>
        <FormInput formik={formik} inputName="name" inputType="text" labelText="name" /> 
        <FormInput formik={formik} inputName="email" inputType="email" labelText="email" /> 
        <FormInput formik={formik} inputName="password" inputType={showPassword ? "text" : "password"} labelText="password">
          <button onClick={() => setShowPassword(!showPassword)} type="button" className="btn password-icon">
            <FontAwesomeIcon icon={"fa-regular " + (showPassword ? " fa-eye" : " fa-eye-slash")} />
          </button>
        </FormInput>
        <FormInput formik={formik} inputName="rePassword" inputType={showRePassword ? "text" : "password"} labelText="confirm password">
          <button onClick={() => setShowRePassword(!showRePassword)} type="button" className="btn password-icon">
            <FontAwesomeIcon icon={"fa-regular " + (showRePassword ? " fa-eye" : " fa-eye-slash")} />
          </button>
        </FormInput>
        <FormInput formik={formik} inputName="phone" inputType="tel" labelText="phone" />       
        { isLoading ? <button disabled type="submit" className="btn btn-main">
          <Bars
            height="24"
            width="24"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{ paddingInline: "20px" }}
            visible={true}
          />
        </button> : <button disabled={!(isValid && dirty)} type="submit" className="btn btn-main">register</button>}
      </form>
    </section>
  );
}

export default Register;
