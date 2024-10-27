import { Router } from 'express';
import multer from 'multer';
import { uploadOnCloudinary, uploadTest } from '../utils/cloudinary.js';
import { upload } from '../MiddleWare/Multer.js';
import { body, validationResult } from "express-validator";
import { SellerModel as seller } from '../Schemmas/SellerAccountUserSchemma.js';
import { orderModel as order } from '../Schemmas/OrderSchemma.js';
import { UserModel as user } from '../Schemmas/UserSchemma.js';
// Require the Cloudinary library

export const router = Router();
import { getSellerInformation as Sellermiddleware } from '../MiddleWare/sellerAccount.js';
import { ProductModel as Product } from '../Schemmas/ProductSchemmas.js';


//Creating a product
router.post("/api/createproduct", Sellermiddleware, upload.array("file", 10), body("productName").notEmpty().withMessage("Product name cannot be empty")
    , body("productCategory").notEmpty().withMessage("Product Category cannot be empty"),
    body("productPrice").notEmpty().withMessage("Product Price cannot be empty"),
    body("productDescription").notEmpty().withMessage("Product Description cannot be empty"), async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            const images = req.files;
            const productImages = []

            //uploads on cloudinary
            if (!images ||images.length==0) {
              return res.send({ errors: [{msg:"please upload an image"}]})
            }
            for (const image of images) {
                const result = await uploadOnCloudinary(image.path)
                productImages.push(result.url)
            }
            if (!result) {
                res.send({ error: "please upload an image" })
            }
            productImages.push(result.url)


            const product = new Product({
                sellerId: req.seller.sellerid,
                sellerName: req.seller.BusinessName,
                productName: req.body.productName,
                productCategory: req.body.productCategory,
                productCreated: new Date(),
                productPrice: req.body.productPrice,
                productDescription: req.body.productDescription,
                productReviews: "TODO PRODUCT REVIEWS",
                images: productImages
            })
            await product.save()
            res.send({ product: product })
        } catch (error) {
            console.log(error)
        }
    })

router.get("/api/getproducts", Sellermiddleware, async (req, res) => {
    const data = await Product.find({ sellerId: req.seller.sellerid }).populate('sellerId')
    res.send({ data: data })
})
router.get("/api/getallproducts", async (req, res) => {
    const data = await order.find()
    res.send(data)
})

router.get("/api/getproductbycategory", async (req, res) => {
    const { category, page } = req.query

    if (!category || !page) {
        return res.send({ "error": "please select the category and the pageNo" })
    }
    const data = await Product.find({ productCategory: req.query.category }).limit(10).skip(Number(page * 10))

    res.send(data)
    console.log(data.length)
})

//BAS Itna sa tha yaar ,wtf
//we was just struggling on that shit,e.target.files[0]
router.post("/api/upload", upload.array("file", 10), async (req, res) => {
    const images = req.files
    const imagesLinks = []
    console.log(req.body.file, req.files)
    try {
        for (const image of images) {
            const result = await uploadOnCloudinary(image.path)
            imagesLinks.push(result.url)
        }
        console.log("eloo")

    }
    catch (error) {
        console.log(error)
    }

})

router.get("/api/getsingleproduct/:productid", async (req, res) => {
    const { productid } = req.params
    if (!productid) {
        return res.send({ error: "please enter the product id" })
    }
    const product = await Product.findById(productid)
    res.send({ status: "true", product: product })

})

router.get("/api/sellerproducts", Sellermiddleware, async (req, res) => {
    try {
        const { sellerid } = req.seller;
        if (!sellerid) {
            return res.send({ errors: [{ msg: "SellerID not Provided" }] })
        }
        console.log(sellerid)
        const findProducts = await Product.find({ sellerId: sellerid })
        if (findProducts.length == 0) {
            return res.send({ msg: "You dont have any product uploaded", data: req.seller })
        }
        res.send({ findProducts, data: req.seller })
    } catch (error) {
        console.log(error)
    }
})

router.post("/updateorder",async(req,res)=>{

})

