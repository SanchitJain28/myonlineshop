
// import  { useContext, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
// import "swiper/css";
// import { productAPI } from '../../contexts/ProductContext';
// import ProductCard from "../Product/ProductCard";

export default function ItemsCarouselNew(props) {
  // const productInfo = useContext(productAPI);
  // const [productData, setProductData] = useState([]);
  // const getMeData = async () => {
  //   const data = await productInfo.getProductsByCategory('Electronics', "0");
  //   setProductData(data);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   getMeData();
  // }, []);

  return (
    <>
    <p className="text-5xl"> RUN </p>
      {/* <Swiper
        spaceBetween={0}
        slidesPerView={1.8}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        <div className="flex">
          {[1,2,3,4,5].map((product) => {
            return (
              <SwiperSlide>
                <div className="">Slide</div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper> */}
    </>
  );
}
