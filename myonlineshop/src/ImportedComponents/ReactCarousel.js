import { Carousel } from "flowbite-react";

export function ReactCarousel() {
  return (
    <div className="h-32 xl:h-96  ">
      <Carousel className="rounded-full">
        <img src="https://4.bp.blogspot.com/-j08zU37hpt4/W5aaDndpsWI/AAAAAAAAFoc/tq-c11-V1sgMDyFd5cB3Z6jsO2UICZiQgCK4BGAYYCw/s1600/CL-Banner.jpg" alt="..." className="rounded-none w-full" />
        <img src="https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg" alt="..." />
        <img src="https://newsolez.com/wp-content/uploads/2018/02/banner_addidas_originals_promo_b7ad4407-7dd0-4ca9-8881-29d04bbda68a_1600x681-e1563918699775-760x300.png" alt="..." />
        <img src="https://calzzapatodigital.s3.us-west-1.amazonaws.com/landings/calzzasport/fcc9d70f-6160-4e4d-9e81-69f02a0b63e6.webp" alt="..." />
      </Carousel>
    </div>
  );
}
