import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Card } from 'flowbite-react'
import { authContext } from '../../contexts/AuthContext'
import { productAPI } from '../../contexts/ProductContext'
import ReactProductCard from '../../ImportedComponents/ProductCard'


export default function SellerDashboard() {
  const auth = useContext(authContext)
  const [sellerData, setSellerData] = useState(null)
  const sellerInformation = useContext(productAPI)
  const [sellerProducts, setSellerProducts] = useState([])
  const [orders, setOrders] = useState([])
  const getProducts = async () => {
    const data = await sellerInformation.getProductsbySeller()
    setSellerProducts(data.findProducts)
    setOrders(data.findOrders)
    setSellerData(data.data)
    localStorage.setItem("sellerDetails", JSON.stringify(data.data))
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
            {sellerProducts && sellerProducts.map((e) => { return <ReactProductCard myproduct={e} /> })}
          </div>

          <div className="flex flex-col mb-20">
            <p className='m-4 text-3xl align-center'>Your orders</p>
            <div className="flex flex-col">
              {console.log(orders)}
              {orders.map((e) => {
                return <>
                  <div className="p-4 m-4 border rounded">
                    <p className='my-2 text-2xl'>Order by : </p>
                    <div className="">
                      <Card className='bg-cyan-500'>
                      <p className='text-2xl' variant="body2" sx={{ color: 'text.secondary' }}>
                        {e.user?.name || <p>NOT AVAILABLE</p>}
                      </p>
                      <p variant="body2" sx={{ color: 'text.secondary' }} className='text-2xl'>
                        {e.user?.email || <p>NOT AVAILABLE</p>}
                      </p>
                      <p variant="body2" sx={{ color: 'text.secondary' }} className='text-2xl'>
                        {e.user?.phoneNo|| <p>NOT AVAILABLE</p>}
                      </p>
                      </Card>
                    </div>

                    {e.orderItems.filter((f) => {
                      return f.seller == sellerData.sellerid
                    }).map((m) => {
                      return <Card className='my-2'>
                        <CardContent>
                          <div className="flex justify-between">
                            <Typography gutterBottom variant="h5" component="div">
                              {m.product?.productName || <p>NOT AVAILABLE</p>}
                            </Typography>
                            <img src={m.product?.images[0]} className='w-20' />

                          </div>

                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {m.product?.productDescription || <p>NOT AVAILABLE</p>}
                          </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                      </Card>
                    })}
                    <p><br /></p>
                    <Button size="small" variant='contained'>Complete order</Button>

                  </div>
                </>
              })}
            </div>

          </div>

        </div>
      </> : <>
        <div className="flex flex-col p-4 m-2 border">
          <p className='pt-4 text-2xl text-center'>Start Your Selling Journey Today!</p>
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
