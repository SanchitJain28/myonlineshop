import React, { useContext, useEffect } from 'react'
import { productAPI } from '../contexts/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function ProductCard(props) {
  const navigate=useNavigate()
  const productContext = useContext(productAPI)
  const { productName, productDescription, images, _id } = props.data
  const { wishList, setWishList, setCurrentProduct } = productContext
  useEffect(() => { }, [wishList])

  return (
    <>
      <div className="shadow shadow-cyan/20 mx-2 my-2 p-0 border border-zinc-400 rounded-lg max-w-[200px] h-[400px]">
        <img src={images[0]} className='lg:h-[240px] h-[160px]  m-auto'/>
        {/* <CardMedia
          sx={{ height: 140 }}
          image={images[0]}
          title="green iguana"
        /> */}
        <div id="productdata " className='px-4 pt-2'>
          <p className="text font-mono font-bold">
            {productName.length > 15 ? productDescription.slice(0, 15) + "..." : productName}
          </p>
          <p className='font-sans lg:text-lg text-sm'>
            {productDescription.length > 75 ? productDescription.slice(0, 75) + "..." : productDescription}
          </p>
        </div>

        <div id="action" className='px-4 py-4'>
          <button className='bg-blue-500 rounded-lg mr-4 py-2 px-4 text-white' onClick={() => {
            setCurrentProduct(props.data)
            navigate("/product")
          }} component={Link} to="/product">Buy</button>
          {wishList.map((e) => {
            return e._id
          }).indexOf(_id) !== -1 ? <>
            <button size="small" className='' onClick={(e) => {
              const updatedWishList = wishList.filter((e) => {
                return e._id !== _id
              })
              setWishList(updatedWishList)
            }} ><FavoriteIcon /></button>
          </> : <>
            <button size="small" className='' onClick={() => {
              setWishList([...productContext.wishList, props.data])
            }}><FavoriteBorderIcon /></button>
          </>}
        </div>
      </div>
    </>
  )
}
