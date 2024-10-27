import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {FormControl,FormLabel,FormErrorMessage,FormHelperText,Input, Toast, useToast, Button} from '@chakra-ui/react'
import { authContext } from '../contexts/AuthContext';

export default function RegisterPage() {
  const toast = useToast()
  //usecontext
  const auth = useContext(authContext)
  //navigate
  const navigate = useNavigate();

  //states
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")


  //PLEASE ADD HEADER OPTION OTHERWISE it will not work

  return (
    <>
    <div className="flex justify-center">
    <img src='https://img.freepik.com/free-vector/hand-drawn-colorful-groovy-psychedelic-background_23-2149083914.jpg' className='w-full h-screen'/>
        <div className="flex flex-col p-20 m-20 absolute top-48 w-1/2  items-center	 rounded-xl bg-black text-white">
          <FormControl className='my-4'>
            <FormLabel>Email address</FormLabel>
            <Input type='email' onChange={(e) => {
              setEmail(e.target.value)
            }} value={email} />
            <FormHelperText className='text-white'>We'll never share your email.</FormHelperText>
          </FormControl>


          <FormControl className=''>
            <FormLabel>password</FormLabel>
            <Input type='email' onChange={(e) => {
              setpassword(e.target.value)
            }} value={password} />
          </FormControl>

          <FormControl className='my-2'>
            <FormLabel>Your full name</FormLabel>
            <Input onChange={(e) => {
              setName(e.target.value)
            }} value={name} />
          </FormControl>

          <FormControl className='my-2'>
            <FormLabel>Your Contact No</FormLabel>
            <Input onChange={(e) => {
              setPhoneNo(e.target.value)
            }} value={phoneNo} />
          </FormControl>

          <Button backgroundColor='#2C7A7B' onClick={async () => {
            const data = await auth.getMeRegistered(email, password, name, phoneNo)
            if (!data.errors) {
              setTimeout(() => {
                navigate("/")
              }, 1500);
              return toast({
                title: `Account created Succesfully`,
                status: "success",
                isClosable: true,
              })
            }
            toast({
              title: `Account cannot created`,
              description: data.errors[0].msg,
              status: "error",
              isClosable: true,
            })

          }} className=' w-40 my-4 hover:bg-black hover:text-black '>Register</Button>
        </div>
      </div>
    </>
  )
}