router.get("/uploadproduct",async(req,res)=>{
    await order.create([
        {
          "shippingAddress": {
            "fullName": "Sanchit jain",
            "address": "A1-154,Sushant Lok 2,sector 55,gurgaon",
            "city": "Gurgaon",
            "postalCode": "122011",
            "country": "India"
          },
          "_id": "6713d747b16eddfee3ba2437",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713d747b16eddfee3ba2438"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713d747b16eddfee3ba2439"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713d747b16eddfee3ba243a"
            },
            {
              "product": "671294153196ccfaf3192ea9",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 999,
              "_id": "6713d747b16eddfee3ba243b"
            },
            {
              "product": "67138acefc3bc38c501fbaee",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 8999,
              "_id": "6713d747b16eddfee3ba243c"
            },
            {
              "product": "67138afcfc3bc38c501fbaf1",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 9999.99,
              "_id": "6713d747b16eddfee3ba243d"
            },
            {
              "product": "67138b39fc3bc38c501fbaf8",
              "seller": "67138b24fc3bc38c501fbaf5",
              "quantity": 1,
              "price": 19999,
              "_id": "6713d747b16eddfee3ba243e"
            }
          ],
          "itemsPrice": 40728.99,
          "taxPrice": 3258.3192,
          "shippingPrice": 11,
          "totalPrice": 43998.309199999996,
          "isPaid": false,
          "paidAt": "2024-10-19T15:59:03.886Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T15:59:03.886Z",
          "createdAt": "2024-10-19T15:59:03.886Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "dsad",
            "address": "asd",
            "city": "asd",
            "postalCode": "sad",
            "country": "as"
          },
          "_id": "6713d83fb16eddfee3ba2440",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713d83fb16eddfee3ba2441"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713d83fb16eddfee3ba2442"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713d83fb16eddfee3ba2443"
            },
            {
              "product": "671294153196ccfaf3192ea9",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 999,
              "_id": "6713d83fb16eddfee3ba2444"
            },
            {
              "product": "67138acefc3bc38c501fbaee",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 8999,
              "_id": "6713d83fb16eddfee3ba2445"
            },
            {
              "product": "67138afcfc3bc38c501fbaf1",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 9999.99,
              "_id": "6713d83fb16eddfee3ba2446"
            },
            {
              "product": "67138b39fc3bc38c501fbaf8",
              "seller": "67138b24fc3bc38c501fbaf5",
              "quantity": 1,
              "price": 19999,
              "_id": "6713d83fb16eddfee3ba2447"
            }
          ],
          "itemsPrice": 40728.99,
          "taxPrice": 3258.3192,
          "shippingPrice": 11,
          "totalPrice": 43998.309199999996,
          "isPaid": false,
          "paidAt": "2024-10-19T16:03:11.989Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T16:03:11.989Z",
          "createdAt": "2024-10-19T16:03:11.989Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "dsad",
            "address": "asd",
            "city": "asd",
            "postalCode": "sad",
            "country": "as"
          },
          "_id": "6713d9d2b16eddfee3ba2449",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713d9d2b16eddfee3ba244a"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713d9d2b16eddfee3ba244b"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713d9d2b16eddfee3ba244c"
            },
            {
              "product": "671294153196ccfaf3192ea9",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 999,
              "_id": "6713d9d2b16eddfee3ba244d"
            },
            {
              "product": "67138acefc3bc38c501fbaee",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 8999,
              "_id": "6713d9d2b16eddfee3ba244e"
            },
            {
              "product": "67138afcfc3bc38c501fbaf1",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 9999.99,
              "_id": "6713d9d2b16eddfee3ba244f"
            },
            {
              "product": "67138b39fc3bc38c501fbaf8",
              "seller": "67138b24fc3bc38c501fbaf5",
              "quantity": 1,
              "price": 19999,
              "_id": "6713d9d2b16eddfee3ba2450"
            }
          ],
          "itemsPrice": 40728.99,
          "taxPrice": 3258.3192,
          "shippingPrice": 11,
          "totalPrice": 43998.309199999996,
          "isPaid": false,
          "paidAt": "2024-10-19T16:09:54.805Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T16:09:54.805Z",
          "createdAt": "2024-10-19T16:09:54.805Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "dsad",
            "address": "asd",
            "city": "asd",
            "postalCode": "sad",
            "country": "as"
          },
          "_id": "6713d9ecb16eddfee3ba2452",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713d9ecb16eddfee3ba2453"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713d9ecb16eddfee3ba2454"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713d9ecb16eddfee3ba2455"
            },
            {
              "product": "671294153196ccfaf3192ea9",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 999,
              "_id": "6713d9ecb16eddfee3ba2456"
            },
            {
              "product": "67138acefc3bc38c501fbaee",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 8999,
              "_id": "6713d9ecb16eddfee3ba2457"
            },
            {
              "product": "67138afcfc3bc38c501fbaf1",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 9999.99,
              "_id": "6713d9ecb16eddfee3ba2458"
            },
            {
              "product": "67138b39fc3bc38c501fbaf8",
              "seller": "67138b24fc3bc38c501fbaf5",
              "quantity": 1,
              "price": 19999,
              "_id": "6713d9ecb16eddfee3ba2459"
            }
          ],
          "itemsPrice": 40728.99,
          "taxPrice": 3258.3192,
          "shippingPrice": 11,
          "totalPrice": 43998.309199999996,
          "isPaid": false,
          "paidAt": "2024-10-19T16:10:20.388Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T16:10:20.388Z",
          "createdAt": "2024-10-19T16:10:20.388Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "fds",
            "address": "fdsf",
            "city": "fsdfds",
            "postalCode": "dsf",
            "country": "fsdf"
          },
          "_id": "6713d9fcb16eddfee3ba245b",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713d9fcb16eddfee3ba245c"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713d9fcb16eddfee3ba245d"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713d9fcb16eddfee3ba245e"
            },
            {
              "product": "671294153196ccfaf3192ea9",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 999,
              "_id": "6713d9fcb16eddfee3ba245f"
            },
            {
              "product": "67138acefc3bc38c501fbaee",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 8999,
              "_id": "6713d9fcb16eddfee3ba2460"
            },
            {
              "product": "67138afcfc3bc38c501fbaf1",
              "seller": "670fdbd293e405374230fd4a",
              "quantity": 1,
              "price": 9999.99,
              "_id": "6713d9fcb16eddfee3ba2461"
            },
            {
              "product": "67138b39fc3bc38c501fbaf8",
              "seller": "67138b24fc3bc38c501fbaf5",
              "quantity": 1,
              "price": 19999,
              "_id": "6713d9fcb16eddfee3ba2462"
            }
          ],
          "itemsPrice": 40728.99,
          "taxPrice": 3258.3192,
          "shippingPrice": 11,
          "totalPrice": 43998.309199999996,
          "isPaid": false,
          "paidAt": "2024-10-19T16:10:36.836Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T16:10:36.836Z",
          "createdAt": "2024-10-19T16:10:36.836Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "fgd",
            "address": "fd",
            "city": "gf",
            "postalCode": "dg",
            "country": "gfdgdf"
          },
          "_id": "6713dc178ba6b259259c5baa",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293d43196ccfaf3192ea0",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 299,
              "_id": "6713dc178ba6b259259c5bab"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713dc178ba6b259259c5bac"
            }
          ],
          "itemsPrice": 433,
          "taxPrice": 34.64,
          "shippingPrice": 40,
          "totalPrice": 507.64,
          "isPaid": false,
          "paidAt": "2024-10-19T16:19:35.216Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T16:19:35.216Z",
          "createdAt": "2024-10-19T16:19:35.216Z",
          "__v": 0
        },
        {
          "shippingAddress": {
            "fullName": "dfs",
            "address": "fds",
            "city": "fds",
            "postalCode": "fdsfdsf",
            "country": "dsfsfsdfsd"
          },
          "_id": "6713e948e37e73a575b0899d",
          "user": "671386ac16ff90716bc999a0",
          "orderItems": [
            {
              "product": "671293323196ccfaf3192e94",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 199,
              "_id": "6713e948e37e73a575b0899e"
            },
            {
              "product": "671293c13196ccfaf3192e9d",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 134,
              "_id": "6713e948e37e73a575b0899f"
            },
            {
              "product": "671293ea3196ccfaf3192ea3",
              "seller": "671292133196ccfaf3192e8f",
              "quantity": 1,
              "price": 399,
              "_id": "6713e948e37e73a575b089a0"
            }
          ],
          "itemsPrice": 732,
          "taxPrice": 58.56,
          "shippingPrice": 40,
          "totalPrice": 830.56,
          "isPaid": false,
          "paidAt": "2024-10-19T17:15:52.690Z",
          "isDelivered": false,
          "deliveredAt": "2024-10-19T17:15:52.690Z",
          "createdAt": "2024-10-19T17:15:52.690Z",
          "__v": 0
        }
      ])
      res.send("succesful")
})