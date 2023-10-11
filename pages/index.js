import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PagePadding from "../components/PagePadding";
import Footer from "../components/Footer";
import HomePageFirst from "../components/HomePageFirst";


export default function Home() {

  return (
    <div className="">
      <Navbar/>

      <PagePadding>
        <HomePageFirst/>
          {/* <div>
            hii
          </div> */}
      </PagePadding>

      {/* <div className="h-[100vh] bg-red-400">wow</div> */}
      <Footer/>
    </div>
  );
}
