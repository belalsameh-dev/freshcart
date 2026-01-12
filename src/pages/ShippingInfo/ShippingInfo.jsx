import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useCart } from "../../hooks/useCart.js";
import { useAuth } from "../../hooks/useAuth.js";
import "./ShippingInfo.css";
import FormInput from "../../components/formInput/FormInput.jsx";

function ShippingInfo() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartCounter, cartId, getLoggedUserCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const headers = { token };
  const params = { url: `http://localhost:${window.location.port}` };
  const now = new Date().toLocaleString("en-US", { timeZone: "Egypt" });

  const validationSchema = Yup.object({
    city: Yup.string()
      .required("Required")
      .min(3, "Minimum length is 3 characters"),
    phone: Yup.string()
      .required("Required")
      .matches(/^(02)?01[1250][0-9]{8}$/, "Invalid phone number"),
    method: Yup.string()
      .required("Required")
      .oneOf(["cash", "card"], "Select a payment method"),
  });

  function createCashOrder(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers }
      )
      .then(() => getLoggedUserCart());
  }

  function createCardOrder(values) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      { shippingAddress: values },
      { headers, params }
    )
  }

  function handleOrder(values) {
    if (cartCounter === 0)
      return toast.error("Your cart is empty. add some items to cart first.");
    if (values.method === "cash") {
      setIsLoading(true);
      toast
        .promise(createCashOrder(values), {
          loading: "Submitting...",
          success: "Order submitted successfully",
          error: "Failed to submit order, please try again",
        })
        .then(() => navigate("/allorders"))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      createCardOrder(values)
        .then((res) => {
          window.open(res.data.session.url);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: now,
      method: "",
    },
    validationSchema,
    onSubmit: handleOrder,
  });

  const {
    values,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <section className="auth container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="section-title">Shipping Info</h1>
        <FormInput
          formik={formik}
          inputName="city"
          inputType="text"
          labelText="address"
        />
        <FormInput
          formik={formik}
          inputName="phone"
          inputType="tel"
          labelText="phone"
        />
        <div className="payment-wrapper">
          <p className="payment-title">Payment Method</p>
          <div className="payment-options">
            <label
              htmlFor="cash"
              className={`payment-box ${values.method === "cash" && "active"}`}
            >
              <input
                id="cash"
                type="radio"
                name="method"
                value="cash"
                checked={values.method === "cash"}
                onChange={handleChange}
              />
              Cash
            </label>
            <label
              htmlFor="card"
              className={`payment-box ${values.method === "card" && "active"}`}
            >
              <input
                id="card"
                type="radio"
                name="method"
                value="card"
                checked={values.method === "card"}
                onChange={handleChange}
              />
              Card
            </label>
          </div>
        </div>
        {isLoading ? (
          <button disabled type="submit" className="btn btn-main">
            <Bars
              height="24"
              width="24"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{ paddingInline: "20px" }}
              visible={true}
            />
          </button>
        ) : (
          <button
            disabled={!(isValid && dirty)}
            type="submit"
            className="btn btn-main"
          >
            submit order
          </button>
        )}
      </form>
    </section>
  );
}

export default ShippingInfo;
