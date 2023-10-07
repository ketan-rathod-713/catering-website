import React from "react";

const Checkout = () => {


    const handleOrderNowClick = async ()=>{
        // make order request and route it to my orders or home page
    }

  return <div>
    <div className="h-20 bg-red-300">
        get address details and user information using form
    </div>
    <div className="h-20 mt-10 bg-green-400">
        show cart items here
    </div>

    <div className="flex justify-center mt-20">
        <button className="px-5 py-4 bg-blue-700 text-white rounded-sm" onClick={handleOrderNowClick}>Order Now</button>
    </div>
  </div>;
};

export default Checkout;
