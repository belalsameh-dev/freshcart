import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./SubCategories.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function SubCategories() {
  const { id } = useParams();

  const getCategory = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    return data.data;
  };

  const getSubCategories = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    return data.data;
  };

  const {
    isLoading: isCategoryLoading,
    data: category,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: getCategory,
    enabled: !!id,
  });

  const {
    isLoading: isSubLoading,
    data: subCategories = [],
  } = useQuery({
    queryKey: ["subCategories", id],
    queryFn: getSubCategories,
    enabled: !!id,
  });

  if (isCategoryLoading || isSubLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="sub-categories container">
      <h1 className="section-title">{category?.name}</h1>

      {subCategories.length > 0 ? (
        <div className="row g-4">
          {subCategories.map((subCategory) => (
            <div key={subCategory._id} className="col-xl-3 col-md-4 col-sm-6">
              <h6 className="sub-category-name">{subCategory.name}</h6>
            </div>
          ))}
        </div>
      ) : (
        <h6 className="sub-category-not-found">
          No subcategories found
        </h6>
      )}
    </section>
  );
}

export default SubCategories;
