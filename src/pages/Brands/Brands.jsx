import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Brands.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data: allBrands, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
    select: (res) => res.data.data
  });
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="brands container">
      <h1 className="section-title">Brands</h1>
      <div className="row g-4">
            {allBrands.map((brand) => (
              <div key={brand._id} className="col-xl-3 col-md-4 col-sm-6">
                <div className="category-card brand">
                  <img
                    src={brand.image}
                    alt="category"
                    className="category-img"
                  />
                  <div className="category-overlay">
                    <h6 className="category-name">{brand.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </section>
  );
}

export default Brands;
