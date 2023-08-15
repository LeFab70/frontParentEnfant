import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
  AiOutlineHome,
} from "react-icons/ai";
import {
  FaUsers,
  //FaUserEdit,
  FaSignOutAlt,
  FaArrowLeft,
  FaArrowRight,
  // FaCartArrowDown,
  // FaEdit,
} from "react-icons/fa";

import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
//import { MdOutlineAutorenew } from "react-icons/md";
import { serviceAccount } from "../../services/Auth.Service";
import { VscNewFolder } from "react-icons/vsc";
import { FcOnlineSupport } from "react-icons/fc";

//import Footer from "../public/Footer";
//import ethane from "../../asset/img/ethane.jpeg";
//import { UserContext } from "../../UserContext";

const SideMenu = () => {
  //const value = React.useContext(UserContext);
  //const { user } = useContext(UserContext);
  const [displaySide, setDisplaySide] = React.useState(true);
  const user = useSelector((state) => state.cardMember.user);
  return (
    // <div className="m-1 space-y-2 overflow-hidden px-2 sm:px-0 flex flex-col h-screen justify-around py-0 2xl:py-1 w-full ">

    <>
      {!displaySide ? (
        <span
          onClick={() => {
            setDisplaySide((state) => !state);
          }}
          className="flex text-2xl cursor-pointer   dark:bg-sky-900 dark:text-gray-100"
        >
          {displaySide ? <RiCloseLine /> : <RiMenu3Fill />}
        </span>
      ) : (
        <div
          className={` mr-2  xl:left-0  h-full bg-gray-100 p-2 flex flex-col justify-between  transition-all ${
            displaySide ? "left-0" : "-left-full"
          }`}
        >
          <div className="flex items-center justify-between text-base ">
            <h2 className="uppercase  font-bold  text-sky-900 text-base">
              tableau de bord
            </h2>
            <span
              onClick={() => {
                setDisplaySide((state) => !state);
              }}
              className="p-2 flex items-center text-xl cursor-pointer"
            >
              {displaySide ? <FaArrowLeft /> : <FaArrowRight />}
            </span>
          </div>
          <div className=" flex items-center p-2 mt-2  justify-self-end">
            {/* <img
                src={ethane}
                alt="profil"
                className="w-20 h-20 rounded-full dark:bg-gray-500"
              /> */}
            <div className="  text-base">
              <div className="flex justify-center space-x-2 items-center">
                <FcOnlineSupport size={35} />
                <span> UserOnline : </span>
              </div>

              <span className="font-bold  uppercase">
                {/* {JSON.stringify(user, null, 2)} */}
                {user.name}/{user.role}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <ul className="pt-2 pb-4  text-base">
              <li className="rounded-sm">
                <Link
                  to="/admin"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <AiOutlineHome />
                  <span>Home</span>
                </Link>
              </li>

              <li className="rounded-xl">
                <span className="bg-sky-900  flex items-center p-2 text-white font-semibold space-x-2 rounded-md">
                  <FaUsers />
                  <span>Gestion des Membres</span>
                </span>
                <ul className="px-6">
                  <li className="rounded-sm">
                    <Link
                      to="members/add"
                      rel="noopener noreferrer"
                      className=" transition ease-in-out duration-200 hover:bg-sky-700 cursor-pointer flex items-center p-2 space-x-3 rounded-md"
                    >
                      <VscNewFolder />
                      <span>Edition</span>
                    </Link>
                  </li>

                  {/* <li className="rounded-sm w-full">
                      <Link
                        to="members/add"
                        rel="noopener noreferrer"
                        className=" transition ease-in-out duration-200 w-full flex items-center p-2 space-x-3 rounded-md hover:bg-sky-700 cursor-pointer"
                      >
                        <FaUserEdit />
                        <span>Editer</span>
                      </Link>
                    </li>
                    <li className="rounded-sm">
                      <Link
                        to="members/add"
                        rel="noopener noreferrer"
                        className=" transition ease-in-out duration-200 hover:bg-sky-700 cursor-pointer flex items-center p-2 space-x-3 rounded-md"
                      >
                        <MdOutlineAutorenew />
                        <span>Reinscrire</span>
                      </Link>
                    </li> */}
                  <li className="rounded-sm">
                    <Link
                      to="statistique/show"
                      rel="noopener noreferrer"
                      className=" transition ease-in-out duration-200 hover:bg-sky-700 cursor-pointer flex items-center p-1 space-x-3 rounded-md"
                    >
                      <AiOutlineUsergroupAdd />
                      <span>Statistiques|Email</span>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <li className="rounded-xl ">
                <span className="bg-sky-900 text-white font-semibold text-base flex items-center p-2 space-x-3 rounded-md">
                  <FaUsers />
                  <span>Gestion des utilisateurs</span>
                </span>
                <ul className="px-6">
                  <li className="rounded-sm w-full">
                    <Link
                      to="cocktails/add"
                      rel="noopener noreferrer"
                      className=" transition ease-in-out duration-200 w-full flex items-center p-2 space-x-3 rounded-md hover:bg-sky-700 cursor-pointer"
                    >
                      <FaCartArrowDown />
                      <span>Ajouter</span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link
                      to="cocktails/edit"
                      rel="noopener noreferrer"
                      className=" transition ease-in-out duration-200 hover:bg-sky-700 cursor-pointer flex items-center p-2 space-x-3 rounded-md"
                    >
                      <FaEdit />
                      <span>Editer</span>
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li className="rounded-sm">
                {/* <span
                    rel="noopener noreferrer"
                    className="flex items-center  space-x-3 rounded-md"
                  > */}

                {/* </span> */}
                {user.role === "admin" && (
                  <>
                    <Link
                      to="volets/edit"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </Link>

                    {/* <li className="rounded-sm w-full">
                      <Link
                        to="peri/add"
                        rel="noopener noreferrer"
                        className=" transition ease-in-out duration-200 w-full flex items-center p-2 space-x-3 rounded-md hover:bg-sky-700 cursor-pointer"
                      >
                        
                        <span>periode</span>
                      </Link>
                    </li> */}
                  </>
                )}

                {/* <ul className="px-2">
                    <li className="rounded-sm">
                      <Link
                        to="volets/edit"
                        rel="noopener noreferrer"
                        className=" transition ease-in-out duration-200 hover:bg-sky-700 cursor-pointer flex items-center p-2 space-x-3 rounded-md"
                      >
                        <FaEdit />
                        <span>Gerer les volets</span>
                      </Link>
                    </li>
                  </ul> */}
              </li>
              <li className="rounded-sm">
                <Link
                  to="/"
                  onClick={() => {
                    serviceAccount.logout();
                    toast.info(
                      `Aurevoir ${user.name} 👋, revenez vite nous voir`
                    );
                  }}
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
