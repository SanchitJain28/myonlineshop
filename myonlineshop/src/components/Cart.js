import React, { useContext,useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import ProductCard from './ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import ReactCardForCart from '../ImportedComponents/ReactCardForCart'
import { Button } from '@chakra-ui/react'
import { authContext } from '../contexts/AuthContext'
import LoginModal from '../ImportedComponents/LoginModal'
//SOME CHANGES IN THE FUNCTIONAL CART
export default function Cart() {
    const cartInfo=useContext(productAPI)
    const userDetails=useContext(authContext)
    const navigate=useNavigate()
    useEffect(() => {}, [cartInfo.productCart])
    
  return (
    <>
    {cartInfo.productCart.length==0?<>
    <div className="flex justify-center">
    <p className='text-center text-3xl my-20'>Your cart is empty</p>
    <Link to="/" className='my-20 mx-4'><Button>Order something</Button></Link>
    </div>

    </>:<>
    <div className="grid grid-cols-4 m-20">
    {cartInfo.productCart.map((e)=>{
        return <>
        <div className="m-2">
        <ReactCardForCart product={e}/> 
        </div>
       </>
    })}
    </div>
    {userDetails.loginDetails?<>
      <Button className='mx-20 w-1/3 p-12' onClick={()=>{
        cartInfo.setOrderProducts(cartInfo.productCart)
        navigate("/createorder")
    }}>Checkout</Button>
    </>:<>
      <Button className='mx-20 w-1/3 p-12'><LoginModal msg="Checkout"/></Button>
    </>}
    
    </>}
    
    </>
  )
}
