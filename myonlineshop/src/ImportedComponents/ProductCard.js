import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { productAPI } from "../contexts/ProductContext";
import { DeleteModal } from "./DeleteToast";
import { Button } from "@mui/material";


export default function ReactProductCard(props) {
  const productDetails=useContext(productAPI)
  const {images,productName,productDescription,_id}=props.myproduct
  return (
    <Card className="m-2">
        <img src={images[0]} className="w-24"/>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {productName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {productDescription}
      </p>
    <Button onClick={()=>{
      productDetails.setUpdateProduct(props.myproduct)
    }} component={Link} to="/updateproduct" variant="outlined">Update Product</Button>
    {/* <Button onClick={async()=>{
      // const data=await productDetails.deleteProduct(_id)
      // console.log(data)

    }}>DELETE PRODUCT</Button> */}
    <DeleteModal myproduct={props.myproduct}/>
    </Card>
  );
}
