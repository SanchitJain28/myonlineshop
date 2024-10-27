import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { productAPI } from '../contexts/ProductContext'
import { Pagination } from "flowbite-react";
import { Button } from '@chakra-ui/react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useToast } from '@chakra-ui/react'




export default function CategoryPage() {
  const toast = useToast()
  const [product, setProducts] = useState([])
  const productInfo = useContext(productAPI)
  const [currentPage, setCurrentPage] = useState(0);
  const[disable,setDisable]=useState(false)
  const onPageChange=()=>{
    setCurrentPage(currentPage+1)    
  }

  const productsByCategory = async () => {
    const data = await productInfo.getProductsByCategory(productInfo.category, currentPage)
    if(data.length<10){
      setDisable(true)
    }
    setProducts([...product,...data])
    
    console.log(data)
  }

  useEffect(() => {
    productsByCategory()
    console.log(productInfo.category)
  }, [currentPage])

  useEffect(() => {
    setProducts([])
  }, [productInfo.category])
  

  return (
    <>
      <div className="grid grid-cols-5 m-12">
        {product.map((e) => {
          return <ProductCard name={e.productName} price={e.productPrice} Description={e.productDescription} sellername={e.sellerName} id={e} imageLinks={e.images} productCategory={e.productCategory} />
        })}
      </div>
        <Button onClick={onPageChange} className='mx-12' disabled={disable && toast({
                title: `all products reached`,
                status: "info",
                isClosable: true,
              })} >Hell nah</Button>
    </> 

  )
}
