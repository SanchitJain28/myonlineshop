import React, { useContext, useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Text, Heading, Stack, Box, StackDivider, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Button } from '@mui/material'
import { productAPI } from '../../contexts/ProductContext'
import { authContext } from '../../contexts/AuthContext'

export default function OrderPage() {
  const toast=useToast()
  const navigate=useNavigate()
  const orderDetails = useContext(productAPI)
  const userDetails=useContext(authContext)
  const [itemsPrice, setItemsPrice] = useState(0)
  const [taxPrice, setTaxPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderProductDetails, setOrderProductDetails] = useState([])
  const[fullName,setFullName]=useState("")
  const [address,setAddress]=useState("")
  const[city,setCity]=useState("")
  const[country,setCountry]=useState("")
  const[postalCode,setPostalCode]=useState("")
  const {setOrderProducts}=orderDetails
  const BillingDetails = () => {
    let totalAmount = 0
    let itemsAmount = 0
    let taxPrice = 0
    let shippingAmount = 0

    orderDetails.orderProducts.map((e) => {
      return e.productPrice
    }).forEach((e) => {
      itemsAmount += e
    })

    taxPrice = (itemsAmount / 100) * 8
    if (itemsAmount + totalPrice > 1000) { shippingAmount = 11 }
    else { shippingAmount = 40 }
    totalAmount = itemsAmount + taxPrice + shippingAmount
    setItemsPrice(itemsAmount)
    setTaxPrice(taxPrice)
    setShippingPrice(shippingAmount)
    setTotalPrice(totalAmount)
  }

  const orderedProducts = () => {
    const orderList = orderDetails.orderProducts.map((e) => {
      return {
        product: e._id,
        seller: e.sellerId,
        quantity: 1,
        price: e.productPrice
      }
    })
    console.log(orderList)
    setOrderProductDetails(orderList)
  }
  useEffect(() => {
    orderedProducts()
    BillingDetails()
  }, [userDetails.loginDetails])


  return (
    <>
    {userDetails.loginDetails?<>
      <p className='m-8 text-3xl'>For products</p>
      {orderDetails.orderProducts.map((e,index) => {
        return <Card className='mx-8 my-2' key={index}>
          <CardBody>
            <div className="flex justify-between">
              <Text className='mx-4 text-xl font-bold'>{e.productName}</Text>

              <img src={e.images[0]} className='w-12 mx-4'></img>
            </div>

            <p className='mx-4'>₹{e.productPrice}</p>
          </CardBody>
        </Card>
      })}

      <div className="m-8">
        <Card className='p-4'>
          <p className='m-8 text-3xl'>Shipping details</p>
        <Stack spacing={3}>
        <Input variant='flushed' placeholder='Full name' className='mx-8 my-2' onChange={(e)=>{
          setFullName(e.target.value)
        }}/>
          <Input variant='flushed' placeholder='Address' className='mx-8 my-2' onChange={(e)=>{
          setAddress(e.target.value)
        }}/>
          <Input variant='flushed' placeholder='city' className='mx-8 my-2'onChange={(e)=>{
          setCity(e.target.value)
        }} />
          <Input variant='flushed' placeholder='postal code' className='mx-8 my-2'onChange={(e)=>{
          setPostalCode(e.target.value)
        }} />
          <Input variant='flushed' placeholder='country' className='mx-8 my-2' onChange={(e)=>{
          setCountry(e.target.value)
        }} />
        </Stack>
        </Card>
      </div>



      {/* //Billing */}
      <div className="mx-8 mb-20">
        <Card >
          <CardHeader>
            <Heading size='md'>Billing</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Items Price
                </Heading>
                <Text pt='2' fontSize='sm'>
                  ₹{itemsPrice}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  tax price Including GST
                </Heading>
                <Text pt='2' fontSize='sm'>
                  ₹{taxPrice}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  shipping Price
                </Heading>
                <Text pt='2' fontSize='sm'>
                  ₹{shippingPrice}
                </Text>
              </Box>
              <Box>

                <Heading size='xs' textTransform='uppercase'>
                  Total Billing amount
                </Heading>
                <Text pt='2' fontSize='sm'>
                  ₹{totalPrice}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Button variant='outlined' onClick={async()=>{
        const data =await orderDetails.createMeAOrder(orderProductDetails,fullName,address,city,postalCode,country,itemsPrice,taxPrice,shippingPrice,totalPrice)
        console.log(data)
        setOrderProducts([])
        if(!data.errors){
          setTimeout(() => {
            navigate("/ordersuccess")
          }, 1000);
          return toast({
          title: `Order Created Succesfully`,
          status: "success",
          description:"Order created Succesfully",
          isClosable: true,
        })
        }
        toast({
          title: `Order Cannot be created`,
          status: "error",
          description:data.errors[0].msg,
          isClosable: true,
        })
      }} className='my-2'>Make order</Button>
      </div>
      <Button variant='outlined' onClick={async()=>{
        const data =await orderDetails.createMeAOrder(orderProductDetails,fullName,address,city,postalCode,country,itemsPrice,taxPrice,shippingPrice,totalPrice)
        console.log(data)
        if(!data.errors){
          setTimeout(() => {
            navigate("/ordersuccess")
          }, 1000);
          return toast({
          title: `Order Created Succesfully`,
          status: "success",
          description:"Order created Succesfully",
          isClosable: true,
        })
        }
        toast({
          title: `Order Cannot be created`,
          status: "error",
          description:data.errors[0].msg,
          isClosable: true,
        })
      }} className='mx-4 text-white '>Make order</Button>
          

    </>:
    
    <>
    </>}
     
    </>
  )
}
