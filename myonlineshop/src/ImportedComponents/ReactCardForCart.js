import React, { useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Divider,Image,Heading,Button,ButtonGroup } from '@chakra-ui/react'
import { productAPI } from '../contexts/ProductContext'
import { Card as FlowbiteCard} from "flowbite-react";


export default function ReactCardForCart(props) {
  const cartInfo=useContext(productAPI)
  const {productName,productDescription,productPrice,images,_id}=props.product
  return (
     <FlowbiteCard>
<div className="flex justify-between">
  <div className="">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {productName}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400 mt-4">
      ₹{productPrice}
    </p>
    <Button onClick={(e)=>{
    let cartProducts=cartInfo.productCart
   cartProducts= cartProducts.filter((e)=>{
      return e._id!==_id
    })
    cartInfo.setProductCart(cartProducts)
  }}>Remove</Button>
  </div>
  <div className="">
    <img src={images[0]} className='w-20'/>
  </div>
</div>


</FlowbiteCard> 
  )
}
