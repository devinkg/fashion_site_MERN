const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    },
    { timestamps: true } // timestamps is inbuilt function in mongoDB , it automatically generates record created Datetime and updated Datetime.
);

module.exports = mongoose.model("Cart", CartSchema);