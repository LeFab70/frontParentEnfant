import React from "react";
import DataTable from "react-data-table-component";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IoTrashBin } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { getVolets } from "../../services/Volet.Service";
import { getMember, deleteMember } from "../../services/Member.Service";
import DetailsMembers from "./DetailsMembers";

const ListOfMember = () => {
  //get
  const { isLoading, error, data, isFetching } = useQuery("members", getMember);
  // recuperer juste ceux des membres dont conjoint==null ceci permet davoir juste un seul membre card
  // let onlyMembersWithPrincipalCard = data?.filter(
  //   (member) => member.id_conjoint === null
  // );
  // console.log(onlyMembersWithPrincipalCard);

  const [showModal, setShowModal] = React.useState(false);
  const [detailsMembers, setDetailsMembers] = React.useState([]);
  const [volet, setVolet] = React.useState(
    data?.filter(
      (member) => member.id_parent === null && member.id_conjoint === null
    )
  );
  React.useEffect(() => {
    setVolet(
      data?.filter(
        (member) => member.id_parent === null && member.id_conjoint === null
      )
    );
  }, [data]);

  const queryClient = useQueryClient();

  //post==delete member
  const mutateDelete = useMutation(deleteMember, {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("members");
    },
  });

  const dataListVolet = useQuery("volets", getVolets);
  //console.log(dataListVolet.data);

  const getNameVolet = (idVolet) => {
    // console.log(idVolet);
    if (idVolet) {
      const nameVolet =
        dataListVolet.data &&
        dataListVolet.data.find((volet) => volet?.Id_volet === idVolet);
      if (nameVolet) return nameVolet.label_volet;
      else return null;
    }
  };
  const handleDelete = async (id) => {
    if (id) {
      mutateDelete.mutate(id);
    }
  };

  const handleDetails = async (id) => {
    const memberPrincipal = volet?.filter((member) => member.Id_member === id);

    const memberConjoint = data?.filter((member) => member.id_conjoint === id);
    const memberChild = data?.filter((member) => member.id_parent === id);
    const globalMember = [];
    globalMember.push(memberPrincipal, memberChild, memberConjoint);
    console.log(globalMember);
    setDetailsMembers(globalMember);
  };
  const columns = [
    {
      name: <span className="font-extrabold text-red-900 text-base">ID</span>,
      selector: (row) => (row.Id_member ? row.Id_member : null),
      width: "0%",
    },

    {
      name: <span className="font-extrabold text-red-900 text-xs">card</span>,
      selector: (row) => (row.card_member ? row.card_member : null),
      width: "7%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-base">prenoms</span>
      ),
      selector: (row) => (row.fname ? row.fname : ""),
      sortable: true,
      width: "8%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-base">noms</span>,
      selector: (row) => (row.lname ? row.lname : ""),
      sortable: true,
      width: "7%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xs">
          type de membre
        </span>
      ),
      selector: (row) => (row.type_of_member ? row.type_of_family : ""),
      sortable: true,
      width: "10%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xs">Contact</span>
      ),
      selector: (row) => (row.phone_member ? row.phone_member : ""),
      sortable: true,
      width: "10%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xs">
          type de famille
        </span>
      ),
      selector: (row) => (
        <span className="text-xs ">
          {" "}
          {row.type_of_family ? row.type_of_family : ""}
        </span>
      ),
      sortable: true,
      width: "9%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xs">language</span>
      ),
      selector: (row) => (row.language ? row.language : ""),
      sortable: true,
      width: "9%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xs">Auto.Photo?</span>
      ),
      selector: (row) =>
        row.autorisationPicture ? row.autorisationPicture : "",
      sortable: true,
      width: "9%",
    },

    {
      name: <span className="font-extrabold text-red-900 text-xs">volet?</span>,
      selector: (row) =>
        //{getNameVolet(member?.Has_members[0].Id_volet)}
        getNameVolet(row.Has_members[0]?.Id_volet)
          ? getNameVolet(row.Has_members[0]?.Id_volet)
          : "",
      sortable: true,
      width: "8%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Actions</span>
      ),
      cell: (row) => (
        <div className="flex justify-center gap-x-4 text-2xl w-full">
          <button
            onClick={() => {
              setShowModal(true);
              handleDetails(row.Id_member ? row.Id_member : 0);
            }}
            className=" text-teal-900 mx-2 font-extrabold"
          >
            {" "}
            <IoEyeSharp />
          </button>
          <button
            onClick={() => {
              handleDelete(row.Id_member ? row.Id_member : 0);
            }}
            className=" text-red-900 font-extrabold"
          >
            {" "}
            <IoTrashBin />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "10%",
    },
  ];
  const title = (
    <span className="text-sky-700 text-base font-bold">
      liste des Membres disponibles
    </span>
  );
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

  const handleFilter = (e) => {
    //if (e.target.value === " ") setVolet(data);

    if (data) {
      const newVolets = data.filter((row) => {
        return row.lname.toLowerCase().match(e.target.value.toLowerCase());
      });
      setVolet(newVolets);
    }
  };

  if (error) return "An error has occurred: " + error.message;
  if (isLoading) return <p>is isLoading......</p>;

  return (
    <>
      <div className="mt-2 bg-sky-100 p-1 rounded-lg shadow-xl shadow-white w-[100%] uppercase ">
        <DataTable
          columns={columns}
          data={volet ? volet : null}
          selectableRows
          // selectableRowsHighlight
          //highlightOnHover
          subHeader
          customStyles={customStyles}
          subHeaderComponent={
            <>
              {title}
              <input
                type="text"
                placeholder="Rechercher un membre"
                onChange={handleFilter}
                className="ml-2 border-2 px-6 text-base border-sky-800 rounded-md w-[50%] outline-none"
              />
            </>
          }
          subHeaderAlign="right"
          pagination
          dense
          //fixedHeader
          direction="auto"
        />
      </div>

      <div>{isFetching ? "Data Updating..." : ""}</div>
      <DetailsMembers
        isVisible={showModal}
        members={detailsMembers}
        closeModal={setShowModal}
      />
    </>
  );
};

export default ListOfMember;
