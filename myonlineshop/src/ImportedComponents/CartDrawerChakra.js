import React, { useContext } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactCardForCart from './ReactCardForCart'
import LoginModal from './LoginModal'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input
} from '@chakra-ui/react'
import { productAPI } from '../contexts/ProductContext'
import { authContext } from '../contexts/AuthContext'


export default function CartDrawerChakra(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const cartInfo = useContext(productAPI)
    const userDetails = useContext(authContext)
    const navigate = useNavigate()

    return (
        <>
            <Button href="#" ref={btnRef} colorScheme='teal' onClick={onOpen} className={props.className}>
                Cart
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your cart</DrawerHeader>

                    <DrawerBody className=''>
                        <>
                            {cartInfo.productCart.length == 0 ? <>
                                <div className="flex justify-center">
                                    <p className='text-center text-3xl my-20'>Your cart is empty</p>
                                    <Link to="/" className='my-20 mx-4'><Button>Order something</Button></Link>
                                </div>

                            </> : <>
                                <div className="">
                                    {cartInfo.productCart.map((e) => {
                                        return <>
                                            <div className="m-2">
                                                <ReactCardForCart product={e} />
                                            </div>
                                        </>
                                    })}
                                </div>
                                

                            </>}

                        </>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => {
                            cartInfo.setOrderProducts(cartInfo.productCart)
                            navigate("/createorder")
                            onClose()
                        }}>Checkout</Button>
                        
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}



