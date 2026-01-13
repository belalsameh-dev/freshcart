import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useWish } from "../../hooks/useWish.js";
import { useCart } from "../../hooks/useCart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WishList.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function WishList() {
  const { fetchWish, isLoading, wish, wishCounter, removeProductFromWish } = useWish();
  const { addProductToCart } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const handleRemove = (productId) => {
    setRemovingId(productId);
    toast
      .promise(removeProductFromWish(productId), {
        loading: "Removing...",
        success: "Item removed successfully",
        error: "Failed to remove item",
      })
      .finally(() => setRemovingId(null));
  };

  function handleAdd(productId) {
    setAddingId(productId);
    toast
      .promise(addProductToCart(productId), {
        loading: "Adding...",
        success: "Product added successfully",
        error: "Failed to add product",
      })
      .finally(() => setAddingId(null));
  }

  useEffect(() => {
    fetchWish();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="container">
      <h1 className="section-title">WishList</h1>
      <div className="wish-details p-3 bg-light border">
        <header className="border-bottom p-2">
          <h4 className="h6 fw-semibold">
            <span className="text-main">Wishlist items:</span> {wishCounter}
          </h4>
        </header>
        <div className="row g-4 align-items-center pt-3 pb-2">
          {wish.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-4 col-sm-6 position-relative"
            >
              <div className="border-bottom pb-3">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-100 mb-2"
                />
                <div className="pe-2">
                  <h3 className="h6 fw-semibold text-center mb-3">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <h6 className="h6 small">
                    <span className="text-main text-uppercase">price:</span>{" "}
                    {item.price} EGP
                  </h6>
                  <h6 className="h6 small">
                    <span className="text-main text-uppercase">category:</span>{" "}
                    {item.category.name}
                  </h6>
                  <h6 className="h6 small">
                    <span className="text-main text-uppercase">brand:</span>{" "}
                    {item.brand.name}
                  </h6>
                  <button
                    onClick={() => handleAdd(item._id)}
                    disabled={addingId === item._id}
                    type="button"
                    className={`btn cart ${addingId === item._id && "adding"}`}
                  >
                    {addingId === item._id ? (
                      <FontAwesomeIcon
                        icon="fa-solid fa-cart-arrow-down"
                        className="text-main"
                      />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
                    )}
                  </button>
                </div>
                <button
                  disabled={removingId === item._id}
                  onClick={() => handleRemove(item._id)}
                  className="btn nav-btn remove wish"
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
        </div>
        {wish.length === 0 && (
          <p className="h4 text-center py-5 fw-semibold">
            Wishlist is empty. Start adding products.
          </p>
        )}
      </div>
    </section>
  );
}

export default WishList;
