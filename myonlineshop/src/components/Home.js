import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ItemsCarousel from '../ImportedComponents/itemsCarousel'
import { productAPI } from '../contexts/ProductContext'
import { Component, ReactCarousel } from '../ImportedComponents/ReactCarousel'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'



export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const productInfo = useContext(productAPI)
  useEffect(() => {
    productInfo.getProducts();
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <ReactCarousel />

      </div>
      <div className="items-corousel lg:p-0 xl:p-24 bg-gray-300 ">
        <div className="lg:m-0 md:m-0 mb-4 pt-4">
          <div className="flex justify-between mx-2">
            <p className='text-3xl align-center text-center mb-8 '>Clothes</p>
            <Link to="/categorypage" onClick={() => { productInfo.setCategory("Clothes") }}><Button>See all products</Button></Link>
          </div>
          <ItemsCarousel category="Clothes" />
        </div>
        <div className="lg:m-0 md:m-0 mb-4 pt-4">
          <div className="flex justify-between mx-2">
            <p className='text-3xl align-center text-center mb-8 '>Electronics</p>
            <Link to="/categorypage" onClick={() => { productInfo.setCategory("Electronics") }}><Button>See all products</Button></Link>
          </div>
          <ItemsCarousel category="Electronics" />
        </div>

      </div>

    </>
  )
}
