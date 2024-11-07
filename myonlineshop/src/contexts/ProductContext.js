import { createContext, useState } from "react";
import React from 'react'


export const productAPI = createContext(undefined)


export function ProductContext(props) {
  const [productInfo, setProductInfo] = useState({ data: [] })
  const [currentProduct, setCurrentProduct] = useState([])
  const [createProductInfo, setCreateProductInfo] = useState({ loader: false })
  const [category, setCategory] = useState("Electronics")
  const [orderProducts, setOrderProducts] = useState([])
  const [productCart, setProductCart] = useState([])
  const [updateProduct, setUpdateProduct] = useState([])
  const [wishList, setWishList] = useState([])
  //will get all the products
  const getProducts = async () => {
    let url = "https://instacart-9fh4.onrender.com/api/getallproducts?page=0"
    let response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setProductInfo({ data: data })

  }

  //get the product,the id will be defined
  const getCurrentProduct = async (productid) => {
    if (!productid) {
      return console.log("PLease enter the id")
    }
    const url = `https://instacart-9fh4.onrender.com/api/getsingleproduct/${productid}`
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setCurrentProduct(data.product)
    console.log(currentProduct)
  }

  //FormData is phenomenol function which does not require content type header
  //this will create  the product
  const createProduct = async (file, productName, productCategory, productPrice, productDescription) => {
    const formDataToSend = new FormData();
    for (let i = 0; i < file.length; i++) {
      formDataToSend.append('file', file[i]);
    }
    formDataToSend.append('productName', productName);  // Append the file
    formDataToSend.append('productCategory', productCategory);  // Append the file
    formDataToSend.append('productPrice', productPrice);  // Append the file
    formDataToSend.append('productDescription', productDescription);  // Append the file
    let url = "https://instacart-9fh4.onrender.com/api/createproduct"
    let response = await fetch(url, {
      method: "POST",
      body: formDataToSend,
      headers: {
        "auth-token": localStorage.getItem("sellerId")
      }
    })
    const data = await response.json()
    return data
  }


  //WHY I WAS NOT USING RETURN STATEMENT TILL NOW,WHY??
  //this will get the product be Categories
  const getProductsByCategory = async (category, page) => {
    let url = `https://instacart-9fh4.onrender.com/api/getproductbycategory?category=${category}&page=${page}`
    const response = await fetch(url, {
      method: "GET"
    })
    const data = await response.json()
    return data
  }

  const getProductsbySeller = async () => {
    let url = "https://instacart-9fh4.onrender.com/api/sellerinfo"
    const response = await fetch(url, {
      methods: "GET",
      headers: {
        "auth-token": localStorage.getItem("sellerId")
      }
    })
    return await response.json()
  }

  const createMeAOrder = async (orderItems, fullName, address, city
    , postalCode, country, itemsPrice, taxPrice
    , shippingPrice, totalPrice) => {
    try {
      let url = "https://instacart-9fh4.onrender.com/api/createorder"
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          orderItems, fullName, address, city
          , postalCode, country, itemsPrice, taxPrice
          , shippingPrice, totalPrice
        }),
        headers: {
          "auth-token": localStorage.getItem("userId"),
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      return error
    }
  }

  const UpdateSellerProduct = async (file, images, productName, productDescription, productPrice, productCategory, productId) => {
    const formDataToSend = new FormData();
    for (let i = 0; i < file.length; i++) {
      formDataToSend.append('file', file[i]);
    }
    formDataToSend.append('productName', productName);  // Append the file
    formDataToSend.append('productCategory', productCategory);  // Append the file
    formDataToSend.append('productPrice', productPrice);  // Append the file
    formDataToSend.append('productDescription', productDescription);  // Append the file
    formDataToSend.append('images', images)
    formDataToSend.append("productId", productId)
    const url = "https://instacart-9fh4.onrender.com/api/updateorder"
    const response = await fetch(url, {
      method: "POST",
      // headers:{
      //   "content-type":"application/json"
      // },
      body: formDataToSend
      // body:JSON.stringify({productName,productDescription,productCategory,productPrice,productId})
    })
    const data = await response.json()
    return data
  }

  const deleteProduct = async (productId) => {
    try {
      const url = "https://instacart-9fh4.onrender.com/api/deleteproduct"
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <productAPI.Provider value={{
      getProductsByCategory,
      getProducts,
      productInfo,
      setCreateProductInfo,
      getCurrentProduct,
      currentProduct,
      setCurrentProduct,
      createProduct,
      createProductInfo,
      getProductsbySeller,
      category,
      setCategory,
      orderProducts,
      setOrderProducts,
      productCart,
      setProductCart,
      createMeAOrder,
      UpdateSellerProduct,
      updateProduct,
      setUpdateProduct,
      deleteProduct,
      wishList,
      setWishList
    }}>
      {props.children}
    </productAPI.Provider>
  )
}
