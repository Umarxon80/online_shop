import mongoose from "mongoose";

const ProductShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
    },
    amount:{
        type:Number,
        required:true,
        min:1
    }
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", ProductShema);
export default Product;
