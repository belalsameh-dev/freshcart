import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/useCart.js";
import "./Cart.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function Cart() {
  const { fetchCart, isLoading, cart, updateCartItemQuantity, removeCartItem, clearCart } = useCart();
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  function handleUpdate(productId, count) {
    setUpdatingId(productId);
    toast.promise(updateCartItemQuantity(productId, count), {
        loading: "Updating...",
        success: "Item updated successfully",
        error: "Failed to update item",
    }).finally(() => setUpdatingId(null));
  }

  function handleRemove(productId) {
    setRemovingId(productId);
    toast.promise(removeCartItem(productId), {
        loading: "Removing...",
        success: "Item removed successfully",
        error: "Failed to remove item",
    }).finally(() => setRemovingId(null));
  }

  function handleClear() {
    toast.promise(clearCart(), {
        loading: "Clearing...",
        success: "Cart cleared successfully",
        error: "Failed to clear cart",
    });
  }

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="container">
      <h1 className="section-title">Cart</h1>
      <div className="cart-details p-3 bg-light border">
        <header className="border-bottom p-2">
          <h4 className="h6 fw-semibold">
            <span className="text-main">Cart items:</span>{" "}
            {cart.products?.length}
          </h4>
          <h4 className="h6 fw-semibold">
            <span className="text-main">Total cart price:</span>{" "}
            {cart.totalCartPrice} EGP
          </h4>
        </header>
        {cart.products?.map((item) => (
          <div
          key={item._id}
          className="row g-3 align-items-center py-3 border-bottom position-relative"
          >
            <div className="col-md-2">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-100"
              />
            </div>
            <div className="col-md-10">
              <div className="d-flex justify-content-between align-items-end">
                <div className="pe-2">
                  <h3 className="h6 fw-semibold">{item.product.title}</h3>
                  <h6 className="h6">
                    <span className="text-main text-uppercase small">
                      price:
                    </span>{" "}
                    {item.price} EGP
                  </h6>
                  <h6 className="h6">
                    <span className="text-main text-uppercase small">
                      total:
                    </span>{" "}
                    {item.price * item.count} EGP
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    disabled={updatingId === item.product._id}
                    onClick={() =>
                      handleUpdate(item.product._id, item.count + 1)
                    }
                    className="btn btn-count"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                  </button>
                  <span className="fs-5 mx-2">{item.count}</span>
                  <button
                    disabled={
                      item.count === 1 || updatingId === item.product._id
                    }
                    onClick={() =>
                      handleUpdate(item.product._id, item.count - 1)
                    }
                    className="btn btn-count"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-minus" />
                  </button>
                </div>
              </div>
              <button
                disabled={removingId === item.product._id}
                onClick={() => handleRemove(item.product._id)}
                className="btn nav-btn remove"
                data-text="REMOVE"
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-trash-can"
                  className="icon"
                />{" "}
              </button>
            </div>
          </div>
        ))}
        {!(cart.products?.length === 0) ? <div className="d-flex justify-content-end">
          <Link
            to="/shippingInfo"
            type="button"
            className="btn btn-main bg-primary mt-3 ms-2"
          >
            create order
          </Link>
          <button onClick={handleClear} type="button" className="btn btn-main bg-danger mt-3 ms-2">
            clear cart
          </button>
        </div> : <p className='h4 text-center py-5 fw-semibold'>Cart is empty. Please add some products to start shopping.</p>}
      </div>
    </section>
  );
}

export default Cart;
