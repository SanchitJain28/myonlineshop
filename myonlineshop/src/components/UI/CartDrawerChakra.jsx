import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { BottomNavigationAction, Button } from "@mui/material";
import ReactCardForCart from "./ReactCardForCart";
import { productAPI } from "../../contexts/ProductContext";

export default function CartDrawerChakra(props) {
  const btnRef = React.useRef();
  const cartInfo = useContext(productAPI);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {/* <p href="#" ref={btnRef} colorScheme='teal' onClick={onOpen} className={props.className}><i class="fa-solid fa-cart-shopping"></i></p> */}
      <BottomNavigationAction
        onClick={onOpen}
        ref={btnRef}
        label="Cartfdsdfs"
        icon={<ShoppingCartIcon />}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your cart</DrawerHeader>

          <DrawerBody className="">
            <>
              {cartInfo.productCart.length === 0 ? (
                <>
                  <div className="flex justify-center">
                    <p className="text-xl text-center ">
                      Empty,order something
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    {cartInfo.productCart.map((e, index) => {
                      return (
                        <div className="m-2" key={index}>
                          <ReactCardForCart product={e} />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outlined" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                cartInfo.setOrderProducts(cartInfo.productCart);
                navigate("/createorder");
                onClose();
              }}
              className="mx-2"
              disabled={cartInfo.productCart.length === 0}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
