import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { productAPI } from "../../contexts/ProductContext";
import { Card as FlowbiteCard } from "flowbite-react";

export default function ReactCardForCart(props) {
  const {removeFromCart} = useContext(productAPI);
  const { productName, productDescription, productPrice, images, _id } =
    props.product;
  return (
    <FlowbiteCard>
      <div className="flex justify-between">
        <div className="">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {productName}
          </h5>
          <p className="mt-4 font-normal text-gray-700 dark:text-gray-400">
            ₹{productPrice}
          </p>
          <Button
            onClick={(e) => {
              removeFromCart(_id);
            }}
            className="my-2 bg-red-700"
          >
            Remove
          </Button>
        </div>
        <div className="">
          <img src={images[0]} className="w-20" />
        </div>
      </div>
    </FlowbiteCard>
  );
}
