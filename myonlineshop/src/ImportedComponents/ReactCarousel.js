import { Carousel } from "flowbite-react";

export function ReactCarousel() {
  return (
    <div className="h-32 xl:h-96  ">
      <Carousel className="rounded-full">
        <img src="https://4.bp.blogspot.com/-j08zU37hpt4/W5aaDndpsWI/AAAAAAAAFoc/tq-c11-V1sgMDyFd5cB3Z6jsO2UICZiQgCK4BGAYYCw/s1600/CL-Banner.jpg" alt="..." className="rounded-none w-full" />
        <img src="https://i.ytimg.com/vi/f64GdOxJjPE/maxresdefault.jpg" alt="..." />
        <img src="https://i.ytimg.com/vi/MkBgqyAp6lY/maxresdefault.jpg" alt="..." />
        <img src="https://calzzapatodigital.s3.us-west-1.amazonaws.com/landings/calzzasport/fcc9d70f-6160-4e4d-9e81-69f02a0b63e6.webp" alt="..." />
      </Carousel>
    </div>
  );
}
