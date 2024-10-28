import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { productAPI } from '../contexts/ProductContext'
import { Pagination } from "flowbite-react";
import { Button } from '@chakra-ui/react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useToast } from '@chakra-ui/react'
import CategoryPageProductCard from '../ImportedComponents/CategoryPageProductCard';




export default function CategoryPage() {
  const toast = useToast()
  const [product, setProducts] = useState([])
  const productInfo = useContext(productAPI)
  const [currentPage, setCurrentPage] = useState(0);
  const [disable, setDisable] = useState(false)
  const onPageChange = () => {
    setCurrentPage(currentPage + 1)
  }

  const productsByCategory = async () => {
    const data = await productInfo.getProductsByCategory(productInfo.category, 0)
    // if (data.length < 10) {
    //   setDisable(true)
    // }
    setProducts([ ...data])
    setCurrentPage(0)
    console.log(data)
  }

  const fetchMore = async () => {
    const data = await productInfo.getProductsByCategory(productInfo.category, currentPage)
    // if(data.length<=10){
    //   setDisable(true)
    // }
    setProducts([...product, ...data])
  }

  useEffect(() => {
    fetchMore()
    console.log(productInfo.category)
  }, [currentPage])

  useEffect(() => {
    productsByCategory()
    console.log(productInfo.category)
    // productsByCategory()

  }, [productInfo.category])


  return (
    <>
      <div className="flex flex-col">
        {product.map((e) => {
          return <CategoryPageProductCard data={e} />
        })}
      </div>
      <Button onClick={onPageChange} className='mx-12' disabled={disable}>More item</Button>
    </>

  )
}
