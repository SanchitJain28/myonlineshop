import { Router } from "express";
export const router = Router();
// import { newOrderSchemma as order } from '../Schemmas/NewOrderSchemma.js';
import { orderModel as Order } from "../Schemmas/OrderSchemma.js";
import { verifyUser } from "../MiddleWare/userMiddleWare.js";
import { body, validationResult } from "express-validator";
import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
const instance = new Razorpay({
  key_id: "rzp_live_NzX6nOcaB8kXHI",
  key_secret: "fpxoGerXDrctz9X8ybUXNEqq",
});
//DO CONSOLE LOG FOR ERROR
router.post(
  "/api/createorder",
  verifyUser,
  body("orderItems")
    .notEmpty()
    .withMessage("Ordered Items cannot be empty")
    .isLength({ min: 1 }),
  body("fullName").notEmpty().withMessage("Please enter your full name"),
  body("address").notEmpty().withMessage("Address cannot be empty"),
  body("city")
    .notEmpty()
    .withMessage("Please select the city for the delivery"),
  body("postalCode")
    .notEmpty()
    .withMessage("please Enter your regional code i.e POSTAL CODE"),
  body("country").notEmpty().withMessage("Please select the country"),
  body("itemsPrice").notEmpty().withMessage("items ammount cannot be 0"),
  body("taxPrice").notEmpty().withMessage("tax ammount cannot be 0"),
  body("shippingPrice").notEmpty().withMessage("shipping Price cannot be 0"),
  body("totalPrice").notEmpty().withMessage("total Price cannot be 0"),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      console.log(req.body);
      const newOrder = new Order({
        user: req.user.id,
        orderItems: req.body.orderItems,
        shippingAddress: {
          fullName: req.body.fullName,
          address: req.body.address,
          city: req.body.city,
          postalCode: req.body.postalCode,
          country: req.body.country,
        },
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        isPaid: false,
        paidAt: new Date(),
        isDelivered: false,
        deliveredAt: new Date(),
        createdAt: new Date(),
      });
      await newOrder.save();
      res.send({ newOrder });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/api/orderbyuser", verifyUser, async (req, res) => {
  try {
    const orders = await order.find({ user: req.user.userId });
    res.send(orders);
  } catch (error) {
    return error;
  }
});

router.post("/api/create-order", verifyUser, async (req, res) => {
  const {
    amount,
    firstName,
    lastName,
    address,
    city,
    state,
    postalCode,
    country,
    itemsPrice,
    taxPrice,
    orderItems,
    shippingPrice,
    totalPrice,
    paymentMethod,
  } = req.body;
  const options = {
    amount: 100, // Amount in paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    const newOrder = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        state,
        postalCode,
        country,
      },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      paidAt: null,
      isDelivered: false,
      deliveredAt: null,
      paymentMethod,
      paymentDetails:order.id
    });
    await newOrder.save();
    res.json({
      status: true,
      message: "Order created successfully",
      order: order,
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Internal server error",
      error,
    });
  }
});

router.post("/api/webhook/payment", async (req, res) => {
  try {
    const webhookSecret = "sK!9Zr@8Vm#4Lp$Wq2Nt&EbGdX6TcY3Q"
    const webhookSignature = req.headers["x-razorpay-signature"];
    const rawBody = req.body;

    const isValid = validateWebhookSignature(
      rawBody.toString(),
      webhookSignature,
      webhookSecret
    );

    if (!isValid) {
      res.status(500).json({
        status: false,
        message: "invalid webhook signature",
        error: "invalid webhook signature",
      });
    }

    const event = JSON.parse(rawBody.toString());
    console.log(event)
    // Optional: Handle different event types
    if (event.event === "payment.captured") {
      const paymentData = event.payload.payment.entity;

      // TODO: Update your order in DB as successful
      // Example: updateOrderByRazorpayId(paymentData.order_id, { isSuccess: true })

      console.log("✅ Payment captured:", paymentData.id);
    }

    if (event.event === "payment.failed") {
        const paymentData = event.payload.payment.entity;
  
        // TODO: Update your order in DB as successful
        // Example: updateOrderByRazorpayId(paymentData.order_id, { isSuccess: true })
  
        console.log("Payment failed", paymentData.id);
      }

    res.status(200).json({ status: "Webhook verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});
