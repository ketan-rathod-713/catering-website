import { CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "../../../../data/adminProductActions";
import Product from "../../../../models/Product";
import authoriseAdmin from "../../../../utils/authoriseAdmin";
import connectDB from "../../../../utils/mongooseConnect";
import multer from "multer";


export default async function handler(req, res){

    const decodedToken = await authoriseAdmin(req);

    if(!decodedToken){
        return res.status(400).json({error: "you are not authorised"})
    }

    if(req.method === "GET"){
        // get all products for admin
            try {
                await connectDB()
                const product = await Product.find({});
                return res.status(200).json(product);
            } catch(err){
                return res.status(500).json({error: "An error occured"});
            }
      
    } else if(req.method === "POST"){
        
        const {type} = req.body;
        if(type === CREATE_PRODUCT){
            // CREATE PRODUCT
         
            // type jab body se aayega hi nahi to kya karoge ha ha

        } else if(type === EDIT_PRODUCT){
            const {product} = req.body;
            
            // find and update
            const newProduct = await Product.findByIdAndUpdate(product._id, product,  { new: true });

            return res.status(200).json({product: newProduct})
        } else if(type === DELETE_PRODUCT){
            // DELETE PRODUCT




        } else { // CREATE PRODUCT
            console.log("called");
            
        }
    }
}