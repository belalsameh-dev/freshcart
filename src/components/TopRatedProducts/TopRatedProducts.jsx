import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./TopRatedProducts.css";
import LoadingScreen from "../loadingScreen/LoadingScreen.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";

function TopRatedProducts() {
  const navigate = useNavigate();
  
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    select: (res) => res.data.data,
  });

  function getProductId(productId) {
    navigate(`/products/${productId}`);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const topRatedProducts = allProducts
    .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
    .slice(0, 4);

  return (
    <div className="top-rated-products">
      <h2 className="main-title">Top Rated Products</h2>
      <div className="row g-4">
        {topRatedProducts?.map((product) => (
          <div
            key={product.id}
            onClick={() => getProductId(product.id)}
            className="col-lg-3 col-md-4 col-sm-6"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedProducts;
