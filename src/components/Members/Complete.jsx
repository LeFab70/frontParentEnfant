import React from "react";
import { Link } from "react-router-dom";

const Complete = () => {
  return (
    <div className=" uppercase flex justify-around items-center flex-col ">
      <div
        className={`rounded-full 
     transition duration-500 
     ease-in-out border-2
      border-gray-400 h-14 w-14
      flex items-center
       justify-center py-6 
    bg-green-600 text-white
    text-4xl font-extrabold
      }`}
      >
        &#10003;
      </div>

      <h3 className="text-green-500 mt-3 font-semibold uppercase text-2xl">
        Congratulation
      </h3>
      <span className="text-lg font-semibold text-gray-500">
        {" "}
        Membre cree avec succes.
      </span>
      <button className="h-10 mt-10  bg-green-300 rounded-lg  px-5 text-green-700 transition-colors duration-150 border border-gray-300 focus:shadow-outline  font-bold text-xl uppercase hover:bg-green-500 hover:text-green-100 cursor-pointer">
        <Link to="/admin" rel="noopener noreferrer">
          {" "}
          close
        </Link>
      </button>
    </div>
  );
};

export default Complete;
