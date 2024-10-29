import React, { useContext, useEffect } from 'react'
import ItemsCarousel from '../ImportedComponents/itemsCarousel'
import { productAPI } from '../contexts/ProductContext'
import {  ReactCarousel } from '../ImportedComponents/ReactCarousel'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {Button as MUIButton} from '@mui/material';



export default function Home() {
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
        <div className="lg:m-0 md:m-0 mb-4 pt-4">
          <div className="flex justify-between mx-2">
            <p className='text-3xl align-center text-center mb-8 '>Grocery</p>
            <Link to="/categorypage" onClick={() => { productInfo.setCategory("Grocery") }}><Button>See all products</Button></Link>
          </div>
          <ItemsCarousel category="Grocery" />
        </div>

      </div>

    </>
  )
}
