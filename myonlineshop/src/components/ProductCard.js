import React, { useContext } from 'react'
import { Button, ButtonGroup, } from '@chakra-ui/react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import { Rating } from "flowbite-react";




export default function ProductCard(props) {
  const productContext = useContext(productAPI)
  return (
    <>
      <div className=" border-zinc-400 rounded-xl flex flex-col bg-gray-900 text-white text-gray-500 my-1 w-48 max-h-full sm:h-full xl:w-80">
        <img src={props.imageLinks ? props.imageLinks[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"} className='rounded-t-xl h-48' />
        <div className=" p-4">
          <p className='font-sans'>{props.name}</p>
          <p className='font-bold mb-4'>₹{props.price}</p>
          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>

          </Rating>
          {/* <p className='my-2'>{props.sellername}</p> */}
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{props.productCategory}</p>

          {/* <Button variant='outline' colorScheme='green' >Buy now</Button> */}
          <Link to="/product" onClick={() => {
            productContext.setCurrentProduct(props.id)
          }}><Button className='my-2 text-white hover:text-black' variant='outline' colorScheme='blackAlpha'>Buy now</Button></Link>
        </div>

      </div>
    </>
  )
}
