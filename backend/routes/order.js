import { Router } from 'express';
export const router = Router();
// import { newOrderSchemma as order } from '../Schemmas/NewOrderSchemma.js';
import { orderModel as order } from '../Schemmas/OrderSchemma.js';
import { verifyUser } from '../MiddleWare/userMiddleWare.js';
import { body, validationResult } from "express-validator";
import Razorpay from 'razorpay'
const instance = new Razorpay({
  key_id: 'rzp_live_NzX6nOcaB8kXHI',
  key_secret: 'fpxoGerXDrctz9X8ybUXNEqq',
});
//DO CONSOLE LOG FOR ERROR
router.post("/api/createorder", verifyUser, body("orderItems").notEmpty().withMessage("Ordered Items cannot be empty").isLength({min:1}),
    body("fullName").notEmpty().withMessage("Please enter your full name"),
    body("address").notEmpty().withMessage("Address cannot be empty"),
    body("city").notEmpty().withMessage("Please select the city for the delivery"),
    body("postalCode").notEmpty().withMessage("please Enter your regional code i.e POSTAL CODE"),
    body("country").notEmpty().withMessage("Please select the country"),
    body("itemsPrice").notEmpty().withMessage("items ammount cannot be 0"),
    body("taxPrice").notEmpty().withMessage("tax ammount cannot be 0"),
    body("shippingPrice").notEmpty().withMessage("shipping Price cannot be 0"),
    body("totalPrice").notEmpty().withMessage("total Price cannot be 0"), async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.send({ errors: result.array() });
            }
            console.log(req.body)
            const newOrder = new order({
                user: req.user.user_id,
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
                createdAt: new Date()
            })
            await newOrder.save()
            res.send({newOrder})
        } catch (error) {
            console.log(error)
        }
    })

    router.get('/api/orderbyuser',verifyUser,async(req,res)=>{
        try {
            const orders=await order.find({user:req.user.userId})
            res.send(orders)
        } catch (error) {
            return error
        }
    })

    
    router.post('/api/create-order', async (req, res) => {
        const options = {
          amount: req.body.amount, // Amount in paise
          currency: 'INR',
          receipt: 'order_rcptid_11',
        };
        try {
          const order = await instance.orders.create(options);
          res.json(order);
        } catch (error) {
            console.log(error)
          res.json({ error });
        }
      });