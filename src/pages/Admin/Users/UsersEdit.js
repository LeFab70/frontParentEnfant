import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
//import { useNavigate } from "react-router-dom";
import { serviceUsers } from "../../../services";

const UsersEdit = () => {
  const [error, setError] = React.useState(false);
  //const navigate = useNavigate();
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };
  const schema = yup
    .object({
      role: yup.string("definir le role").required("Required"),
      name: yup.string().required("Required"),
      pseudo: yup.string().required("Required").max(6, "maximum 6caracteres"),
      password: yup
        .string()
        .required()
        .min(6, "Password length should be at least 6 characters")
        .max(12, "Password cannot exceed more than 12 characters"),
      confirmpassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "password does not match"),
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
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: serviceUsers.addUser,
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("users");
      //console.log("object");
    },
    onError: (error) => {
      //console.log(error.response.data);
      console.log(error.response.status);
    },
  });

  // useMutation((data) => {
  //   serviceUsers.addUser(data);
  // });
  const onSubmit = async (data, e, response) => {
    e.preventDefault();
    try {
      const users = { ...data, Id_role: 1, status: "actif" };
      //console.log(users);
      await wait(2000);
      //return;
      //const mutation =useMutation((DATA) => {
      //serviceUsers
      // .addUser(data)
      if (users) {
        const post = await mutation
          .mutateAsync(users)
          .then((res) => res)
          .catch((error) => {
            setError((state) => true);
            console.log(error);
          });

        if (post.status !== 409 && post.status !== 500) {
          toast.success("user created successfully");
          setError((state) => false);
        } else {
          toast.error("user non enregistre");

          throw new Error(post.message);
        }
        reset({
          name: "", //'new Date().toDateString(),
          pseudo: "",
          password: "",
          confirmpassword: "", // new Date().toDateString(),
        });

        //});
      }
    } catch (error) {
      toast.error("user non enregistre");
      console.log(error);
      // console.log(error.AxiosError.response)
      // setError(true);
    }
    //save(data);
  };

  return (
    <>
      {mutation.isLoading ? (
        "Adding user..."
      ) : (
        <div className="flex justify-center">
          <div className=" xl:ml-4 xl:w-10/12 lg:w-10/12 md:w-10/12 mb-4 md:mb-0 bg-sky-50 p-2 rounded-xl shadow-xl shadow-sky-100 ring-1 ring-sky-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="uppercase text-center font-semibold mx-4 mb-0">
                  creer un utilisateur
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Nom utilisateur"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("name")}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="pseudo max 6 caracteres"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("pseudo")}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.pseudo && (
                    <span className="text-red-500 text-xs">
                      {errors.pseudo.message}
                    </span>
                  )}
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <div>
                  <input
                    type="Password"
                    placeholder="Password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("password")}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.Password && (
                    <span className="text-red-500 text-xs">
                      {errors.Password.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    type="Password"
                    placeholder="Confirmez le Password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("confirmpassword")}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.confirmpassword && (
                    <span className="text-red-500 text-xs">
                      {errors.confirmpassword.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="sexe"
                    className="block text-sm font-semibold leading-6 text-sky-600"
                  >
                    Role<span className="text-red-600"> *</span>
                  </label>
                  <div className="-mt-4">
                    <select
                      required
                      id="role"
                      {...register("role")}
                      className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                    >
                      <option value="">--Please choose sex--</option>

                      <option value="admin" selected>
                        {" "}
                        admin
                      </option>
                      <option value="invite">invite</option>
                    </select>

                    {errors.role && (
                      <span className="text-red-500 text-xs">
                        {errors.role.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-2 flex justify-end items-end">
                  <button
                    className=" disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    {" "}
                    {!isSubmitting ? (
                      "Enregisterer user"
                    ) : (
                      <div className=" flex justify-between items-center">
                        loading{" "}
                        <div
                          className=" text-green-500 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                          role="status"
                        >
                          {/* <Spinner aria-label="Default status example" /> */}
                          <span className="visually-hidden"></span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
            {error && (
              <span className="text-red-500 text-xs uppercase text-center">
                erreur lors de la sauvegarde de l'utilisateur
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UsersEdit;
