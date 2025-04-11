import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {FormControl,FormLabel,FormHelperText,Input, Button,useToast} from '@chakra-ui/react'
import { authContext } from '../../contexts/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate()
    const toast = useToast()
    //context
    const auth = useContext(authContext)

    //states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <div className="p-12 text-white bg-black">
                <div className="p-12 m-20 bg-sky-800 rounded-2xl">
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
                            setPassword(e.target.value)
                        }} value={password} />
                    </FormControl>

                    <Button backgroundColor='#000000' onClick={async () => {
                        const data = await auth.getMelogin(email, password)
                        if (!data.errors) {
                            setTimeout(() => {
                                navigate("/")
                            }, 1500);
                            return toast({
                                title: 'You have been logged in.',
                                description: "We've created your account for you.",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            })
                        }
                        toast({
                            title: 'Error logging you in.',
                            description: data.errors[0].msg,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    }} className='w-40 my-4 text-white '>Register</Button>
                </div>

            </div>

        </>
    )
}
