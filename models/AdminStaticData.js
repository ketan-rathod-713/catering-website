import mongoose from "mongoose";


const AdminStaticDataSchema = mongoose.Schema({
    orders: {
    
    }
   
})

const AdminStaticData = mongoose.models.AdminStaticData || new mongoose.model("AdminStaticData", AdminStaticDataSchema);

export default AdminStaticData;