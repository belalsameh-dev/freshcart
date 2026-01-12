import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainSlider.css";
import SliderImg1 from "../../assets/slider/slider-image-1.jpeg";
import SliderImg2 from "../../assets/slider/slider-image-2.jpeg";
import SliderImg3 from "../../assets/slider/slider-image-3.jpeg";
import BannerImg1 from "../../assets/slider/banner-1.jpeg";
import BannerImg2 from "../../assets/slider/banner-2.jpeg";

function MainSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
        },
      },
    ]
  };

  return (
    <div className="main-slider">
      <div className="row g-0">
        <div className="col-lg-8">
          <Slider {...settings}>
            <div className="slider-item">
              <img src={SliderImg1} alt="slider-img" />
            </div>
            <div className="slider-item">
              <img src={SliderImg2} alt="slider-img" />
            </div>
            <div className="slider-item">
              <img src={SliderImg3} alt="slider-img" />
            </div>
          </Slider>
        </div>
        <div className="col-lg-4">
          <div className="banner-item">
            <img src={BannerImg1} alt="banner-img" />
          </div>
          <div className="banner-item">
            <img src={BannerImg2} alt="banner-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSlider;
