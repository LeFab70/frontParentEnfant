import React from "react";
import { useQuery } from "react-query";
import { getMember } from "../../services/Member.Service";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../stores/members";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { addMemberPut } from "../../services/Member.Service";
//import moment from "moment"
import { getPeriods } from "../../services/Period.Service";
import dateFormat from "dateformat";
import { getVolets } from "../../services/Volet.Service";
//const timestamp = moment.unix(1634726212)
const AddChild = () => {
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };
  const { data } = useQuery("members", getMember);
  const queryClient = useQueryClient();

  const dataListVolet = useQuery("volets", getVolets);

  //console.log(dataListVolet.data);

  const allPeriods = useQuery("periods", getPeriods);
  const idValidePeriod = allPeriods.data?.filter(
    (period) => period.close === "oui"
  )[0].Id_period;

  useQuery("members", getMember);

  const mutatePost = useMutation({
    mutationFn: addMemberPut,
    onSuccess: () => {
      //queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("members");
      //console.log("object");
    },
    onError: (error) => {
      //console.log(error.response.data);
      console.log(error.response.status);
    },
  });
  const [allWifes, setAllWifes] = React.useState(
    data?.filter(
      (member) => member.id_parent !== null //&& member.type_of_member === "famille"
    )
  );
  const [members, setMembers] = React.useState(
    data?.filter(
      (member) =>
        member.id_parent === null &&
        member.id_conjoint === null &&
        member.type_of_member === "famille"
    )
  );
  // const [dataPrincipalMember, setDataPrincipalMember] = React.useState({});
  const [memberFind, setMemberFind] = React.useState();
  const [wife, setWife] = React.useState();
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(numberOfCard);
    //console.log(allWifes);
    // console.log(
    //   members?.filter(
    //     (member) => parseInt(member.card_member) === parseInt(numberOfCard)
    //   )
    // );
    // const allWifes = [...wifes];
    // console.log(allWifes)
    // setWifes(
    const wifeFilter = allWifes?.filter(
      (wife) => parseInt(wife.card_member) === parseInt(numberOfCard)
    );
    // );
    // console.log(wifeFilter);
    setWife(wifeFilter);
    //console.log(wife);
    const memberFind1 = members?.filter(
      (member) => parseInt(member.card_member) === parseInt(numberOfCard)
    );
    setMemberFind(memberFind1);
  };

  const dispatch = useDispatch();
  const {
    //Id_member,
    type_of_member,
    type_of_family,
    number_children_house,
    number_adult,
    fonction,
    card_member,
    sexe,
    lname,
    fname,
    codePostal_member,
    city_member,
    adress_member,
    email_member,
    phone_member,
    language,
    group_of_age,
    origineEthnique,
    sourceRevenue,
    level_of_school,
    family_income,
    remarks,
    how_know_us,
    autorisationPicture,
    fname_urgency,
    adresse_urgency,
    phone_urgency,
    lien_urgency,
    //email_urgency,
    // data of child
    allergies_connues,
    restrictions_foods,
    medicaments,
    eat_alone,
    rentreSeul,
    details_health,
    expirationHealth,
    numberHealth,
    health_info,
    birthday_child,
    school_child,
    autorisationDivulguerInfo,
    autorisationDivulgationDoctor,
    id_parent, //ici id du membre parent
    id_intervenant, //ici id du membre qui est intervenant

    //data conjoint
    id_conjoint, //ici id du membre qui est conjoint

    //pour la table hasmember
    Id_volet,
    Id_period,
  } = useSelector((state) => state.cardMember.member);
  const [dataToSave, setDataToSave] = React.useState({
    ...useSelector((state) => state.cardMember.member),
    Id_member: uuidv4(),
    status_member: "actif",
    Id_period: idValidePeriod,
    card_member: memberFind?.card_member,
    id_conjoint: memberFind?.Id_member,
  });

  React.useEffect(() => {
    //console.log(memberFind)
    setDataToSave({
      Id_member: uuidv4(),
      status_member: "actif",
      type_of_member: "famille",
      type_of_family,
      number_children_house,
      number_adult,
      level_of_school,
      fonction,
      card_member, //: memberFind[0]?.card_member,
      sexe,
      lname,
      fname,
      codePostal_member,
      city_member,
      adress_member,
      email_member,
      phone_member,
      language,
      group_of_age,
      origineEthnique,
      sourceRevenue,

      family_income,
      remarks,
      how_know_us,
      autorisationPicture,
      fname_urgency,
      adresse_urgency,
      phone_urgency,
      lien_urgency,
      //email_urgency,
      // data of child
      allergies_connues,
      restrictions_foods,
      medicaments,
      eat_alone,
      rentreSeul,
      details_health,
      expirationHealth,
      numberHealth,
      health_info,
      birthday_child,
      school_child,
      autorisationDivulguerInfo,
      autorisationDivulgationDoctor,
      id_parent, //ici id du membre parent
      id_intervenant, //ici id du membre qui est intervenant

      //data conjoint
      id_conjoint, //: memberFind[0]?.Id_member, //ici id du membre qui est conjoint

      //pour la table hasmember
      Id_volet,
      Id_period: idValidePeriod,
    });
  }, [
    memberFind,
    // memberFind.Id_member,
    idValidePeriod,
    type_of_member,
    type_of_family,
    number_children_house,
    number_adult,
    fonction,
    card_member,
    sexe,
    lname,
    fname,
    codePostal_member,
    city_member,
    adress_member,
    email_member,
    phone_member,
    language,
    group_of_age,
    origineEthnique,
    sourceRevenue,
    level_of_school,
    family_income,
    remarks,
    how_know_us,
    autorisationPicture,
    fname_urgency,
    adresse_urgency,
    phone_urgency,
    lien_urgency,
    //email_urgency,
    // data of child
    allergies_connues,
    restrictions_foods,
    medicaments,
    eat_alone,
    rentreSeul,
    details_health,
    expirationHealth,
    numberHealth,
    health_info,
    birthday_child,
    school_child,
    autorisationDivulguerInfo,
    autorisationDivulgationDoctor,
    id_parent, //ici id du membre parent
    id_intervenant, //ici id du membre qui est intervenant

    //data conjoint
    id_conjoint, //ici id du membre qui est conjoint

    //pour la table hasmember
    Id_volet,
    Id_period,
  ]);
  const clearAllFields = () => {
    dispatch(
      addMember({
        fname: "",
        lname: "",
        card_member: "",
        type_of_member: "famille",
        type_of_family: null,
        adress_member: null,
        city_member: null,
        email_member: null,
        codePostal_member: null,
        number_children_house: 0,
        number_adult: 0,
        fonction: null,
        sexe: "M",
        phone_member: null,
        language: "",
        group_of_age: null,
        origineEthnique: null,
        sourceRevenue: null,
        level_of_school: null,
        family_income: null,
        remarks: null,
        how_know_us: null,
        autorisationPicture: "non",
        fname_urgency: "",
        adresse_urgency: null,
        phone_urgency: "",
        lien_urgency: "",
        //email_urgency,
        // data of child
        allergies_connues: null,
        restrictions_foods: null,
        medicaments: null,
        eat_alone: null,
        rentreSeul: "non",
        details_health: "",
        expirationHealth: new Date(),
        numberHealth: "",
        health_info: "",
        birthday_child: new Date(),
        school_child: "",
        autorisationDivulguerInfo: "non",
        autorisationDivulgationDoctor: "non",
        id_parent: null, //ici id du membre parent
        id_intervenant: null, //ici id du membre qui est intervenant

        //data conjoint
        id_conjoint: null, //ici id du membre qui est conjoint

        //pour la table hasmember
        Id_volet: null,
        Id_period: null,
      })
    );
  };
  // const handleChangePhone = (phone_member) => {
  //   dispatch(addMember({ phone_member }));
  // };
  React.useEffect(() => {
    setMembers(
      data?.filter(
        (member) =>
          member.id_parent === null &&
          member.id_conjoint === null &&
          member.type_of_member === "famille"
      )
    );

    setAllWifes(
      data?.filter(
        (member) => member.id_parent !== null //&& member.type_of_member === "famille"
      )
    );
    //setChild(data?.filter((member) => member.id_parent !== null));
  }, [data]);
  //console.log(members);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const memberObjet = memberFind && memberFind[0];
      //   setDataToSave({
      //     ...dataToSave,
      //     id_conjoint: memberObjet.Id_member,
      //     card_member: memberObjet.card_member,
      //   });
      const dataTo = {
        ...dataToSave,
        id_parent: memberObjet.Id_member,
        card_member: memberObjet.card_member,
      };
      //console.log(dataTo);
      // console.log(memberObjet);
      //return;
      if (dataTo) {
        await wait(2000);
        const post = await mutatePost
          .mutateAsync(dataTo)
          .then((res) => res)
          .catch((error) => console.log(error));
        // if (mutatePost.isError) console.log(mutatePost.error);
        //   .then((res) => {
        //     toast.success("volet created successfully");
        // console.log(post);
        if (post.status !== 409 && post.status !== 500) {
          toast.success("Membre/enfant created successfully");
          handleSearch(e);
          clearAllFields();
         
        } else {
          //console.log(post);
          if (post.status === 409) toast.error("Membre deja enregistre");
          if (post.status === 500)
            toast.error(post.data.error + ": erreur serveur");
          throw new Error(post.data.error);
        }
        // reset({
        //   label_volet: "",
        //   description_volet: "",
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [numberOfCard, setNumberOfCard] = React.useState("");
  console.log(numberOfCard);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addMember({ [name]: value }));
  };

  //console.log(dataListVolet.data)
  const getNameVolet = (idVolet) => {
    const nameVolet =
      dataListVolet.data &&
      dataListVolet.data.find((volet) => volet.Id_volet === idVolet);
    return nameVolet.label_volet;
  }; //

  //getNameVolet(33)
  return (
    <div className="h-screen bg-white px-1 py-2 sm:py-2 lg:px-4 overflow-scroll ">
      <div className="mx-auto mt-2 max-w-7xl sm:mt-2">
        <div>
          <label
            htmlFor="fonction"
            className="block text-sm font-semibold leading-6 text-sky-600"
          >
            Numero de la carte du membre
            <span className="text-red-600"> *</span>
          </label>
          <div className="-mt-4">
            <input
              type="number"
              required
              //id="fonction"
              className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
              onChange={(e) => {
                handleSearch(e);
                setNumberOfCard(e.target.value);
              }}
              value={numberOfCard || ""}
            />
          </div>

          <div className="mt-2  flex justify-center items-center space-x-5">
            <button
              type="button"
              className="uppercase block  rounded-md bg-sky-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition ease-in-out duration-200"
              onClick={(e) => {
                handleSearch(e);
              }}
            >
              Trouver le membre
            </button>
            <span className="text-red-700 text-xs uppercase">
              membre trouve: {memberFind?.length}{" "}
            </span>

            <span className="text-red-700 text-xs uppercase">
              Enfant(s) trouve(s): {wife?.length}{" "}
            </span>
          </div>
        </div>

        {memberFind &&
          memberFind.map((member, index) => (
            <div
              key={index}
              className="mt-6 grid gap-2  grid-cols-1 sm:grid-cols-5 text-xs uppercase"
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
                <span className="text-red-800 underline">Telephone:</span>{" "}
                {member?.phone_member}
              </span>
              <span>
                {" "}
                <span className="text-red-800 underline">Adresse:</span>{" "}
                {member?.adress_member}
              </span>

              <span>
                {" "}
                <span className="text-red-800 underline">sexe:</span>{" "}
                {member?.sexe}
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

        {wife &&
          wife.map((member, index) => (
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
      </div>
      <form
        className="mx-auto h-full mt-2 max-w-7xl sm:mt-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className=" text-base grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="fname"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Prenom<span className="text-red-600"> *</span>
            </label>
            <div className="-mt-4">
              <input
                type="text"
                required
                id="fname"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="fname"
                value={fname || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lname"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Nom<span className="text-red-600"> *</span>
            </label>
            <div className="-mt-4">
              <input
                type="text"
                required
                id="lname"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="lname"
                value={lname || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="school_child"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Ecole frequentee<span className="text-red-600"> *</span>
            </label>
            <div className="-mt-4">
              <input
                type="text"
                required
                id="school_child"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="school_child"
                value={school_child || ""}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div>
                <label
                  htmlFor="sexe"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Sexe<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="sexe"
                    onChange={handleChange}
                    name="sexe"
                    value={sexe || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose sex--</option>

                    <option value="M" selected>
                      {" "}
                      M
                    </option>
                    <option value="F"> F</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="rentreSeul"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Rentre seul?<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="rentreSeul"
                    onChange={handleChange}
                    name="rentreSeul"
                    value={rentreSeul || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="non" selected>
                      {" "}
                      non
                    </option>
                    <option value="oui"> oui</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="level_of_school"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Niveau scolaire<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    required
                    type="text"
                    id="level_of_school"
                    onChange={handleChange}
                    name="level_of_school"
                    value={level_of_school || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="birthday_child"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Date de naissance<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="date"
                    required
                    id="birthday_child"
                    onChange={handleChange}
                    name="birthday_child"
                    value={birthday_child || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="numberHealth"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  N carte sante<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="numberHealth"
                    className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="numberHealth"
                    value={numberHealth || ""}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="expirationHealth"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Date expiration<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="date"
                    required
                    id="expirationHealth"
                    onChange={handleChange}
                    name="expirationHealth"
                    value={expirationHealth || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-5">
              <div>
                <label
                  htmlFor="autorisationPicture"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Photo?<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="autorisationPicture"
                    onChange={handleChange}
                    name="autorisationPicture"
                    value={autorisationPicture || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="oui" selected>
                      {" "}
                      oui
                    </option>
                    <option value="non"> non</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="autorisationDivulguerInfo"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Divulguer info?<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="autorisationDivulguerInfo"
                    onChange={handleChange}
                    name="autorisationDivulguerInfo"
                    value={autorisationDivulguerInfo || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="non" selected>
                      {" "}
                      non
                    </option>
                    <option value="oui"> oui</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="autorisationDivulgationDoctor"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Divulguer info docteur?
                  <span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="autorisationDivulgationDoctor"
                    onChange={handleChange}
                    name="autorisationDivulgationDoctor"
                    value={autorisationDivulgationDoctor || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="non" selected>
                      {" "}
                      non
                    </option>
                    <option value="oui"> oui</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="restrictions_foods"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Restrictions aliments?<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="restrictions_foods"
                    onChange={handleChange}
                    name="restrictions_foods"
                    value={restrictions_foods || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="non" selected>
                      {" "}
                      non
                    </option>
                    <option value="oui"> oui</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="eat_alone"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  mange seul?<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <select
                    required
                    id="eat_alone"
                    onChange={handleChange}
                    name="eat_alone"
                    value={eat_alone || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose--</option>

                    <option value="non" selected>
                      {" "}
                      non
                    </option>
                    <option value="oui"> oui</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-5">
              <div>
                <label
                  htmlFor="medicaments"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Medicaments<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="medicaments"
                    onChange={handleChange}
                    name="medicaments"
                    value={medicaments || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="health_info"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Info sante<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="health_info"
                    onChange={handleChange}
                    name="health_info"
                    value={health_info || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="details_health"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  ++Details<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="details_health"
                    onChange={handleChange}
                    name="details_health"
                    value={details_health || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="allergies_connues"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  allergies connues<span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="allergies_connues"
                    onChange={handleChange}
                    name="allergies_connues"
                    value={allergies_connues || ""}
                    className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="Id_volet"
                  className=" block  font-semibold leading-6 text-sky-600 uppercase"
                >
                  Inscrit au volet?
                </label>
                <div className="-mt-1">
                  <select
                    required
                    id="Id_volet"
                    onChange={handleChange}
                    name="Id_volet"
                    value={Id_volet || ""}
                    className=" invalid:text-gray-200 invalid:text-xs block  w-full uppercase peer px-4 
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                  >
                    <option value="">--Please choose an option--</option>
                    {/* <optgroup label="Type de membre"> */}
                    {/* <option></option> */}
                    {dataListVolet.data &&
                      dataListVolet.data.map((volet) => (
                        <option key={volet.Id_volet} value={volet.Id_volet}>
                          {volet.label_volet}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2  flex justify-center">
          <button
            type="submit"
            className={`${
              memberFind?.length === 0 ? "disabled:cursor-not-allowed" : null
            }  uppercase block  rounded-md bg-sky-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition ease-in-out duration-200`}
            disabled={memberFind?.length === 0 ? true : false}
          >
            Enregistrer l'enfant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChild;
