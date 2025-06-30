import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Card } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import { productAPI } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export default function Wishlist() {
  const product = useContext(productAPI);
  const {
    wishList,
    setWishList,
    productCart,
    setProductCart,
    setOrderProducts,
  } = product;
  useEffect(() => {}, [wishList]);

  return (
    <>
      <div className="mb-20">
        {wishList.length === 0 ? (
          <>
            <p className="m-8 text-xl text-center">Empty Wishlist</p>
          </>
        ) : (
          <>
            {wishList.map((e) => {
              return (
                <>
                  <Card className="mx-2 my-2 border rounded ">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={e.images[0]}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {e.productDescription.slice(0, 100)}...
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to="/product"
                      >
                        Buy
                      </Button>
                      {productCart
                        .map((p) => {
                          return p._id;
                        })
                        .indexOf(e._id) !== -1 ? (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={(event) => {
                              const filteredCart = productCart.filter(
                                (eventCart) => {
                                  return eventCart._id !== e._id;
                                }
                              );
                              setProductCart(filteredCart);
                            }}
                          >
                            Added
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(event) => {
                              setProductCart([...productCart, e]);
                            }}
                          >
                            Add to cart
                          </Button>
                        </>
                      )}

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={(event) => {
                          const updatedWishList = wishList.filter((f) => {
                            return e._id !== f._id;
                          });
                          setWishList(updatedWishList);
                        }}
                      >
                        <FavoriteIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </>
              );
            })}
            <div className="flex justify-center">
              <Button
                variant="contained"
                className="mx-2 my-2"
                component={Link}
                to="/createorder"
                onClick={(event) => {
                  setOrderProducts(wishList);
                }}
              >
                Order
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
