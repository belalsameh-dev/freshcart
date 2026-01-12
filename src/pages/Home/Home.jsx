import { useEffect } from "react";
import { useCart } from "../../hooks/useCart.js";
import { useWish } from "../../hooks/useWish.js";
import "./Home.css";
import MainSlider from "../../components/MainSlider/MainSlider.jsx";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import BrandSlider from "../../components/BrandSlider/BrandSlider.jsx";
import TopRatedProducts from "../../components/TopRatedProducts/TopRatedProducts.jsx";

function Home() {
  const { getLoggedUserCart } = useCart();
  const { getLoggedUserWish } = useWish();
  
  useEffect(() => {
    getLoggedUserCart();
    getLoggedUserWish();
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="section-title">Home</h1>
        <MainSlider />
        <CategorySlider />
        <BrandSlider />
        <TopRatedProducts />
      </section>
    </>
  );
}

export default Home;
