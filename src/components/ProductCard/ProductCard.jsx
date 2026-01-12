import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWish } from "../../hooks/useWish.js";
import { useCart } from "../../hooks/useCart.js";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addProductToWish, removeProductFromWish, wishIds } = useWish();
  const { addProductToCart } = useCart();
  const [addingId, setAddingId] = useState(null);
  
  const isFavorite = wishIds.has(product.id);
  const isAdding = addingId === product.id;

  function stop(e, fn) {
    e.stopPropagation();
    fn();
  }

  function handleFavorite(productId) {
    if (isFavorite) {
      toast.promise(removeProductFromWish(productId), {
        loading: "Removing...",
        success: "Product removed successfully",
        error: "Failed to remove product",
      });
    } else {
      toast.promise(addProductToWish(productId), {
        loading: "Adding...",
        success: "Product added successfully",
        error: "Failed to add product",
      });
    }
  }

  function handleAddToCart(productId) {
    setAddingId(productId);
    toast.promise(addProductToCart(productId), {
        loading: "Adding...",
        success: "Product added successfully",
        error: "Failed to add product",
    }).finally(() => setAddingId(null));
  }

  return (
    <div className="product-card">
      <div className="img-container">
        <img src={product.imageCover} alt="product" className="product-img" />
      </div>
      <h6 className="product-category">{product.category.name}</h6>
      <h6 className="product-title">
        {product.title.split(" ").slice(0, 2).join(" ")}
      </h6>
      <div className="price-rating-container">
        <div className="price">
          <span>{product.price}</span>EGP
        </div>
        <div className="rating">
          <FontAwesomeIcon icon="fa-solid fa-star" />
          {product.ratingsAverage}
        </div>
      </div>
      <button
        onClick={(e) => stop(e, () => handleAddToCart(product.id))}
        disabled={isAdding}
        type="button"
        className={`btn cart ${isAdding && "adding"}`}
      >
        {isAdding ? (
          <FontAwesomeIcon
            icon="fa-solid fa-cart-arrow-down"
            className="text-main"
          />
        ) : (
          <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
        )}
      </button>
      <button
        onClick={(e) => stop(e, () => handleFavorite(product.id))}
        type="button"
        className="btn wishlist"
      >
        {isFavorite ? (
          <FontAwesomeIcon icon="fa-solid fa-heart" className="text-danger" />
        ) : (
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        )}
      </button>
    </div>
  );
}

export default ProductCard;
