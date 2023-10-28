import Image from "../../../models/Image";

// export default async function handler(req, res){
//     res.status(200).json({ text: 'Hello I am working fine' });
// }

export default async function handler(req, res){
    if(req.method === "GET"){ // fetch all orders for admin
        try {
            const {imageId} = req.query;
            console.log("this called");
            // Find the image data by ID in the database
            const imageData = await Image.findById(imageId);

            if (!imageData){
            return res.status(404).json({ error: 'Image not found' });
            }
            
            let contentType;
            // Send the image data as a response
            if (imageData.contentType === 'image/jpeg') {
                contentType = 'image/jpeg';
            } else if (imageData.contentType === 'image/png') {
                contentType = 'image/png';
            }
            console.log(contentType);
            res.setHeader('Content-Type', contentType);
            
            console.log("great");
            res.end(imageData.data);
            // res.json({message: "wow"})
            
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
  

}