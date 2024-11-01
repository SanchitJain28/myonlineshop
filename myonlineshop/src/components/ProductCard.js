import React, { useContext, useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import { Card, Rating } from "flowbite-react";
import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function ProductCard(props) {
  const productContext = useContext(productAPI)
  const { productName, productDescription, images, _id } = props.data
  const { wishList, setWishList,setCurrentProduct } = productContext
  useEffect(() => {}, [wishList])

  return (
    <>
      <Card className="mx-2 my-2 p-0">
        <CardMedia
          sx={{ height: 140 }}
          image={images[0]}
          title="green iguana"
        />
        <CardContent className="p-0 m-0 h-32 xl:h-32">
          <Typography gutterBottom variant="p" component="div" className="text-xl">
            {productName.length>20?productDescription.slice(0, 20)+"...":productName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {productDescription.length>75?productDescription.slice(0, 75)+"...":productDescription}
          </Typography>
        </CardContent>
        <CardActions className="p-0 m-0 py-4">
          <Button size="small" variant="outlined" onClick={()=>{
            setCurrentProduct(props.data)
          }} component={Link} to="/product">Buy</Button>
          {wishList.map((e) => {
            return e._id
          }).indexOf(_id) !== -1 ? <>
            <Button size="small" className='' onClick={(e) => {
             const updatedWishList = wishList.filter((e) => {
                return e._id!==_id
              })
              setWishList(updatedWishList)
            }} ><FavoriteIcon /></Button>
          </> : <>
            <Button size="small" className='' onClick={() => {
              setWishList([...productContext.wishList, props.data])
            }}><FavoriteBorderIcon /></Button>
          </>}

        </CardActions>
      </Card>
    </>
  )
}
