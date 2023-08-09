import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiFormMember = (props) => {
  return (
    <div>
      <ProgressBar
        // percent={((props.step - 1) * 100) / 2}
        percent={((props.step - 1) * 100) / 2}
        filledBackground="green"
      >
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`bg-green-900 rounded-full w-10 h-10 text-white font-bold  text-2xl flex justify-center items-center ${
                accomplished ? "bg-red-600" : null
              }`}
            >
              {accomplished ? (
                <span className="text-white font-bold text-2xl">&#10003;</span>
              ) : (
                1
              )}
              
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`bg-green-900 rounded-full w-10 h-10 text-white font-bold  text-2xl flex justify-center items-center ${
                accomplished ? "bg-red-600" : null
              }`}
            >
              {accomplished ? (
                <span className="text-white font-bold  text-2xl">&#10003;</span>
              ) : (
                2
              )}
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`bg-green-900 rounded-full w-10 h-10 text-white font-bold  text-2xl flex justify-center items-center ${
                accomplished ? "bg-red-600" : null
              }`}
            >
              {accomplished ? (
                <span className="text-white font-bold   text-2xl">
                  &#10003;
                </span>
              ) : (
                3
              )}
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              className={`bg-green-900 rounded-full w-10 h-10 text-white font-bold  text-2xl flex justify-center items-center ${
                accomplished ? "bg-red-600" : null
              }`}
            >
              {accomplished ? (
                <span className="text-white font-bold  text-2xl">&#10003;</span>
              ) : (
                4
              )}
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default MultiFormMember;
