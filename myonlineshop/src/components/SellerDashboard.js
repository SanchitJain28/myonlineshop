import React, { useContext, useEffect, useState } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import ReactProductCard from '../ImportedComponents/ProductCard'
import { authContext } from '../contexts/AuthContext'
import { Button } from '@mui/material'


export default function SellerDashboard() {
  const auth = useContext(authContext)
  const sellerInformation = useContext(productAPI)
  const [product, setProduct] = useState([])
  const[orders,setOrders]=useState([])
  const getProducts = async () => {
    const data = await sellerInformation.getProductsbySeller()
    setProduct(data.findProducts)
    setOrders(data.findOrders)
    console.log(data)
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {auth.sellerDetails ? <>
        <div className="flex flex-col">
          <div className="flex m-4">
            <p className='text align-center'>Welcome to the seller dashobaord</p>
          </div>
          <div className="flex justify-between m-4">
            <p className='text align-center'>Your products</p>
            <Button component={Link} variant='outlined' to="/addproduct">ADD</Button>
          </div>
          <div className="flex flex-col">
            {product && product.map((e) => { return <ReactProductCard myproduct={e} /> })}
          </div>

          <div className="flex mb-20">
            <p className='text-3xl align-center'>Your orders</p>
            <div className="flex flex-col">
            {orders.map((e)=>{
              return <>
              <p>as</p>
              </>
            })}
            </div>
           
          </div>

        </div>
      </> : <>
        <div className="flex flex-col border m-2 p-4">
          <p className='text-2xl text-center pt-4'>Start Your Selling Journey Today!</p>
          <p className='text-center '>Welcome to our eCommerce platform, where your business dreams can turn into reality! Whether you're a passionate entrepreneur or a small business owner, our app provides all the tools and support you need to showcase your products, reach new customers, and grow your brand.
            Becoming a seller on our platform is simple and empowering. With user-friendly tools to manage your listings, seamless payment processing, and dedicated customer support, you can focus on what you do best: creating and curating amazing products. Join a thriving community of sellers and reach shoppers who are ready to discover and love what you offer!
            Ready to get started? Sign up today and take the first step toward success in eCommerce!</p>
          <Button variant='outlined' component={Link} to="/becomeaseller" className='mx-4 my-2'>Register as a seller</Button>
          <Button variant='outlined' component={Link} to="/sellerlogin" className='mx-4 my-2 mb-4'>Login as a seller</Button>

        </div>
      </>}

    </>
  )
}
