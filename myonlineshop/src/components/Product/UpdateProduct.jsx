import React, { useContext, useState } from 'react'
import { Input, useToast } from '@chakra-ui/react'
import { Button, FileInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { productAPI } from '../../contexts/ProductContext'

export default function UpdateProduct() {
    const navigate = useNavigate()
    const toast = useToast()
    const productDetails = useContext(productAPI)
    console.log(productDetails.updateProduct)
    const { images, productName, productDescription, productPrice, productCategory, _id } = productDetails.updateProduct
    const [newProductName, newSetProductName] = useState(productName)
    const [newProductPrice, newSetProductPrice] = useState(productPrice)
    const [newProductDescription, newSetProductDescription] = useState(productDescription)
    const [newProductCategory, newSetProductCategory] = useState(productCategory)
    const [newProductImages, setNewProductImages] = useState(images.filter((e) => { return e != null }))
    const [loading,setLoading]=useState(false)
    const [file, setFile] = useState([])
    return (
        <>
            <div className="flex flex-col">
                <div className="flex">
                    {images && newProductImages.map((e) => {
                        if (e) {
                            return <>
                                <img src={e} className='w-24' />
                                <Button onClick={() => {
                                    let myNewProductImages = newProductImages.filter((f) => {
                                        return f !== e
                                    })
                                    setNewProductImages(myNewProductImages)
                                }}>Remove</Button>
                            </>
                        }
                    })}
                </div>
                <FileInput type="file" name="file" className='p-2 my-4 form-control-file' multiple onChange={(e) => {
                    //Waah chatgpt wah ,kya baat hai URL.createObjectURL helped in image Preview
                    //   const files = Array.from(e.target.files)
                    setFile(e.target.files);
                    //   console.log(files)
                    //   const previewUrls = files.map((file) => URL.createObjectURL(file));
                    //   setImagePreview(previewUrls); // For preview
                    //   console.log(previewUrls)
                }} />
                <Input onChange={(e) => {
                    newSetProductName(e.target.value)
                }} value={newProductName} />
                <Input onChange={(e) => {
                    newSetProductPrice(e.target.value)
                }} value={newProductPrice} />
                <Input onChange={(e) => {
                    newSetProductDescription(e.target.value)
                }} value={newProductDescription} />
                <Input onChange={(e) => {
                    newSetProductCategory(e.target.value)
                }} value={newProductCategory} />
                <Button onClick={async () => {
                    setLoading(true)
                    console.log(newProductImages)
                    const data = await productDetails.UpdateSellerProduct(file, newProductImages, newProductName, newProductDescription, newProductPrice, newProductCategory, _id)
                    if (!data.errors) {
                        navigate("/sellerdashboard")
                        return toast({
                            title: `PRODUCT UPDATED`,
                            status: "success",
                            isClosable: true,
                        })
                    }
                    console.log(data)
                }} disabled={loading}>UPDATE {loading?<Spinner/>:<></>}</Button>
            </div>

        </>
    )
}
