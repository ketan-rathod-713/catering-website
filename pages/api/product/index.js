// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import {createRouter} from 'next-connect';
import mongoose from "mongoose";
import Image from "../../../models/Image.js";

const handler = createRouter()

handler.get(async (req, res)=>{
  try {
    await connectDB();
    const products = await Product.find();
    res.status(200).json(products);
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


// export default async function handler(req, res){
//     if(req.method === "GET"){ // get all products, based on filters too
       
//     } 
    
//     // create product
//     else if(req.method === "POST"){
//       console.log("wow post req");
//       try{
//           console.log("great");
//           await connectDB();
//           const form = formidable({});
//           console.log("great2");
//           let fields;
//           let files;

//           form.parse(req, (err, fields, files) => {
//             if (err) {
//               next(err);
//               return;
//             }
//             console.log(fields, files)
//           });

//           console.log("great3");
//           console.log("wow",fields, files)
//       } catch(err){
//         console.log(err)
//         res.status(500).json({message: "error occured"})
//       }
      // const {title, description, price, category, image} = req.body;
      // try{
      //   await connectDB();
      //   const product = new Product({title, description, price, category, image})
      //   await product.save();

      //   res.status(200).json(product)
      // } catch(err){
      //   console.log(err);
      //   res.status(500).json({error: "Server error"})
      // }
//     }
// }