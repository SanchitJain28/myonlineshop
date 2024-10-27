import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../contexts/AuthContext'
import { Card } from "flowbite-react";
import { Divider,Button } from '@chakra-ui/react'



export default function DashBoard() {
    const loginContext = useContext(authContext)
    const [details, setDetails] = useState(null)
    const [orders, setOrders] = useState([])
    const getUserDetails = async () => {
        const userData = await loginContext.getUserInfo()
        setDetails(userData.userDetails)
        setOrders(userData.userOrders)
        console.log(userData)
    }
    useEffect(() => {
        getUserDetails()
    }, [])
    return (
        <>
            {details ? <>
                <Card className='m-4'>
                    <div>Your details</div>
                    <p className='text-3xl  font-sans m-4'> {details.name}</p>
                    <p className='text-3xl  font-sans m-4'>{details.email}</p>
                    <p className='text-3xl  font-sans m-4'>{details.phoneNo}</p>
                </Card>
                <p className='text-3xl m-8'>Your orders</p>
                {/* <Separator /> */}
                <Divider />
                <div className="flex flex-col m-4">
                    {orders.map((e) => {
                        return <Card href="#" className="m-2">
                            <p>Your items</p>
                            {e.orderItems.map((f) => {
                                return <>
                                    <div className="flex justify-between">
                                        <p className="text-xl w-28">{f.product.productName}</p>
                                        <p>₹
                                        {f.product.productPrice}</p>
                                        <img src={f.product.images[0]} className="w-12" />
                                    </div>
                                    <Divider />
                                </>
                            })}
                            <div className="flex justify-between">
                            <p className="w-28">Address :-{e.shippingAddress.address}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                               {e.totalPrice}
                            </p>
                            <p>Total itmes :-{e.orderItems.length}</p>
                            </div>
                            <Button className="w-40 bg-red-700">Cancel order</Button>
                            <p>Expected delivery date :-{Number(e.createdAt.slice(8,10))+2} of this month</p>
                        </Card>
                    })}
                </div>
            </> : <>
                loading
            </>}
            {/* <ReactUserOrderCard/> */}
        </>
    )
}

 