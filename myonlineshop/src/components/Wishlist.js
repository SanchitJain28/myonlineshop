import { Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Card } from 'flowbite-react'
import React, { useContext, useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Wishlist() {
  const product = useContext(productAPI)
  const { wishList, setWishList } = product
  useEffect(() => { }, [wishList])

  return (
    <>
      <div className="mb-20">
        {wishList.length === 0 ? <>
          <p className='text-center text-xl m-8'>Empty Wishlist</p>
        </> : <>
          {wishList.map((e) => {
            return <>
              <Card className=" border rounded mx-2 my-2">
                <CardMedia
                  sx={{ height: 140 }}
                  image={e.images[0]}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {e.productDescription.slice(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" component={Link} to="/product">Buy</Button>
                  <Button size="small" variant="outlined">Add to cart</Button>
                  <Button size="small" variant="outlined" onClick={(event) => {
                    const updatedWishList = wishList.filter((f) => {
                      return e._id !== f._id
                    })
                    setWishList(updatedWishList)
                  }}><FavoriteIcon /></Button>
                </CardActions>
              </Card>
            </>
          })}
          <div className="flex justify-center">
            <Button variant='contained' className='mx-2 my-2'>Order</Button>

          </div>
        </>}
      </div>
    </>

  )
}
