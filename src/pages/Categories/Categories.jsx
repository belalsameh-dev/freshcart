import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Categories.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function Categories() {
  const navigate = useNavigate();

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    select: (res) => res.data.data,
  });

  function getCategoryId(categoryId) {
    navigate(`/categories/${categoryId}/subcategories`);
  }
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="container">
          <h1 className="section-title">Categories</h1>
          <div className="row g-4">
            {allCategories.map((category) => (
              <div key={category._id} className="col-xl-3 col-md-4 col-sm-6">
                <div onClick={() => getCategoryId(category._id)} className="category-card">
                  <img
                    src={category.image}
                    alt="category"
                    className="category-img"
                  />
                  <div className="category-overlay">
                    <h6 className="category-name">{category.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Categories;
