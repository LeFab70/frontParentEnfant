import React from "react";
import { Link } from "react-router-dom";
import { I404 } from "../pages/public/Index";
const Errors = () => {
  return (
    <>
      <section className="max-w-2xl md:max-w-7xl flex items-center h-full py-16 dark:bg-sky-900 dark:text-gray-100 mx-auto rounded-lg">
        <div className="container flex flex-col items-center justify-center  mx-auto my-8">
          <div className="max-w-2xl md:max-w-7xl text-center space-y-4">
            <img src={I404} alt="404" />

            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              <span className="sr-only">Error</span>404 But dont worry, you can
              find plenty of other things on our homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              to="home"
              className="block w-1/2 mx-auto px-8 py-3 font-semibold rounded-xl dark:bg-sky-600 hover:dark:bg-sky-500 dark:text-gray-100 "
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Errors;
