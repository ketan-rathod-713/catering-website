// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import {createRouter} from 'next-connect';
import mongoose from "mongoose";
import Image from "../../../models/Image.js";
import { TIME_NEWEST_FIRST, TIME_OLDEST_FIRST, RATING_HIGH_FIRST, RATING_LOW_FIRST, PRICE_HIGH_FIRST, PRICE_LOW_FIRST} from './../../../data/sortProductTypes';

const handler = createRouter()

handler.get(async (req, res)=>{
  const {page, limit, sort} = req.query;

  // if page no is 1 then skip = 0 and if page 2 then skip will be limit per page that for eg. 10
  const skip = (page - 1) * limit; // pagination
  try {
    await connectDB();
    
    if(sort === PRICE_HIGH_FIRST){
      const products = await Product.find().skip(skip).limit(limit).sort({price: -1})
      return res.status(200).json(products);
    } else if(sort === PRICE_LOW_FIRST){
      const products = await Product.find().skip(skip).limit(limit).sort({price: 1})
      return res.status(200).json(products);
    } else if(sort === RATING_HIGH_FIRST){
      const products = await Product.find().skip(skip).limit(limit).sort({averageRating: -1})
      return res.status(200).json(products);
    } else if(sort === RATING_LOW_FIRST){
      const products = await Product.find().skip(skip).limit(limit).sort({averageRating: 1})
      return res.status(200).json(products);
    }else {
      const products = await Product.find().skip(skip).limit(limit);
      return res.status(200).json(products);
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
})


handler.post(async (req, res)=>{
      const {title, description, price, category, image, keyPoints} = req.body;
      console.log(title);
      try{
        await connectDB();

        // const bufferData = Buffer.from(image, "base64");

        // const imageModel = new Image({
        //   name: new Date(),
        //   data: bufferData,
        //   contentType: "image"
        // })
        // await imageModel.save()

        // const imageId = imageModel._id;
        // const imageUrl = "/api/uploads/"+imageId;
        const product = new Product({title, description, price, category, image: image, keyPoints})
        await product.save();

        res.status(200).json(product)
      } catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"})
      }
})

export default handler.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
