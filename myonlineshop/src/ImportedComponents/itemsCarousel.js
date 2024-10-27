import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React, { useContext, useEffect, useState } from 'react'
import ProductCard from "../components/ProductCard";
import { productAPI } from "../contexts/ProductContext";

export default function ItemsCarousel(props) {
  const productInfo=useContext(productAPI)
  const[productData,setProductData]=useState([])
  const getMeData=async()=>{
        const data =await productInfo.getProductsByCategory(props.category,"0")
        setProductData(data)
        console.log(data)
  }
  useEffect(() => {
    getMeData()
  }, [])
  

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 10
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
  return (
    <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={true}
    className=""
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 4,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
      }
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
  >
    {productData.map((e)=>{
      return <ProductCard name={e.productName} price={e.productPrice} Description={e.productDescription} sellername={e.sellerName} id={e} imageLinks={e.images}/>
    })}
  </Carousel>
  )
}


