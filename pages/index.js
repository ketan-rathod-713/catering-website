import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import Footer from "../components/Footer";


export default function Home() {

  return (
    <div className="">
      <Navbar/>

      <PagePadding>
        <div className="intro grid grid-cols-12 space-y-20 md:space-y-0">
          <motion.div initial={{opacity: 0, x: -2000}} animate={{opacity: 1, x: 0}} transition={{duration: 2.5,damping: 100, stiffness: 1000}} className="about col-span-12 md:col-span-4 p-5 md:flex md:items-center">
            <div>
              <div className="text-5xl font-serif leading-normal text-center md:text-left">
                The proof is in the Taste
              </div>
              <div className="mt-7 text-md text-gray-700 font-sans text-center md:text-left">
                Our language is food, and every event presents a unique
                opportunity to connect over sensational culinary experiences.
                Let’s invent something one of a kind together.
              </div>
            </div>
          </motion.div>
          {/* image div */}
          <motion.div initial={{opacity: 0, x: 500}} animate={{opacity: 1, x: 0}} transition={{duration: 2.5,damping: 100, stiffness: 1000}} className="slides col-span-12 md:col-span-8">
            <Image
              className="object-cover h-[26rem] md:h-[40rem] w-full h-96 rounded-md"
              src="/intro.jpg"
              width={1000}
              height={1000}
              alt=""
            />
            <div className="flex justify-center mt-2">
              <div className="left p-4 bg-blue-500 text-white hover:bg-blue-700 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
              <div className="left p-4 bg-blue-500 text-white hover:bg-blue-700 duration-500  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
          {/* <div>
            hii
          </div> */}
      </PagePadding>

      {/* <div className="h-[100vh] bg-red-400">wow</div> */}
      <Footer/>
    </div>
  );
}
