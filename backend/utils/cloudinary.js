import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

    cloudinary.config({ 
        cloud_name: 'do2d2pclb', 
        api_key: '765617265967851', 
        api_secret: 'AslyGDScICGteRfsS0Wiek85qpc' // Click 'View API Keys' above to copy your API secret
    });
    

    const uploadTest=async()=>{
 // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    }
   const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){return console.log("file not provided")}
        //upload the file on cloudinary
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded
        console.log("file uploades succesfully",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)//removes the locally saved filer
        return null
    }
   }
   export {uploadOnCloudinary,uploadTest}