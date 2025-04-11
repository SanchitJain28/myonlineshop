import "react-multi-carousel/lib/styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import { productAPI } from "../contexts/ProductContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function ItemsCarousel(props) {
  const productInfo = useContext(productAPI);
  const [productData, setProductData] = useState([]);
  const getMeData = async () => {
    const data = await productInfo.getProductsByCategory(props.category, "0");
    setProductData(data);
    console.log(data);
  };
  useEffect(() => {
    getMeData();
  }, []);

  return (
    <>
      <Swiper
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
          {productData.map((product) => {
            return (
              <SwiperSlide>
                <ProductCard data={product} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
}
