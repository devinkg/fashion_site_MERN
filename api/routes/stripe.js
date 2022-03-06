const router = require('express').Router();
const dotenv = require("dotenv");
const Stripe = require('stripe');

dotenv.config(); 
/* sometimes payment failing with 'StripeAuthenticationError' ,due to that added this(dotenv.config();) before processing env key
https://stackoverflow.com/a/65397032/9516745 */

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
           console.log(stripeErr)
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
})

module.exports = router;