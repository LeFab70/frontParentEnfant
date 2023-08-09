import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
// import { FiTwitter } from "react-icons/fi";
const Footer = () => {
  //   const footerNavs = [
  //     {
  //         label: "Resources",
  //         items: [
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'contact'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Support'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Documentation'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Pricing'
  //             },
  //         ],
  //     },
  //     {
  //         label: "About",
  //         items: [
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Terms'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'License'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Privacy'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'About US'
  //             },
  //         ]
  //     },
  //     {
  //         label: "Explore",
  //         items: [
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Showcase'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Roadmap'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Languages'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Blog'
  //             },
  //         ]
  //     },
  //     {
  //         label: "Company",
  //         items: [
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Partners'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Team'
  //             },
  //             {
  //                 href: 'javascript:void()',
  //                 name: 'Careers'
  //             },
  //         ],
  //     }
  // ]

  return (
    // <footer className=" px-4 divide-y dark:bg-gray-600 dark:text-gray-100 rounded-lg">
    //  <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">

    <footer
      className=" bg-gray-800  fixed
    inset-x-0
    bottom-0"
    >
      <div className=" px-4 md:px-8">
        {/* <div className=" max-w-lg justify-between items-center gap-10 md:flex">
                    <div className="flex-1 max-w-lg">
                        <h3 className="text-white text-2xl font-bold">
                            Get our beautiful newsletter straight to your inbox.
                        </h3>
                    </div>
                    <div className="flex-1 mt-2 md:mt-0">
                      
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-6 md:gap-x-3 md:justify-end">
                        <p className="text-gray-300 text-base w-1/3 sm:w-auto">News Letters</p>
                            <div className="relative">
                                <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div> */}
        {/* <div className="flex mt-2 flex-wrap space-y-0 justify-between sm:flex md:space-y-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-2 text-gray-300"
                                key={idx}
                            >
                                <h4 className="text-gray-200 font-semibold sm:pb-2">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={el.href}
                                                className="duration-150 hover:text-gray-400"

                                            >
                                                {el.name}
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div> */}

        {/* <div className="lg:w-1/3">
          <div
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
            <Link>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9mpBG-wkCwgPnKlbLEigIE-t0SyNXpPM5w&usqp=CAU" alt="logo" className="text-2xl font-bold h-14 w-14 object-cover object-center rounded-full " />
              </Link>
            </div>
            <span className="self-center text-2xl font-semibold">Recettes</span>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-2 text-sm gap-x-1 gap-y-2 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-1">
            <h3 className="tracking-wide uppercase dark:text-gray-50">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <Link>Features</Link>
              </li>
              <li>
                <Link>Integrations</Link>
              </li>
              <li>
                <Link>Pricing</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="tracking-wide uppercase dark:text-gray-50">
              Company
            </h3>
            <ul className="space-y-1"></ul>
          </div>
          <div className="space-y-1">
            <h3 className="uppercase dark:text-gray-50">Developers</h3>
            <ul className="space-y-1">
              <li>
                <Link>FAQ</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
            </ul>
          </div> */}

        {/* <div className="mt-6 py-2 border-t border-gray-700 items-center justify-between sm:flex">
         */}
        <p className="text-gray-400 text-center py-2">
          © 2023 Carrefour Parenfants. Viau-Quebec/Canada. All rights reserved.
        </p>
        {/* <div className="flex items-center  text-gray-400"> */}
        {/* <div className="uppercase dark:text-gray-50">Social media</div>
            <div className="flex justify-start space-x-3 text-2xl">
               */}
        {/* <Link>
                <FaFacebookF />
              </Link>
              <Link>
                <FaWhatsapp />
              </Link>
              <Link>
                <FiTwitter />
              </Link> */}
        {/* </div>
          </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
