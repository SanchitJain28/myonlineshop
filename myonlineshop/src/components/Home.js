import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ItemsCarousel from '../ImportedComponents/itemsCarousel'
import { productAPI } from '../contexts/ProductContext'
import { Component, ReactCarousel } from '../ImportedComponents/ReactCarousel'
import { useDisclosure } from '@chakra-ui/react'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const productInfo = useContext(productAPI)
  useEffect(() => {
    productInfo.getProducts();
  }, [])

  return (
    <>
      <div className="flex flex-col">
      <ReactCarousel/>

      </div>
      <div className="items-corousel p-12 bg-gray-300">
        <div className="m-8">
          <p className='text-3xl align-center text-center mb-8 '>Clothes</p>
          <ItemsCarousel category="Clothes" />
        </div>
          <div className="m-4">
          <p className='text-3xl align-center text-center mb-8 '>Electronics</p>
          <ItemsCarousel category="Electronics" />
          </div>

      </div>

    </>
  )
}
