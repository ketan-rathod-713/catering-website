import React from "react";
import Navbar from "../../components/Navbar";
import PagePadding from "../../components/PagePadding";
import PageHeading from "../../components/PageHeading";
import Image from "next/image";

const ShopPage = () => {
  return <div>
      {/* navbar */}
      <Navbar/>

{/* body */}
<PagePadding>
  {/* <PageHeading>Let's start shopping</PageHeading> */}

{/* images in 4:1 1200 by 300 */}
  <div className="shop-cover-images">
    <div className="h-64 w-full bg-green-500 rounded-md relative">
      <div className="absolute left-0 top-28 text-black p-2 rounded-r-md bg-orange-300 cursor-pointer">L</div>
      <div className="absolute right-0 top-28 text-black p-2 rounded-l-md bg-white bg-orange-300 cursor-pointer">R</div>
      <Image src="" width={100} height={100} className="w-full h-64 object-cover" alt="" />
    </div>
  </div>

  <div className="mt-10">
    collection and all things
  </div>
</PagePadding>
  </div>;
};

export default ShopPage;
