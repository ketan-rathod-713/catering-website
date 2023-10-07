import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import navbarItems from "../data/navbarItems";

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const toggleNavbar = () => {
    if (openNavbar) {
      setOpenNavbar(false);
    } else {
      setOpenNavbar(true);
    }
  };
  return (
    <div className="sticky navbar top-0">
      <div className="nav flex justify-between px-10 py-4 bg-blue-900 items-center z-10 relative shadow-md shadow-gray-400">
        <Link href="/" className="text-xl font-bold text-white">Nakalang Caterers</Link>
        <div className="px-2 py-1 cursor-pointer" onClick={toggleNavbar}>
          {openNavbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          )}
        </div>
      </div>

      <div>
        {openNavbar && (
          <motion.div
            initial={{ y: -600 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            exit={{y: -600}}
            className="flex-col z-0 md:flex-row items-center justify-center text-center py-2 bg-blue-900 text-gray-200"
          >
            {navbarItems.map((item, index) => (
              <div className="py-3" key={index}>
                {item.btn ? (
                  <Link
                    className="py-1 px-7 text-center bg-orange-700 text-white rounded-sm"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link className="lg:text-lg" href={item.link}>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* second heading */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10 px-10 py-2 justify-end bg-white"
      >
        <Link
          href={"/gallary"}
          className="px-6 py-1 bg-green-400 text-gray-900 font-bold shadow-md shadow-red-300"
        >
          VIEW GALLARY
        </Link>
        <Link
          href={"/shop"}
          className="px-6 py-1 bg-red-400 text-gray-900 font-bold shadow-md shadow-red-300"
        >
          SHOP NOW
        </Link>
        <Link
          href={"/contact-us"}
          className="px-6 py-1 bg-blue-400 text-gray-900 font-bold shadow-md shadow-blue-300"
        >
          ENQUIRE NOW
        </Link>
      </motion.div>
    </div>
  );
};

export default Navbar;
