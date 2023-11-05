import Image from "../../../models/Image";

export default async function handler(req, res){
    if(req.method === "GET"){ // fetch all orders for admin
        try {
            const {imageId} = req.query;
            const image = await Image.findById(imageId);

            if (!image) {
                return res.status(404).json({ error: 'Image not found' });
            }

            // Set the response content type based on the image's contentType
            res.setHeader('Content-Type', image.contentType);

            // Send the image data as a response
            res.status(200).end(image.data);
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
  

}