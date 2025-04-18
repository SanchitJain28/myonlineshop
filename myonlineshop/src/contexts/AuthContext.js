import { createContext, useState } from "react";
import React from 'react'
import { useDispatch } from "react-redux";
import { UpdateAlert } from "../features/todo/todoSlice";
import { useNavigate } from "react-router-dom";

export const authContext = createContext(null)

export function AuthContext(props) {
  const dispatch = useDispatch()
  const[loginDetails,setLoginDetails]=useState(JSON.parse(localStorage.getItem('loginDetails'))?JSON.parse(localStorage.getItem('loginDetails')):null)
  const[sellerDetails,setSellerDetails]=useState(JSON.parse(localStorage.getItem("sellerDetails"))?JSON.parse(localStorage.getItem("sellerDetails")):null)


  const getMeRegistered = async (email, password,name,phoneNo) => {
    try {
      const url = 'https://instacart-9fh4.onrender.com/api/createuser'
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password,name,phoneNo }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error)
    }
   
  }

  const getMelogin = async (email, password) => {
    try {
      const url = "https://instacart-9fh4.onrender.com/api/loginuser"
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json();
      return data
    } catch (error) {
      console.log(error)
    }

  }
  const createSellerAccount = async (businessName, phoneNo, email, password) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('businessName', businessName)
      formDataToSend.append('phoneNo', phoneNo)
      formDataToSend.append("email", email)
      formDataToSend.append("password", password)

      const url = "https://instacart-9fh4.onrender.com/api/selleraccount"
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ businessName, phoneNo, email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }

  }

  const sellerLogin = async (email, password) => {
    try {
      const url = "https://instacart-9fh4.onrender.com/api/sellerlogin";
    const sellerFormData = new FormData();
    await sellerFormData.append("email", email);
    await sellerFormData.append("password", password);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({email,password}), // Send FormData object as the request body
      headers:{
        "Content-Type": "application/json"
      }
    });
    const data = await response.json()
    return data
    } catch (error) {
      console.log(error)
    }
    
  }

  const getUserInfo=async()=>{
    try {
      const url="https://instacart-9fh4.onrender.com/api/userdetails"
    const response=await fetch(url,{
      method:"GET",
      headers:{
        "auth-token":localStorage.getItem("userId")
      }
    })
    const data=await response.json()
    return data
    } catch (error) {
     console.log(error) 
    }
    
  }
  
  return (
    <authContext.Provider value={{ getMeRegistered, getMelogin, createSellerAccount, sellerLogin,loginDetails,setLoginDetails,getUserInfo,sellerDetails,setSellerDetails }}>
      {props.children}
    </authContext.Provider>
  )
}
