import React, { useContext, useState } from 'react'
import { Input, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { authContext } from '../contexts/AuthContext'
import { Toast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function SellerLogin() {
  const navigate = useNavigate()
  const toast = useToast()
  const sellerLogin = useContext(authContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <>
      <Input placeholder='Enter Email' name='email' onChange={(e) => {
        setEmail(e.target.value)
      }} />
      <Input placeholder='Enter password' name='password' onChange={(e) => {
        setPassword(e.target.value)
      }} />
      <Button onClick={async () => {
        const data = await sellerLogin.sellerLogin(email, password)
        console.log(data)
        if (!data.errors) {
          localStorage.setItem("sellerId", data.token)
          navigate('/sellerdashboard')
          return toast({
            title: 'Login Successful',
            description: "you have Succesfully logged in",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        toast({
          title: 'user login failed',
          description: data.errors[0].msg,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }}>Login</Button>
    </>
  )
}
