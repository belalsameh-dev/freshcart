import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../hooks/useCart.js";
import { useWish } from "../../hooks/useWish.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function ProductDetails() {
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const { addProductToWish, removeProductFromWish, wishIds } = useWish();
  const { addProductToCart } = useCart();
  const isFavorite = wishIds.has(id);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    select: (res) => res.data.data,
  });

  function handleAddToCart(productId) {
    setIsAdding(true);
    toast.promise(addProductToCart(productId), {
      loading: "Adding...",
      success: "Product added successfully",
      error: "Failed to add product",
    }).finally(() => setIsAdding(false));
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

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="container min-vh-100 d-flex justify-content-center flex-column px-4">
      <div className="sub-title">Product Details</div>
      <div className="product-details">
        <div className="row g-4 align-items-center">
          <div className="col-xl-3 col-lg-4 col-md-5">
            <div className="imgs-container">
              <Slider {...settings}>
                {product.images?.map((image, index) => (
                  <div key={index} className="grab">
                    <img src={image} alt="product" className="product-details-img" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7">
            <div className="product-details-info">
              <h6 className="product-title">{product.title}</h6>
              <h6 className="product-desc">{product.description}</h6>
              <h6 className="product-category">{product.category.name}</h6>
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
                onClick={() => handleAddToCart(product.id)}
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
                onClick={() => handleFavorite(product.id)}
                type="button"
                className="btn wishlist"
              >
                {isFavorite ? (
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    className="text-danger"
                  />
                ) : (
                  <FontAwesomeIcon icon="fa-regular fa-heart" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
