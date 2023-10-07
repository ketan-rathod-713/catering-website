import React from "react";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import PageHeading from "../components/PageHeading";
import Footer from "../components/Footer";

const images = [
  {url: "https://picsum.photos/200/300", alt: "Going somewhere using it"},
  {url: "https://picsum.photos/200/500", alt: "Going somewhere using it"},
  {url: "https://picsum.photos/200/700", alt: "Going somewhere using it"},
  {url: "https://picsum.photos/700/300", alt: "Going somewhere using it"},
  {url: "https://picsum.photos/900/300", alt: "Going somewhere using it"},
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
          <img key={index} src={image.url} className="mx-auto w-full aspect-square rounded-sm shadow-sm hover:shadow-xl hover:shadow-gray-500 shadow-gray-500 hover:scale-105 duration-300" alt={image.alt}/>
      ))}
    </div>

  </div>
</PagePadding>

<Footer/>
  </div>;
};

export default GallaryPage;
