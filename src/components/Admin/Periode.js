import React from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSave } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { FcLock } from "react-icons/fc";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  addPeriods,
  getPeriods,
  alterPeriods,
  deletePeriods,
} from "../../services/Period.Service";
const Periode = () => {
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };
  //console.log(new Date().toDateString());
  const schema = yup
    .object({
      start_date: yup.date().required("fournir la date: Required"),
      end_date: yup.date().required("Fournir la date"),
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
      start_date: new Date().toDateString(),
      end_date: new Date().toDateString(),
    },
  });

  const queryClient = useQueryClient();

  //put---created periods
  const mutatePost = useMutation({
    mutationFn: addPeriods,
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("periods");
      //console.log("object");
    },
    onError: (error) => {
      //console.log(error.response.data);
      console.log(error.response.status);
    },
  });

  //post==delete period
  const mutateDelete = useMutation(deletePeriods, {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("periods");
    },
  });
  const onSubmit = async (data, e, response) => {
    e.preventDefault();
    //console.log(data);
    try {
      await wait(2000);
      if (data) {
        const post = await mutatePost
          .mutateAsync(data)
          .then((res) => res)
          .catch((error) => console.log(error));
        // if (mutatePost.isError) console.log(mutatePost.error);
        //   .then((res) => {
        //     toast.success("volet created successfully");
        // console.log(post);
        if (post.status !== 409 && post.status !== 500)
          toast.success("periode created successfully");
        else {
          toast.error("periode non enregistre");

          throw new Error(post.message);
        }
        reset({
          start_date: new Date().toDateString(),
          end_date: new Date().toDateString(),
        });
      }
    } catch (error) {
      //getError(error);
      //toast.error("volet non enregistre");
      //console.log(mutatePost.error);
      console.log(error);
    }
  };

  //get
  const { isLoading, error, data, isFetching } = useQuery(
    "periods",
    getPeriods
  );
  //patch==update periode
  const mutateUpdate = useMutation({
    mutationFn: alterPeriods,
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("periods");
    },
  });
  // recuperer id period
  //const [idperiod, setIdPeriod] = React.useState("");

  const updatePeriod = async (id) => {
    // const dataToUpdate = { close: "oui" };
    //console.log({ id});
    const periode = await mutateUpdate
      .mutateAsync(id)
      .then((res) => res)
      .catch((error) => console.log(error));
    console.log(periode);
    if (periode.status === 201) toast.success("periode updated successfully");
    else {
      toast.error("periode non mis a jour " + periode.data.message);

      throw new Error(periode.data.message);
    }
  };
  const columns = [
    {
      name: <span className="font-extrabold text-red-900 text-xl">ID</span>,
      selector: (row) => row.Id_period,
      width: "10%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-xl">Debut</span>,
      selector: (row) => row.start_date,
      sortable: true,
      width: "20%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-xl">Fin</span>,
      selector: (row) => row.end_date,
      sortable: true,
      width: "20%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Cloturer?</span>
      ),
      selector: (row) => (
        <span
          className={`text-gray-100 px-6 text-xl rounded-lg py-1 font-bold ${
            row.close.toLowerCase() === "oui" ? "bg-red-500" : "bg-green-700"
          }`}
        >
          {" "}
          {row.close}{" "}
        </span>
      ),
      sortable: true,
      width: "20%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Actions</span>
      ),
      cell: (row) => (
        <div className="flex justify-center gap-x-4 text-xl w-full">
          <button
            onClick={() => {
              //setIdPeriod(row.Id_period);
              updatePeriod(row.Id_period);
              reset({
                start_date: new Date().toDateString(),
                end_date: new Date().toDateString(),
              });
            }}
            className=" text-gray-100 px-4 uppercase my-1 rounded-md  cursor-pointer transition ease-in-out duration-150 font-extrabold text-2xl"
          >
            <FcLock />
          </button>
          <button
            onClick={async () => {
              await mutateDelete.mutate(row.Id_period);
            }}
            className=" text-red-900 font-extrabold"
          >
            <IoTrashBin />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "20%",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        fontSize: "1rem",
        fontWeight: "900",
        textTransform: "uppercase",
        backgroundColor: "#aecae8",
      },
    },

    cells: {
      style: {
        fontSize: "0.75rem",
      },
    },
  };
  if (error) return <p>`An error has occurred: ${error.message}`</p>;
  if (isLoading) return <p>is isLoading......</p>;

  return (
    <div className="flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%]  bg-slate-50 rounded-lg text-base text-center shadow-lg shadow-gray-500 px-4 py-6 "
      >
        <div className=" mb-1 relative">
          <label className="grid grid-cols-4 items-center">
            Date de Debut:
            <input
              type="date"
              required
              className="col-span-3 placeholder-gray-400 placeholder:italic uppercase ml-2 pl-2 pr-6  bg-sky-100  border border-transparent  form-control block w-full py-2  font-normal text-gray-900 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
              {...register("start_date")}
            />
          </label>
          {/* errors will return when field validation fails  */}
          {errors.start_date && (
            <span className="text-red-500 text-sm font-bold mb-2   absolute block">
              {errors.start_date.message}
            </span>
          )}
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div className="mb-1 relative">
          <label className="grid grid-cols-4 items-center">
            Date de fin:
            <input
              type="date"
              required
              className="col-span-3 placeholder-gray-400 placeholder:italic uppercase  ml-2 pl-2 pr-6 bg-sky-100 border  border-transparent h-full form-control block w-full py-2  font-normal text-gray-900 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
              {...register("end_date")}
            />
          </label>
          {/* errors will return when field validation fails  */}
          {errors.end_date && (
            <span className="text-red-500 text-sm font-bold mb-2   absolute block">
              {errors.end_date}
            </span>
          )}
        </div>

        <div className="flex w-full items-center justify-center">
          <button
            className="  mt-2 w-fit px-4 flex items-center justify-center disabled:cursor-not-allowed cursor-pointer   py-2 bg-sky-700  
              text-xl leading-snug uppercase rounded-xl shadow-md hover:bg-sky-800 hover:shadow-lg focus:bg-sky-800 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-sky-900 active:shadow-lg transition duration-150 ease-in-out "
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {" "}
            {!isSubmitting ? (
              <>
                <span className="mr-6 uppercas text-white font-extrabold hover:mr-4">
                  "enregistrer"
                </span>
                <span className="text-white text-2xl font-extrabold hover:ml-4">
                  <AiOutlineSave />
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
      </form>

      <div className="mt-2 bg-sky-100 p-1 rounded-lg shadow-xl shadow-white w-[90%] uppercase ">
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          customStyles={customStyles}
          // subHeaderComponent={
          //   <>
          //     <input
          //       type="text"
          //       placeholder="Rechercher un volet"
          //       // onChange={handleFilter}
          //       className="ml-2 border-2 px-6 text-base border-sky-800 rounded-md w-[50%] outline-none"
          //     />
          //   </>
          // }
          subHeaderAlign="right"
          pagination
          dense
          fixedHeader
          direction="auto"
        />
      </div>

      <div>{isFetching ? "Data Updating..." : ""}</div>
    </div>
  );
};

export default Periode;
