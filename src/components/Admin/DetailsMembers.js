import React from "react";
import dateFormat from "dateformat";
import { getVolets } from "../../services/Volet.Service";
import { useQuery } from "react-query";
const DetailsMembers = ({ isVisible, members, closeModal }) => {
  const dataListVolet = useQuery("volets", getVolets);
  if (!isVisible) return null;
  console.log(members, members[2].length);
  const totalWife = members[2].length;
  const totalchild = members[1].length;

  const getNameVolet = (idVolet) => {
    const nameVolet =
      dataListVolet.data &&
      dataListVolet.data.find((volet) => volet.Id_volet === idVolet);
    return nameVolet.label_volet;
  };
  return (
    <div className="fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center  ">
      <div className="w-full min-h-full px-10 py-40 -mt-10 flex flex-col">
        <button
          className="text-white text-xl place-self-end bg-red-400 rounded-lg px-2 my-2"
          onClick={() => closeModal(!isVisible)}
        >
          <span className="text-red-900 font-extrabold"> X </span> close
        </button>
        <div className="bg-white p-2 rounded-lg">
          {members[0] &&
            members[0].map((member, index) => (
              <div
                key={index}
                className="mt-4 mb-1 grid gap-2  grid-cols-1 sm:grid-cols-5 text-xs uppercase"
              >
                <span>
                  {" "}
                  <span className="text-red-800 underline">Card:</span>{" "}
                  {member?.card_member}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">Nom:</span>{" "}
                  {member?.fname}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">Prenom:</span>{" "}
                  {member?.lname}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    Telephone:
                  </span>{" "}
                  {member?.phone_member}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">Adresse:</span>{" "}
                  {member?.adress_member}
                </span>

                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    how_know_us:
                  </span>{" "}
                  {member?.how_know_us}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    {" "}
                    fname_urgency:
                  </span>{" "}
                  {member?.fname_urgency}
                </span>

                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    phone_urgency:
                  </span>{" "}
                  {member?.phone_urgency}
                </span>

                <span>
                  {" "}
                  <span className="text-red-800 underline">sexe:</span>{" "}
                  {member?.sexe}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    Type famille:
                  </span>{" "}
                  {member?.type_of_famille}
                </span>

                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    number_children_house:
                  </span>{" "}
                  {member?.number_children_house}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    sourceRevenue:
                  </span>{" "}
                  {member?.sourceRevenue}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    family_income:
                  </span>{" "}
                  {member?.family_income}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    Type member:
                  </span>{" "}
                  {member?.type_of_member}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    Autorisation photo:
                  </span>{" "}
                  {member?.autorisationPicture}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    group_of_age:
                  </span>{" "}
                  {member?.group_of_age}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    langue parlee:
                  </span>{" "}
                  {member?.language}
                </span>
                <span>
                  {" "}
                  <span className="text-red-800 underline">
                    origineEthnique:
                  </span>{" "}
                  {member?.origineEthnique}
                </span>
              </div>
            ))}

          <hr className="h-4 bg-slate-900 my-2 rounded-sm " />
          <span>Total d'Enfants:({totalchild})</span>
          {members[1] &&
            members[1].map((member, index) => (
              <div
                key={index}
                className="mt-2 grid gap-1  grid-cols-1 sm:grid-cols-10 text-xs uppercase"
              >
                <span className="text-red-500 uppercase underline font-extrabold text-xl">
                  {" "}
                  enfant{index + 1}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Card_enfant:
                  </span>{" "}
                  {member?.card_member}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Nom_enfant:
                  </span>{" "}
                  {member?.fname}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Prenom_enfant:
                  </span>{" "}
                  {member?.lname}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">Ecole:</span>{" "}
                  {member?.school_child}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    sexe_enfant:
                  </span>{" "}
                  {member?.sexe}
                </span>

                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    naissance:
                  </span>{" "}
                  {dateFormat(member?.birthday_child, "dd/mm/yyyy")}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Autorisation photo:
                  </span>{" "}
                  {member?.autorisationPicture}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Assurance maladie:
                  </span>{" "}
                  {member?.numberHealth}-du-
                  {dateFormat(member?.expirationHealth, "dd/mm/yyyy")}
                </span>

                <span>
                  {" "}
                  <span className="text-purple-900 font-extrabold underline">
                    Volet:
                  </span>{" "}
                  {getNameVolet(member?.Has_members[0].Id_volet)}
                </span>
              </div>
            ))}
          <hr className="h-4 bg-slate-900 my-2 rounded-sm " />
          {/* conjoints */}
          {members[2] &&
            members[2].map((member, index) => (
              <div
                key={index}
                className="mt-2 grid gap-2  grid-cols-1 sm:grid-cols-8 text-xs uppercase"
              >
                <span className="text-red-900 underline">
                  {" "}
                  Conjoint(e ) ({totalWife}):{" "}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Card_conjoint(e) :
                  </span>{" "}
                  {member?.card_member}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Nom_conjoint(e):
                  </span>{" "}
                  {member?.fname}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Prenom_conjoint(e):
                  </span>{" "}
                  {member?.lname}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    Telephone_conjoint(e):
                  </span>{" "}
                  {member?.phone_member}
                </span>
                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    sexe_conjoint(e):
                  </span>{" "}
                  {member?.sexe}
                </span>

                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    group_of_age:
                  </span>{" "}
                  {member?.group_of_age}
                </span>

                <span>
                  {" "}
                  <span className="text-green-800 underline">
                    langue parlee:
                  </span>{" "}
                  {member?.language}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsMembers;
