import React, { useContext, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Toast from '../ImportedComponents/Toast'
import { authContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function BecomeAseller() {
  const navigate=useNavigate()
    const toast = useToast()
    const user=useContext(authContext)
    const[loader,setLoader]=useState(false)
    const[businessName,setBusinessName]=useState("")
    const[phoneNo,setPhoneNo]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const emptyFeilds=()=>{
        setBusinessName("")
        setPhoneNo("")
        setEmail("")
        setPassword("")
    }
  return (
    <><div className="flex justify-center">
        <img src='https://marketplace.canva.com/EAEthkBVLfQ/1/0/1600w/canva-blush-wave-desktop-wallpaper-drvq3zaYl2E.jpg' className='w-full h-full' />
        <div className="flex flex-col justify-center mr-20 absolute top-20 my-32 p-36 bg-black rounded-xl	">
<Input onChange={(e)=>{setBusinessName(e.target.value)}} placeholder="Enter your Business name" className='p-4 m-2' value={businessName}/>
<Input onChange={(e)=>{setPhoneNo(e.target.value)}} placeholder="Enter your Phone number" className='p-4 m-2' value={phoneNo}/>
<Input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" className='p-4 m-2' value={email}/>
<Input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password" className='p-4 m-2' value={password}/>
<Button onClick={async()=>{
 const data =  await user.createSellerAccount(businessName,phoneNo,email,password)
 console.log(data)
 if(!data.errors){
    emptyFeilds()
    localStorage.setItem("sellerId",data.token)
    navigate('/sellerdashboard')
   return toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

 }
 toast({
    title: 'Account cannot be created created.',
    description: data.errors[0].msg,
    status: 'error',
    duration: 9000,
    isClosable: true,
  })


}}>Become a Seller</Button>
<Link to="/sellerlogin" className='text-white text-2xl p-2 my-2 '>Already a seller</Link>
    </div>
    </div>
    </>
  )
}
