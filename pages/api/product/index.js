// / product
import Product from "../../../models/Product.js";
import connectDB from "../../../utils/mongooseConnect.js";
import {createRouter} from 'next-connect';
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import {createReadStream} from "fs";
import { Readable } from "stream";
import multer from "multer";
import bodyParser from "body-parser";

// Create a middleware function to increase the payload size limit
const jsonParser = bodyParser.json({ limit: '10mb' });

// Create GridFS stream
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


// Create a storage engine for multer
const storage = multer.memoryStorage(); // Store the file in memory (you can change this as needed)
const upload = multer({ storage: storage });

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

handler.get('/api/product/image/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await gfs.files.findOne({ _id: fileId});

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readStream = gfs.createReadStream({ _id: fileId });
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


handler.post(upload.single('image'), async (req, res)=>{
  try {
    jsonParser(req, res, ()=>{
      // now getting parsed body which hass higher limit
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }
  
      // Process the uploaded file and store it in GridFS
      const readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(req.file.buffer);
      readableStream.push(null);
  
      const writeStream = gfs.createWriteStream({
        filename: req.file.originalname,
      });
  
      readableStream.pipe(writeStream);
  
      writeStream.on('close', async (file) => {
        // Create a product with the image URL
        const productData = {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: `/api/product/image/${file._id}`, // Use the file's _id in the URL
        };
  
        // Save the product in your MongoDB collection
        // Replace 'YourProductModel' with your actual product model
        // and 'YourProductCollection' with the actual collection name
        // e.g., Product.create(productData);
        // Replace this with your actual code
  
        return res.json({ message: 'Product created successfully' });
      });      
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
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
//       // const {title, description, price, category, image} = req.body;
//       // try{
//       //   await connectDB();
//       //   const product = new Product({title, description, price, category, image})
//       //   await product.save();

//       //   res.status(200).json(product)
//       // } catch(err){
//       //   console.log(err);
//       //   res.status(500).json({error: "Server error"})
//       // }
//     }
// }