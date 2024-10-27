import { Card } from "flowbite-react";
import { Button } from "@chakra-ui/react";

export default function ReactProductCard(props) {
  const {images,productName,productDescription}=props.myproduct
  return (
    <Card className="max-w-sm m-4">
        <img src={images[0]}/>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {productName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {productDescription}
      </p>
    <Button>Update Product</Button>
    </Card>
  );
}
