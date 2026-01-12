import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import "./Auth.css";
import FormInput from "../../components/formInput/FormInput.jsx";

function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email"),
  });

  const handleForgetPassword = (values) => {
    setIsLoading(true);
    toast
      .promise(
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values),
        {
          loading: "Sending...",
          success: "Reset code sent to your email",
          error: "Failed to send reset code",
        }
      )
      .then(() => navigate("/resetCode"))
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  });

  const { handleSubmit, isValid, dirty } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h6 className="h6">Type your email to receive a reset code</h6>
        <FormInput
          formik={formik}
          inputName="email"
          inputType="email"
          labelText="email"
        />
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

export default ForgetPassword;
