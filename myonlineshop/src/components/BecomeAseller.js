import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { Button } from '@mui/material'
import { authContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

export default function BecomeAseller() {
  const navigate = useNavigate()
  const toast = useToast()
  const user = useContext(authContext)
  const [loader, setLoader] = useState(false)
  const [businessName, setBusinessName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emptyFeilds = () => {
    setBusinessName("")
    setPhoneNo("")
    setEmail("")
    setPassword("")
  }
  return (
    <><div className="flex flex-col">
      <TextField
        required
        className='mx-4 my-2'
        id="outlined-required"
        label="Name"
        value={businessName}
        onChange={(e) => {
          setBusinessName(e.target.value)
        }}
      />
      <TextField
        required
        className='mx-4 my-2'
        id="outlined-PhoneNo"
        label="Phone no"
        onChange={(e) => {
          setPhoneNo(e.target.value)
        }}
        value={phoneNo}
      />
      <TextField
        required
        className='mx-4 my-2'
        id="outlined-error"
        label="email"
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        value={email}
      />
      <TextField
        required
        className='mx-4 my-2'
        id="outlined-error"
        label="Password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        value={password}
      />

      {/* <Input onChange={(e) => { setPhoneNo(e.target.value) }} placeholder="Enter your Phone number" className='p-4 m-2' value={phoneNo} />
        <Input onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter your email" className='p-4 m-2' value={email} />
        <Input onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your Password" className='p-4 m-2' value={password} /> */}
      <Button variant="outlined" className='mx-4 my-2' onClick={async () => {
        const data = await user.createSellerAccount(businessName, phoneNo, email, password)
        user.setSellerDetails(data)
        console.log(data)
        if (!data.errors) {
          emptyFeilds()
          localStorage.setItem("sellerId", data.token)
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
    </>
  )
}
