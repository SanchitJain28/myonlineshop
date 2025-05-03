import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { productAPI } from '../../contexts/ProductContext';
import ProductCard from "../Product/ProductCard";
import { useContext, useState, useEffect } from "react";

export default function ProductCarousel({category}) {
  const productInfo = useContext(productAPI);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getMeData = async () => {
      try {
        const data = await productInfo.getProductsByCategory(category);
        setProductData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    
    getMeData();
  }, [productInfo]);

  if (productData.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 0 },
        768: { slidesPerView: 4, spaceBetween: 0 },
        1024: { slidesPerView: 4, spaceBetween:0 },
      }}
    >
      {productData.map((product, index) => (
        <SwiperSlide key={product.id || index}>
          <ProductCard data={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}