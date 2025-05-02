import { Router } from "express";
import multer from "multer";
import { uploadOnCloudinary, uploadTest } from "../utils/cloudinary.js";
import { upload } from "../MiddleWare/Multer.js";
import { body, validationResult } from "express-validator";
import { SellerModel as seller } from "../Schemmas/SellerAccountUserSchemma.js";
import { orderModel as order } from "../Schemmas/OrderSchemma.js";
import { UserModel as user } from "../Schemmas/UserSchemma.js";
// Require the Cloudinary library

export const router = Router();
import { getSellerInformation as Sellermiddleware } from "../MiddleWare/sellerAccount.js";
import { ProductModel as Product } from "../Schemmas/ProductSchemmas.js";

//Creating a product
router.post(
  "/api/createproduct",
  Sellermiddleware,
  upload.array("file", 10),
  body("productName").notEmpty().withMessage("Product name cannot be empty"),
  body("productCategory")
    .notEmpty()
    .withMessage("Product Category cannot be empty"),
  body("productPrice").notEmpty().withMessage("Product Price cannot be empty"),
  body("productDescription")
    .notEmpty()
    .withMessage("Product Description cannot be empty"),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const images = req.files;
      const productImages = [];

      //uploads on cloudinary
      if (!images || images.length == 0) {
        return res.send({ errors: [{ msg: "please upload an image" }] });
      }
      for (const image of images) {
        const result = await uploadOnCloudinary(image.path);
        productImages.push(result.url);
      }
      if (!result) {
        res.send({ error: "please upload an image" });
      }
      productImages.push(result.url);

      const product = new Product({
        sellerId: req.seller.sellerid,
        sellerName: req.seller.BusinessName,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        productCreated: new Date(),
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productReviews: "TODO PRODUCT REVIEWS",
        images: productImages,
      });
      await product.save();
      res.send({ product: product });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/api/getproducts", Sellermiddleware, async (req, res) => {
  const data = await Product.find({ sellerId: req.seller.sellerid }).populate(
    "sellerId"
  );
  res.send({ data: data });
});
router.get("/api/getallproducts", async (req, res) => {
  const data = await order.find();
  res.send(data);
});

router.get("/api/getproductbycategory", async (req, res) => {
  const { category, page } = req.query;

  if (!category || !page) {
    return res.send({ error: "please select the category and the pageNo" });
  }
  const data = await Product.find({ productCategory: req.query.category })
    .limit(10)
    .skip(Number(page * 10));

  res.send(data);
  console.log(data.length);
});

//BAS Itna sa tha yaar ,wtf
//we was just struggling on that shit,e.target.files[0]
router.post("/api/upload", upload.array("file", 10), async (req, res) => {
  const images = req.files;
  const imagesLinks = [];
  console.log(req.body.file, req.files);
  try {
    for (const image of images) {
      const result = await uploadOnCloudinary(image.path);
      imagesLinks.push(result.url);
    }
    console.log("eloo");
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/getsingleproduct", async (req, res) => {
  const { productid } = req.query;
  console.log(productid);
  try {
    if (!productid) {
      return res.send({ error: "No product id provided" });
    }
    const product = await Product.findById(productid);
    return res.status(201).json({
      status: "true",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error occured",
    });
  }
});

router.get("/api/sellerinfo", Sellermiddleware, async (req, res) => {
  try {
    const { id } = req.seller;
    if (!id) {
      return res.send({ errors: [{ msg: "SellerID not Provided" }] });
    }
    console.log(sellerid);
    const findProducts = await Product.find({ sellerId: id });
    const findOrders = await order
      .find({ "orderItems.seller": id })
      .populate("orderItems.product")
      .populate("user");
    res.send({
      findProducts,
      data: req.seller,
      findOrders,
      length: findOrders.length,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/updateorder", upload.array("file", 10), async (req, res) => {
  console.log(req.body);
  try {
    const images = req.files;
    let prevImages = req.body.images.split(",");
    let productimages = [];
    if (req.body.images !== "") {
      productimages = prevImages;
    }
    //uploads on cloudinary
    // if (!images || images.length == 0) {
    //   return res.send({ errors: [{ msg: "please upload an image" }] })
    // }
    for (const image of images) {
      const result = await uploadOnCloudinary(image.path);
      productimages.push(result.url);
    }
    const newUpdatedDetails = {
      productName: req.body.productName,
      productCategory: req.body.productCategory,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productReviews: "TODO PRODUCT REVIEWS",
      images: productimages,
    };
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.body.productId },
      newUpdatedDetails
    );
    res.send({ updateProduct });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/deleteproduct", async (req, res) => {
  try {
    const deleteProduct = await Product.findOneAndDelete({
      _id: req.body.productId,
    });
    if (deleteProduct) {
      res.send({ DeletedProduct: deleteProduct });
    } else {
      res.send("PRODUCT CANT BE FOUND");
    }
  } catch (error) {
    console.log(error);
  }
});
