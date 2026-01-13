import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Auth.css";
import FormInput from "../../components/FormInput/FormInput.jsx";

function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email"),
    newPassword: Yup.string()
      .required("Required")
      .min(8, "Minimum length is 8 characters")
      .max(20, "Maximum length is 20 characters")
      .matches(
        /^[A-Za-z\d]+$/,
        "Invalid password: only letters and digits are allowed"
      ),
    rePassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleResetPassword = (values) => {
    setIsLoading(true);
    toast
      .promise(
        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
          email: values.email,
          newPassword: values.newPassword,
        }),
        {
          loading: "Resetting...",
          success: "Password reset successfully",
          error: "Failed to reset password",
        }
      )
      .then(() => navigate("/login"))
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  const { handleSubmit, isValid, dirty } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h6 className="h6">Reset your password</h6>
        <FormInput
          formik={formik}
          inputName="email"
          inputType="email"
          labelText="email"
        />
        <FormInput
          formik={formik}
          inputName="newPassword"
          inputType={showPassword ? "text" : "password"}
          labelText="new password"
        >
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="btn password-icon"
          >
            <FontAwesomeIcon
              icon={
                "fa-regular " + (showPassword ? " fa-eye" : " fa-eye-slash")
              }
            />
          </button>
        </FormInput>
        <FormInput
          formik={formik}
          inputName="rePassword"
          inputType={showRePassword ? "text" : "password"}
          labelText="confirm new password"
        >
          <button
            onClick={() => setShowRePassword(!showRePassword)}
            type="button"
            className="btn password-icon"
          >
            <FontAwesomeIcon
              icon={
                "fa-regular " + (showRePassword ? " fa-eye" : " fa-eye-slash")
              }
            />
          </button>
        </FormInput>
        {isLoading ? (
          <button disabled type="submit" className="btn btn-main">
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
          <button
            disabled={!(isValid && dirty)}
            type="submit"
            className="btn btn-main"
          >
            send
          </button>
        )}
      </form>
    </section>
  );
}

export default ResetPassword;
