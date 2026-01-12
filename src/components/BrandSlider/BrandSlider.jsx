import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BrandSlider.css";

function BrandSlider() {
  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1285,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data: allBrands } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
    select: (res) => res.data.data
  });

  return (
    <div className="brand-slider">
      <h2 className="main-title">featured brands</h2>
      <Slider {...settings}>
        {allBrands?.map((brand) => (
          <div key={brand._id} className="grab">
            <img src={brand.image} alt={brand.name} />
            <h6>{brand.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BrandSlider;
