import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import "./Auth.css";
import FormInput from "../../components/FormInput/FormInput.jsx";

function ResetCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Required").matches(/^\d+$/, "Numbers only allowed"),
  });

  const handleResetCode = (values) => {
    setIsLoading(true);
    toast
      .promise(
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values),
        {
          loading: "Verifying...",
          success: "Verified successfully",
          error: "Invalid or expired code",
        }
      )
      .then(() => navigate("/resetPassword"))
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleResetCode,
  });

  const { handleSubmit, isValid, dirty } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h6 className="h6">Type received code to reset your password</h6>
        <FormInput
          formik={formik}
          inputName="resetCode"
          inputType="text"
          labelText="Reset Code"
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

export default ResetCode;
