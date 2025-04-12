import React, { useContext, useEffect, useState } from 'react'
import { productAPI } from '../../contexts/ProductContext'
import { Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../contexts/AuthContext'
import Stats from '../UI/Stats'


export default function ProductPage() {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  const productContext = useContext(productAPI)
  const [disabled, setDisabled] = useState(false)

  const { productName, productDescription, productPrice, images, _id } = productContext.currentProduct
  const checkInCart = () => {
    if (productContext.productCart.map((e) => e._id).indexOf(_id) !== -1) {
      setDisabled(true)
    }
  }
  useEffect(() => {
    console.log(productContext.currentProduct)
    checkInCart()
  }, [])

  return (
    <>  <div className="flex flex-col p-24">
      <div className='flex justify-center my-4'>
        <img src={images ? images[0] : "https://i.ytimg.com/vi/z3iKpCNlWU8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDx1Tbs2-3cwiU-zbwE2Ad0z9JHEA"} />
        <div className="flex flex-col pr-20">
          <p className='my-4 font-sans text-3xl'>{productName}</p>
          <p>{productDescription}</p>
          <p className='text-2xl font-bold'>{productPrice}</p>
          {auth.loginDetails?<>
            <Link to="/createorder" onClick={() => {
            productContext.setOrderProducts([productContext.currentProduct])
            navigate("/createorder")
          }}><Button className='w-40 my-2'>Buy now</Button></Link>
          </>:<>
          </>}

          <Button className='w-40 my-2' onClick={() => {
            setDisabled(true)
            productContext.setProductCart([...productContext.productCart, productContext.currentProduct])
          }} disabled={disabled}>{disabled ? "Already in cart" : "Add to cart"}</Button>

        </div>
      </div>
      <Stats lastMonthOrders={100} userClicked={90291} />
    </div>


    </>

  )
}

