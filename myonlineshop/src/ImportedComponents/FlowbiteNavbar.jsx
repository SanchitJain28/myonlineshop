import { useToast } from "@chakra-ui/react";
import {  Dropdown, Navbar } from "flowbite-react";
import { useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { productAPI } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import * as React from 'react';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginModal from "../components/UI/LoginModal";


export default function FlowbiteNavbar() {
    const auth = useContext(authContext)
    const product = useContext(productAPI)
    useEffect(() => {

    }, [auth.loginDetails])
    return (
        <Navbar fluid rounded className="">
            <Navbar.Brand>
                <Link to="/" className="mx-2"><LocalMallIcon/></Link>
                <Dropdown label="Categories" inline className="">
                    <Link to="/categorypage" onClick={() => { product.setCategory("Electronics") }}><Dropdown.Item>Electronics</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Grocery") }}><Dropdown.Item>Grocery</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Clothes") }}> <Dropdown.Item>Clothes</Dropdown.Item></Link>
                    <Link to="/categorypage" onClick={() => { product.setCategory("Stationary") }}>  <Dropdown.Item>Stationary</Dropdown.Item></Link>
                    {/* <Button variant="contained">Hello world</Button> */}
                </Dropdown>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {auth.loginDetails ? <></> : <>
                    <LoginModal className="mx-8" />
                </>}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="mb-4">
                <RegisterModal />
                <p href="#">About us</p>
                <p href="#">Contact</p>
                {/* <CartDrawerChakra className="" /> */}
            </Navbar.Collapse>
        </Navbar>

    );
}
