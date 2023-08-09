import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { serviceAccount } from "../../services";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.png";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";
//import Footer from "../../components/public/Footer";
import Languageoption from "../../components/Languageoption";
import { useDispatch } from "react-redux";
import { addUser } from "../../stores/user";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { clearAllField } from "../../_helps/Initialstate";
// import { addMember } from "../../stores/members";
//import AddMember from "../Admin/Membre/AddMember";

//import AdminRouter from "../Admin/AdminRouter";
const Login = () => {
  //const user = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
    //console.log(e.target.value);
  };
  const [open, setOpen] = useState(false);
  //const { setUser } = useContext(UserContext);
  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };
  const [error, setError] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState(true);
  const [errorCredentia, setErrorCredentia] = React.useState("");
  const notify = (msg, toastuse) => {
    toastuse(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const schema = yup
    .object({
      pseudo: yup.string().required("fournir le pseudo : Required"),
      password: yup
        .string()
        .required("Fournir votre mot de passe")
        .min(6, "Password length should be at least 6 characters")
        .max(12, "Password cannot exceed more than 12 characters"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      pseudo: "",
    },
  });

  const onSubmit = async (data, e, response) => {
    e.preventDefault();
    try {
      //   const user = {
      //    email,
      //     Password
      // }
      serviceAccount.logout();
      await wait(2000);
      serviceAccount
        .login(data)
        .then((res) => {
          console.log("res", res.data.status);
          setUserStatus(res.data.status.lowercase !== "inactif" ? true : false);
          console.log(userStatus);
          //return;
          // setUser(res.data.user);
          // dispatch({
          //   type: "user/addUser",
          //   payload: { name: res.data.user, role: "admin" },
          // });
          //console.log(res.data.status)
          //if (res?.data?.status === "inactif") {
          // notify(
          //   `compte de  😞 desactive. Merci de contacter l'administrateur `,
          //   toast.danger
          // );
          // console.log("object")
          //navigate("/auth/login");
          //return null;
          // }

          if (!userStatus) {
            notify(
              `compte de  😞 desactive. Merci de contacter l'administrateur `,
              toast.danger
            );
           // return;
          }
          dispatch(addUser({ name: res.data.user, role: res.data.role }));
          serviceAccount.saveToken(res.data.access_token);
          // clearAllField(dispatch, addMember);
          //toast.success(`Bienvenu ${res.data.user}`);
          notify(`Bienvenu ${res.data.user} 👋 `, toast.success);
          navigate("/admin");
        })
        .catch((error) => {
          setErrorCredentia((state) => error.response.data.message);
          //console.log(error.response.data.message);
          // toast.POSITION('top-center')
          notify(error.response.data.message + "🚀", toast.error);
          // toast.error(error.response.data.message);
          setError((state) => true);
        });

      reset({
        password: "",
        pseudo: "",
      });
    } catch (error) {
      console.log(error);
      // console.log(error.AxiosError.response)
      // setError(true);
    }
    //save(data);
  };
  //console.log(t('messageWelcome'));
  return (
    <div className=" bg-gray-200 h-screen ">
      {/** to remove just to test integration */}

      {/* <AddMember /> */}
      {/** to remove just to test integration */}

      <section className="flex flex-col items-center  justify-center px-5 md:px-0 ">
        {/* <AdminRouter user={user} /> */}
        <div className="flex justify-center items-center mb-0">
          <img src={logo} className="w-1/6" alt="Carrefour Parenfants" />

          <p className="text-base md:text-2xl ml-6 mt-1 text-gray-600  uppercase font-extrabold">
            {" "}
            {t("messageWelcome")}
            <sub className="text-base">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  strings: [
                    "parents",
                    "enfants",
                    "partenaires",
                    "stagiaires",
                    "benevoles",
                  ],
                }}
              />
            </sub>
          </p>
        </div>

        <div className="overflow-hidden shadow-2xl md:w-5/6  lg:w-2/3  xl:w-2/6 flex w-full justify-center  flex-wrap mt-2 mb-0 md:mb-0  bg-white px-6 py-2  rounded-2xl">
          <p className="text-center uppercase mb-2 text-4xl text-sky-800 font-extrabold ">
            Identification
          </p>

          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-1  text-base text-center "
          >
            <div className=" mb-10 relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-20 text-gray-100 bg-sky-700 rounded-lg">
                <svg
                  className="h-6 w-6 rounded-lg"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t("pseudo")}
                className="placeholder-gray-400 placeholder:italic ml-2 pl-20 pr-6 text-2xl bg-gray-200 border border-transparent h-full form-control block w-full py-6  font-normal text-gray-700 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                {...register("pseudo")}
              />
              {/* errors will return when field validation fails  */}
              {errors.pseudo && (
                <span className="text-red-500 text-base font-bold mt-2  absolute block">
                  {errors.pseudo.message}
                </span>
              )}
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <div className="mb-6 relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-20 text-gray-100 bg-sky-700 rounded-lg">
                <svg
                  className="h-6 w-6 rounded-lg"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={open === false ? "password" : "text"}
                placeholder={t("password")}
                className="placeholder-gray-400 placeholder:italic  ml-2 pl-20 pr-6 bg-gray-200 border text-2xl  border-transparent h-full form-control block w-full py-6  font-normal text-gray-700 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                {...register("password")}
              />

              <div className=" absolute top-4 right-5  text-4xl">
                {open === false ? (
                  <AiFillEye onClick={toggle} />
                ) : (
                  <AiFillEyeInvisible onClick={toggle} />
                )}
              </div>

              {/* errors will return when field validation fails  */}
              {errors.Password && (
                <span className="text-red-500 text-xs">
                  {errors.Password.message}
                </span>
              )}
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto mt-4">
                <a
                  href="#!"
                  className="inline-flex text-base font-bold sm:text-sm text-blue-500 hover:text-blue-700"
                >
                  {t("forgetPasse")}
                </a>
              </div>
            </div>

            <div className="flex w-full">
              <button
                title="login here"
                className="mb-1 mt-2 w-full flex items-center justify-center disabled:cursor-not-allowed cursor-pointer   py-4 bg-sky-700  
              text-2xl leading-snug uppercase rounded-xl shadow-md hover:bg-sky-800 hover:shadow-lg focus:bg-sky-800 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-sky-900 active:shadow-lg transition duration-150 ease-in-out "
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {" "}
                {!isSubmitting ? (
                  <>
                    <span className="mr-6 uppercas text-white font-extrabold hover:mr-4">
                      {t("btnconnect")}
                    </span>
                    <span>
                      <svg
                        className="h-10 w-10 font-extrabold text-white hover:ml-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </>
                ) : (
                  <div className=" flex justify-between items-center text-white mb-1">
                    loading{" "}
                    <div
                      className=" text-green-500 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-2"
                      role="status"
                    >
                      {/* <Spinner aria-label="Default status example" /> */}
                      <span className="visually-hidden"></span>
                    </div>
                  </div>
                )}
              </button>
            </div>
            {error && (
              <>
                <p className="text-red-800 text-xs uppercase text-center font-semibold">
                  {errorCredentia}
                </p>
              </>
            )}
          </form>
        </div>
        <Languageoption onChange={(e) => handleClick(e)} />
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
