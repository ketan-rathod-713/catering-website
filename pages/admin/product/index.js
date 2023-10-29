import React, {useState} from "react";
import authoriseAdmin from "../../../utils/authoriseAdmin";
import Product from "../../../models/Product";
import NavbarAdmin from "../../../components/NavbarAdmin";
import PagePadding from "../../../components/PagePadding";
import PageHeading from "../../../components/PageHeading";

const ProductsList = ({products}) => {
    const [Products, setProducts] = useState(products);
    const [editIndex, setEditIndex] = useState(null);
    

    const handleEditClick = (index)=>{
        console.log("edit ", index)
        setEditIndex(index) // let us edit it // go to second page for editi
    }
    
  return <div>
  {/* product list */}
   <NavbarAdmin/>
   <PagePadding>
    <PageHeading>Products</PageHeading>
    <div className="space-y-10">
        {
            Products.map((product, index) => (<div key={index} className="grid grid-cols-9 border-b-2 border-b-gray-400 pb-5">
                <div className="col-span-9 lg:col-span-1">Id here</div>
                <div className="col-span-9 lg:col-span-1">{product.title}</div>
                <div className="col-span-9 lg:col-span-1">{product.price}</div>
                <div className="col-span-9 lg:col-span-1">{product.category}</div>
                <div className="col-span-9 lg:col-span-2">{product.description}</div>
                <div className="col-span-9 lg:col-span-2">{
                    product.keyPoints.map((keyPoint, index) => <div key={index}>
                        {keyPoint}
                    </div>)
                }</div>
                <div className="col-span-9 lg:col-span-1 flex space-x-2 justify-end items-start">
                    <button className="px-2 py-1 bg-red-500 rounded-sm text-white">DELETE</button>
                    <button className="px-2 py-1 bg-green-500 rounded-sm text-white">EDIT</button>
                </div>
            </div>))
        }
    </div>
   </PagePadding>
  </div>;
};

export default ProductsList;

export async function getServerSideProps(context){
    const {req} = context;
    const decodedToken = await authoriseAdmin(req);

    if(decodedToken){
        const products = await Product.find({});
        
        const serialised = JSON.stringify(products)
        const parsed = JSON.parse(serialised)

        console.log(parsed);
        return {
            props: {
                products: parsed
            }
        }
    } else {
        return {
            props: {
                error: "You are not authorised to view this page"
            }
        }
    }
}