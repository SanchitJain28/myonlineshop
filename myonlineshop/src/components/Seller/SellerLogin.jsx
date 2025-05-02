import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { authContext } from '../../contexts/AuthContext'

export default function SellerLogin() {
  const navigate = useNavigate()
  const toast = useToast()
  const sellerLogin = useContext(authContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <>
      <div className="flex flex-col m-2 ">
        <TextField label="Email" variant="outlined" onChange={(e) => {
          setEmail(e.target.value)
        }} value={email} className='my-2' />

        <TextField label="Password" variant="outlined" onChange={(e) => {
          setPassword(e.target.value)
        }} value={password} />


        <Button className='my-2' onClick={async () => {
          console.log("RUNNIG")
          const data = await sellerLogin.sellerLogin(email, password)
          sellerLogin.setSellerDetails(data)
          console.log(data)
          if (!data.errors) {
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
        }} variant="outlined">Login</Button>
      </div>

    </>
  )
}
