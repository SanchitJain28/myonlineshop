import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../contexts/AuthContext'
import { Card } from "flowbite-react";
import { Divider, useToast} from '@chakra-ui/react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';




export default function DashBoard() {
    const toast=useToast()
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
                    <Button variant='contained' onClick={()=>{
                        loginContext.setLoginDetails(null)
                        toast({
                            title: 'Logged Out',
                            description: 'You have successfully logged out',
                            status: 'warning',
                            duration: 5000,
                            isClosable: true
                        })
                    }} component={Link} to="/">Log out</Button>
                </Card>
                <p className='text-3xl m-8'>Your orders</p>
                {/* <Separator /> */}
                <Divider />
                <div className="flex flex-col mb-20 mx-4 mt-4">
                    {orders.map((e) => {
                        return <Card href="#" className="m-2">
                            <p>Your items</p>
                            <div className="">
                            {e.orderItems.map((g)=>{
                                return <>
                                <div className="flex flex-row justify-between">
                                <p>{g.product.productName}</p>
                                <p>{Math.floor(g.product.productPrice).toFixed(2)}</p>

                                <img src={g.product.images[0]} className='w-20'/>
                                </div>

                                </>
                            })}
                            </div>
                            <div className="flex justify-between">
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                               {Math.floor(e.totalPrice).toFixed(2)}
                            </p>
                            <p>Total itmes :-{e.orderItems.length}</p>
                            </div>
                            <div className="flex justify-center">
                            <Button className="w-40 bg-red-700 mx-4" variant='contained'>Cancel order</Button>
                            <Button variant='contained' className='w-40 mx-4'>Track order</Button>
                            </div>
                         
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

 