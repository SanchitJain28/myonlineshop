import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactCardForCart from './ReactCardForCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { productAPI } from '../contexts/ProductContext'
import { authContext } from '../contexts/AuthContext'
import { BottomNavigationAction, Button } from '@mui/material'


export default function CartDrawerChakra(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const cartInfo = useContext(productAPI)
    const userDetails = useContext(authContext)
    const navigate = useNavigate()

    return (
        <>
        {/* <p href="#" ref={btnRef} colorScheme='teal' onClick={onOpen} className={props.className}><i class="fa-solid fa-cart-shopping"></i></p> */}
        <BottomNavigationAction onClick={onOpen} ref={btnRef} label="Cartfdsdfs" icon={<ShoppingCartIcon />} />

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
                                    <p className='text-center text-xl '>Empty,order something</p>
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
                        <Button variant='outlined' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='contained' onClick={() => {
                            cartInfo.setOrderProducts(cartInfo.productCart)
                            navigate("/createorder")
                            onClose()
                        }} className='mx-2' disabled={cartInfo.productCart.length == 0}>Checkout</Button>
                        
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}



