import React from "react";
import { useSelector } from "react-redux";
const StepperControl = ({ handleClick, currentStep, steps }) => {
  const { isOk } = useSelector((state) => state.cardMember.checkParent);
  return (
    <div className="container flex justify-around mt-2 mb-8 ">
      {/* back button */}
      {currentStep === 1 ? (
        <button
          onClick={() => handleClick()}
          disabled
          className={`uppercase bg-white text-slate-400 px-4 py-2 rounded-xl font-semibold
      cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
      ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Precedent
        </button>
      ) : (
        <button
          onClick={() => handleClick()}
          className={`uppercase bg-white text-slate-400 px-4 py-2 rounded-xl font-semibold
  cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
  ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Precedent
        </button>
      )}
      {/* next button */}

      {isOk !== 0 && currentStep === 2 ? (
        <button
          disabled
          onClick={() => handleClick("suivant")}
          className={`uppercase bg-green-500 text-white px-4 py-2 rounded-xl font-semibold
      cursor-pointer  hover:bg-green-700 hover:text-white hover:font-bold transition duration-200 ease-in-out
      ${isOk!==0 && currentStep === 2 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {currentStep === steps.length - 1 ? "Enregistrer" : " suivant"}
        </button>
      ) : (
        <button
          onClick={() => handleClick("suivant")}
          className={`uppercase bg-green-500 text-white px-4 py-2 rounded-xl font-semibold
      cursor-pointer  hover:bg-green-700 hover:text-white hover:font-bold transition duration-200 ease-in-out
      ${
        isOk !== 0 && currentStep === 2 ? "opacity-50 cursor-not-allowed" : ""
      }`}
        >
          {currentStep === steps.length - 1 ? "Enregistrer" : " suivant"}
        </button>
      )}
    </div>
  );
};

export default StepperControl;
