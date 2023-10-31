import React from "react";
import Link from "next/link";

const NotAuthorised = ({message}) => {
  return  <div className="flex flex-col items-center justify-center h-screen">
  <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
    <p className="text-3xl">{message}</p>
    <p className="text-lg mt-2">
      Please <Link href="/auth/login" className="underline">login</Link> to access this page.
    </p>
  </div>
</div>
};

export default NotAuthorised;
