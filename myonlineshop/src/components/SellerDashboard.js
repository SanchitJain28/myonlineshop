import React, { useContext, useEffect, useState } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import ReactProductCard from '../ImportedComponents/ProductCard'

export default function SellerDashboard() {
    const sellerInformation=useContext(productAPI)
    const[product,setProduct]=useState([])
    const getProducts=async()=>{
        const data=await sellerInformation.getProductsbySeller()
        setProduct(data.findProducts)
        console.log(data)
    }
    useEffect(() => {
      getProducts()
    }, [])
    
  return (
    <>
    <div className="flex flex-col">
        <div className="flex m-4">
        <p className='text-3xl align-center'>Welcome to the seller dashobaord</p>
        </div>
        <div className="flex justify-between m-4">
        <p className='text-3xl align-center'>Your products</p>
        <Link to="/addproduct" className="p-4 bg-black rounded-2xl text-white w-40 mx-8">Add product</Link>
        </div>
    <div className="flex flex-col">
    {product && product.map((e)=>{return <ReactProductCard myproduct={e}/>})}
    </div>

    <div className="flex m-4">
        <p className='text-3xl align-center'>Your orders</p>
    </div>
   
    </div>
    </>
  )
}
