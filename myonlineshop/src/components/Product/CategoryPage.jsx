import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { productAPI } from '../../contexts/ProductContext';
import CategoryPageProductCard from './CategoryPageProductCard';




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
    if (data.length < 10) {
      setDisable(true)
    }
    setProducts(data)
    setCurrentPage(0)

    console.log(data)
  }

  const fetchMore = async () => {
    if(currentPage>0){
      const data = await productInfo.getProductsByCategory(productInfo.category, currentPage)
      if(data.length<10){
        setDisable(true)
      }
      setProducts([...product, ...data])
    }
   
  }

  useEffect(() => {
    fetchMore()
    console.log(productInfo.category)
  }, [currentPage])

  useEffect(() => {
    setDisable(false)
    productsByCategory()
    console.log(productInfo.category)
  }, [productInfo.category])


  return (
    <>
      <div className="flex flex-col">
        {product.map((e) => {
          return <CategoryPageProductCard data={e} />
        })}
      </div>
      <Button onClick={onPageChange} className='mx-12 mb-20' disabled={disable}>More item</Button>
    </>

  )
}
