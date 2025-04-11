import React, { useContext, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { FileInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom'
import { productAPI } from '../../contexts/ProductContext'




export default function FileUpload() {
  const toast = useToast()
  const navigate = useNavigate()
  const productContext = useContext(productAPI)
  const [imagePreview, setImagePreview] = useState([]);
  const [file, setFile] = useState([])
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [loader, setLoader] = useState(false)
  const emptyFeilds = () => {
    setProductName("")
    setProductCategory("")
    setProductDescription("")
    setProductPrice("")
  }

  const ProgressBar=()=>{

  }

  return (
    <>
      <p className='p-8 text-2xl text-center'>Create a Product</p>
      <div className="flex flex-col justify-center p-2 m-2 border">
        <FileInput type="file" name="file" className='p-2 my-4 form-control-file' multiple onChange={(e) => {
          //Waah chatgpt wah ,kya baat hai URL.createObjectURL helped in image Preview
          const files = Array.from(e.target.files)
          setFile(e.target.files);
          console.log(files)
          const previewUrls = files.map((file) => URL.createObjectURL(file));
          setImagePreview(previewUrls); // For preview
          console.log(previewUrls)
        }} />
        <div className="flex grid flex-col grid-cols-4 xl:flex xl:flex-row xl:">
          {imagePreview.map((e) => {
            return <>
              <div className="flex flex-col">
                <img src={e} className='w-24 mx-2 my-2' />
              </div>
            </>
          })}
        </div>

        <Input placeholder='product Name ' className='p-4 my-4 border' onChange={(e) => {
          setProductName(e.target.value)
        }} value={productName}></Input>
        <Select placeholder='Select Category' size='md' onChange={(e) => {
          setProductCategory(e.target.value)
        }} value={productCategory}>
          <option value='Electronics'>Electronics</option>
          <option value='Clothes'>Clothes</option>
          <option value='Grocery'>Grocery</option>
          <option value='Stationary'>Stationary</option>
          <option value='Education'>Education</option>
          <option value='Pharmacy'>Pharmacy</option>
          <option value='Others'>Others</option>
        </Select>
        <Input placeholder='product Price ' className='p-4 my-4 border' onChange={(e) => {
          setProductPrice(e.target.value)
        }} value={productPrice}></Input>
        <Textarea placeholder='product Description ' className='p-4 my-4 border' onChange={(e) => {
          setProductDescription(e.target.value)
        }} size='xl' value={productDescription} />
        <Button onClick={async () => {
          setLoader(true)
          const data = await productContext.createProduct(file, productName, productCategory, productPrice, productDescription)
          setLoader(false)
          emptyFeilds()
          setTimeout(() => {
            navigate("/sellerdashboard")
          }, 1500);
          toast({
            title: 'Product Created',
            description: "We've created your product for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          console.log(data)
        }} disabled={loader}>Upload   {loader ? <Spinner /> : ""}</Button>

      </div>

    </>


  )
}
