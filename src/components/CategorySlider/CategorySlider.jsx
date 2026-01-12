import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategorySlider.css";

function CategorySlider() {
  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 7,
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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 525,
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data: allCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    select: (res) => res.data.data,
  });

  return (
    <div className="category-slider">
      <h2 className="main-title">shop popular categories</h2>
      <Slider {...settings}>
        {allCategories?.map((category) => (
          <div key={category._id} className="grab">
            <img src={category.image} alt="category" />
            <h6>{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
