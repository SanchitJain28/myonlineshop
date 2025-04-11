import React, { useContext, useState } from 'react'
import {Modal,ModalOverlay,Button,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure,Input,useToast,FormControl,FormLabel,FormHelperText} from '@chakra-ui/react'
import { authContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function ReactModal() {
    const toast = useToast()
    const navigate=useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[close,setClose]=useState(onClose)
    const auth = useContext(authContext)
  return (
    <>
          <Button onClick={onOpen}>Login</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      {/* <ModalCloseButton /> */}
      <ModalBody>
        {/* <Lorem count={2} /> */}
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
                            setClose(onClose)
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
                    }} className='text-white w-40 my-4 '>Register</Button>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  
  )
}
