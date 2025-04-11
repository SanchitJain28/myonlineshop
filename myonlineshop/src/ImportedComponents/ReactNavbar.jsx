import React, { useContext, useEffect } from 'react'
import { Button, MegaMenu, Navbar, Dropdown, Avatar } from 'flowbite-react';
import { Button as ChakraButton, useToast,useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { productAPI } from '../contexts/ProductContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { authContext } from '../contexts/AuthContext';
import CartDrawerChakra from './CartDrawerChakra';



export default function ReactNavbar() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useContext(authContext)


  const product = useContext(productAPI)
  useEffect(() => {

  }, [auth.loginDetails])
  return (
    <>
      <MegaMenu className='bg-black text-white flex justify-between align-center'>
        <div className="mx-auto flex max-w-screen-xl flex-wrap md:space-x-8 ">
          <Link to="/" className='mt-4'>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">InstaCart</span>
          </Link>
          <div className="order-2 hidden items-center md:flex">
            {/* <Link to="/login" className='mx-4'>Login</Link> */}
            <div className="mx-4">
              {auth.loginDetails ? <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User settings" img="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{auth.loginDetails.name}</span>
                    <span className="block truncate text-sm font-medium">{auth.loginDetails.email}</span>
                  </Dropdown.Header>
                  <Dropdown.Item><Link to="/userdashboard">Dashboard</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => {
                    auth.setLoginDetails(null)
                    toast({
                      title: `You have been logged out`,
                      status: "warning",
                      isClosable: true,
                    })
                  }}>Sign out</Dropdown.Item>
                </Dropdown>
              </> : <>
                <div className="flex justify-between">
                  <LoginModal msg="login" className="mx-8" />
                  <RegisterModal />
                </div>
              </>}
            </div>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className='text-white mb-4'>
              <MegaMenu.Dropdown toggle={<>Categories</>} className='text-black'>
                <ul className="grid grid-cols-2">
                  <div className="space-y-4 p-4">
                    <li>
                      <Link to="/categorypage">Electronics</Link>
                    </li>
                    <li>
                      <Link to="/categorypage" onClick={() => { product.setCategory("Grocery") }}>Grocery</Link>
                    </li>
                    <li>
                      <Link to="/categorypage" onClick={() => { product.setCategory("Clothes") }}>Clothes</Link>
                    </li>

                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Link>
            <Link to="/" active>
              Home
            </Link>
            <Link to="/becomeaseller">Become a seller</Link>
            <CartDrawerChakra/>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
    </>
  )
}
