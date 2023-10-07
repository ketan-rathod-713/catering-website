import React from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from "../components/PageHeading";
import Footer from "../components/Footer";
import Image from "next/image"

const images = [
  {url:"/intro.jpg" , alt: "wow"},
  {url:"/intro.jpg" , alt: "wow"},
  {url:"/intro.jpg" , alt: "wow"},
  {url:"/intro.jpg" , alt: "wow"}
]

const GallaryPage = () => {
  return <div>
      {/* navbar */}
      <Navbar/>

{/* body */}
<PagePadding>
  <PageHeading>GALLARY</PageHeading>

{/* gallary */}
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
      {images.map((image, index)=>(
          <Image width={1000} height={1000} key={index} src={image.url} className="mx-auto w-full aspect-square rounded-sm shadow-sm hover:shadow-xl hover:shadow-gray-500 shadow-gray-500 hover:scale-105 duration-300" alt={image.alt}/>
      ))}
    </div>

  </div>
</PagePadding>

<Footer/>
  </div>;
};

export default GallaryPage;
