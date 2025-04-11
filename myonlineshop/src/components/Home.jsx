import React, { useContext, useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from '@mui/material'
import ItemsCarousel from './UI/itemsCarousel'

export default function Home() {
  const productInfo = useContext(productAPI)
  useEffect(() => {
    productInfo.getProducts();
  }, [])

  return (
    <>
        {/* <ReactCarousel /> */}
      <div className="px-4">
        <div className="pt-4 mb-4 lg:m-0 md:m-0">
          <div className="flex justify-between m-2">
            <p className='text-xl text-center align-center '>Clothes</p>
            <Button  component={Link} onClick={() => { productInfo.setCategory("Clothes") }} to="/categorypage">See all products</Button>
          </div>
          <ItemsCarousel category="Clothes" />
        </div>
        <div className="pt-4 mb-4 lg:m-0 md:m-0">
          <div className="flex justify-between m-2">
            <p className='text-xl text-center align-center '>Electronics</p>
            <Link to="/categorypage" onClick={() => { productInfo.setCategory("Electronics") }}><Button>See all products</Button></Link>
          </div>
          <ItemsCarousel category="Electronics" />
        </div>
        <div className="pt-4 mb-20 lg:m-0 md:m-0">
          <div className="flex justify-between m-2">
            <p className='text-xl text-center align-center'>Grocery</p>
            <Link to="/categorypage" onClick={() => { productInfo.setCategory("Grocery") }}><Button>See all products</Button></Link>
          </div>
          <ItemsCarousel category="Grocery" />
        </div>

      </div>

    </>
  )
}
