import { useContext } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../contexts/ProductContext";
import { CardMedia,Card,Button,CardContent,Typography,CardActions } from "@mui/material";

export default function CategoryPageProductCard(props) {
    const productContext = useContext(productAPI)
    const { productName, productPrice, images,_id,productDescription } = props.data
    return (
        <Card  className="bg-slate-800 border rounded mx-2 my-2">
        <CardMedia
          sx={{ height: 140 }}
          image={images[0]}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {productDescription.slice(0,100)}...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" component={Link} to="/product">Buy</Button>
          <Button size="small" variant="outlined">Add to cart</Button>
        </CardActions>
      </Card>
        // <Card className="m-4">
        //     <div className="flex justify-between">
        //         <div className="">
        //             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //                 {productName}
        //             </h5>
        //             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //                 {productPrice}
        //             </h5>
        //             {/* <p className="font-normal text-gray-700 dark:text-gray-400 max-w-48">
        //                 {productDescription}
        //             </p> */}
        //         </div>
        //         <div className="">
        //             <img src={images[0]} className="w-40"/>
        //         </div>
        //     </div>

        //     <Link to="/product" onClick={() => {
        //     productContext.setCurrentProduct(props.data)
        //   }}><Button>
        //         Buy now
        //         <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //             <path
        //                 fillRule="evenodd"
        //                 d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        //                 clipRule="evenodd"
        //             />
        //         </svg>
        //     </Button></Link>
        // </Card>
    );
}
