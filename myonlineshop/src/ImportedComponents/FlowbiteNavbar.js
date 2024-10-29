import { useToast } from "@chakra-ui/react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { productAPI } from "../contexts/ProductContext";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import CartDrawerChakra from "./CartDrawerChakra";
import RegisterModal from "./RegisterModal";
import * as React from 'react';



export default function FlowbiteNavbar() {
    const toast = useToast()
    const auth = useContext(authContext)


    const product = useContext(productAPI)
    useEffect(() => {

    }, [auth.loginDetails])
    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                <Link to="/"><span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white mx-4">Instacart</span></Link>
                <Dropdown label="Categories" inline className="">
                    <Link to="/categorypage" onClick={() => { product.setCategory("Electronics") }}><Dropdown.Item>Electronics</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Grocery") }}><Dropdown.Item>Grocery</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Clothes") }}> <Dropdown.Item>Clothes</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Stationary") }}>  <Dropdown.Item>Stationary</Dropdown.Item></Link>
                    {/* <Button variant="contained">Hello world</Button> */}
                </Dropdown>
            </Navbar.Brand>
            <div className="flex md:order-2">
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
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        {/* <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item> */}
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
                    <LoginModal msg="login" className="mx-8" />
                </>}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="mb-4">
                <Link to="/"> <p href="#" active>
                    Home
                </p></Link>
                <Link to="/becomeaseller"><p href="#">Become a seller</p></Link>
                <RegisterModal />
                <p href="#">About us</p>
                <p href="#">Contact</p>

                <CartDrawerChakra className="" />



            </Navbar.Collapse>
        </Navbar>
    );
}
