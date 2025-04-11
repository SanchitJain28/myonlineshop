import React, { useContext, useEffect } from 'react'
import { productAPI } from '../../contexts/ProductContext'
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
      <div className="p-0 mx-1 border rounded-lg border-zinc-400 ">
        <img src={images[0]} className='m-auto w-60 h-60'/>
        <div id="productdata " className='px-3 pt-2'>
          <p className="mt-4 mb-2 font-sans text-xl font-bold text">
            {productName.length > 15 ? productDescription.slice(0, 15) + "..." : productName}
          </p>
          <p className='font-sans text-sm lg:text-lg'>
            {productDescription.length > 75 ? productDescription.slice(0, 75) + "..." : productDescription}
          </p>
        </div>

        <div id="action" className='px-3 py-4'>
          <button className='px-4 py-2 mr-4 text-white bg-blue-500 rounded-lg' onClick={() => {
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
