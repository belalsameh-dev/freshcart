import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./Products.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

function Products() {
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

  return (
    <>
      <section className="products container">
        <h2 className="section-title">Products</h2>
        <div className="row g-4">
          {allProducts?.map((product) => (
            <div
              key={product.id}
              onClick={() => getProductId(product.id)}
              className="col-lg-3 col-md-4 col-sm-6"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Products;
