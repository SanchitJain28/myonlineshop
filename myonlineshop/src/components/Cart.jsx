import React, { useContext,useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import ReactCardForCart from '../ImportedComponents/ReactCardForCart'
import { Button } from '@chakra-ui/react'
import { authContext } from '../contexts/AuthContext'
import LoginModal from './UI/LoginModal'
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
    <p className='my-20 text-3xl text-center'>Your cart is empty</p>
    <Link to="/" className='mx-4 my-20'><Button>Order something</Button></Link>
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
      <Button className='w-1/3 p-12 mx-20' onClick={()=>{
        cartInfo.setOrderProducts(cartInfo.productCart)
        navigate("/createorder")
    }}>Checkout</Button>
    </>:<>
      <Button className='w-1/3 p-12 mx-20'><LoginModal msg="Checkout"/></Button>
    </>}
    
    </>}
    
    </>
  )
}
