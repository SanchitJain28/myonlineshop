import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export function ReactCarousel() {
  return (
    <div className="h-32 xl:h-96 ">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        
      >
        <SwiperSlide>
          <img
            src="https://www.appstory.org/wp-content/uploads/2019/08/ecommerce-mobile-application-development-company.jpg"
            alt="..."
            className="w-full rounded-none"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/f64GdOxJjPE/maxresdefault.jpg"
            alt="..."
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ytimg.com/vi/MkBgqyAp6lY/maxresdefault.jpg"
            alt="..."
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://calzzapatodigital.s3.us-west-1.amazonaws.com/landings/calzzasport/fcc9d70f-6160-4e4d-9e81-69f02a0b63e6.webp"
            alt="..."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
