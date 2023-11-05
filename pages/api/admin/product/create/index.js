import multer from "multer";
import connectDB from "../../../../../utils/mongooseConnect";
import Product from "../../../../../models/Product";
import Image from "../../../../../models/Image";

const upload = multer({ storage: multer.memoryStorage() });

async function handleFileUpload(req, res) {
    try {
        const file = req.file;
        const image = file.buffer; // Access the uploaded image buffer
        const {title, description, price, category, keyPoints, stock, discount, status} = req.body;
        await connectDB();

        // first upload the image and then get url of the image

        const uploadingImage = new Image({data: image, contentType: file.mimetype})
        await uploadingImage.save();

        const imageUrl = `/api/images/${uploadingImage._id}`

        const product = new Product({
          title,
          description,
          price,
          category,
          image: imageUrl, // Store the image buffer in the database
          keyPoints,
          stock,
          discount,
          status
        });
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json(`Failed to upload file.`);
    }
}

export default async (req, res) => {
    upload.single("image")(req, res, () => handleFileUpload(req, res));
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};