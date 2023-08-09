import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../stores/members";
import { v4 as uuidv4 } from "uuid";
import PhoneInput from "react-phone-input-2";
import Typewriter from "typewriter-effect";
import "react-phone-input-2/lib/material.css";
import fr from "react-phone-input-2/lang/fr.json";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addMemberPut } from "../../services/Member.Service";
import { getVolets } from "../../services/Volet.Service";
import { getMember } from "../../services/Member.Service";
import { getPeriods } from "../../services/Period.Service";
const NewMember = () => {
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };

  const queryClient = useQueryClient();
  //get volet
  // const { data } = useQuery("volets", getVolets);

  // //get volet et period
  const { data } = useQuery("volets", getVolets);
  const allPeriods = useQuery("periods", getPeriods);
  const idValidePeriod = allPeriods.data?.filter(
    (period) => period.close === "oui"
  )[0].Id_period;
  //console.log(allPeriods.data);
  //console.log('idperiod')
  //console.log(idValidePeriod)
  //const [volets, setVolets] = React.useState([]);
  // let volets = [...data];
  // console.table(volets);
  // React.useEffect(() => {
  //   setVolets(data);
  // }, [data]);
  //put---created volets
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

  const [dataToSave, setDataToSave] = React.useState({
    ...useSelector((state) => state.cardMember.member),
    Id_member: uuidv4(),
    status_member: "actif",
    Id_period: idValidePeriod,
  });
  //const queryClient = useQueryClient();
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
    //expirationHealth,
    numberHealth,
    health_info,
    //birthday_child,
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

  React.useEffect(() => {
    setDataToSave({
      Id_member: uuidv4(),
      status_member: "actif",
      type_of_member,
      type_of_family,
      number_children_house,
      number_adult,
      level_of_school,
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
      //expirationHealth,
      numberHealth,
      health_info,
     // birthday_child,
      school_child,
      autorisationDivulguerInfo,
      autorisationDivulgationDoctor,
      id_parent, //ici id du membre parent
      id_intervenant, //ici id du membre qui est intervenant

      //data conjoint
      id_conjoint, //ici id du membre qui est conjoint

      //pour la table hasmember
      Id_volet,
      Id_period: idValidePeriod,
    });

    if (type_of_member === "famille") setTypeOfFamily(true);
    else if (type_of_member === "Employe") setFonctionEmployer(true);
    else {
      // console.log(name);
      setTypeOfFamily(false);
      setFonctionEmployer(false);
    }
  }, [
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
    //expirationHealth,
    numberHealth,
    health_info,
   // birthday_child,
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
    //localStorage.removeItem("persist:root");
    // fname.value = "";
    // lname.value = "";
    // card_member.value = "";

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
        //expirationHealth: "",
        numberHealth: "",
        health_info: "",
       // birthday_child: new Date().getDate(),
        school_child: "",
        autorisationDivulguerInfo: "non",
        autorisationDivulgationDoctor: "non",
        id_parent: null, //ici id du membre parent
        id_intervenant: null, //ici id du membre qui est intervenant

        //data conjoint
        id_conjoint:null, //ici id du membre qui est conjoint

        //pour la table hasmember
        Id_volet: null,
        Id_period: null,
      })
    );
    setTypeOfFamily(true);
  };
  // envoie des data au server
  //console.log(dataVolets)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(dataToSave);
      //return;
      if (dataToSave) {
        await wait(2000);
        const post = await mutatePost
          .mutateAsync(dataToSave)
          .then((res) => res)
          .catch((error) => console.log(error));
        // if (mutatePost.isError) console.log(mutatePost.error);
        //   .then((res) => {
        //     toast.success("volet created successfully");
        // console.log(post);
        if (post.status !== 409 && post.status !== 500) {
          toast.success("Membre created successfully");
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
  const [typeOfFamily, setTypeOfFamily] = React.useState(false);
  const [fonctionEmployer, setFonctionEmployer] = React.useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(addMember({ [name]: value }));

    if (name === "type_of_member") {
      //console.log(name)
      setTypeOfFamily(false);
      setFonctionEmployer(false);
      if (value === "famille") setTypeOfFamily(true);
      else if (value === "Employe") setFonctionEmployer(true);
      else {
        console.log(name);
        setTypeOfFamily(false);
        setFonctionEmployer(false);
      }
    }
  };

  const handleChangePhone = (phone_member) => {
    dispatch(addMember({ phone_member }));
  };

  return (
    <div className="h-screen bg-white px-1 py-2 sm:py-2 lg:px-4 overflow-scroll ">
      <form
        className="mx-auto h-full mt-2 max-w-7xl sm:mt-4"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className=" text-base grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="type_of_member"
              className=" block  font-semibold leading-6 text-sky-600 uppercase"
            >
              type de membre<span className="text-red-400"> *</span>
            </label>
            <div className="-mt-1">
              <select
                required
                id="type_of_member"
                onChange={handleChange}
                name="type_of_member"
                value={type_of_member || ""}
                className=" invalid:text-gray-200 invalid:text-xs block  w-full uppercase peer px-4 
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose an option--</option>
                {/* <optgroup label="Type de membre"> */}
                {/* <option></option> */}
                <option value="famille" selected>
                  Famille
                </option>
                <option value="Employe">Employe(e)</option>
                <option value="benevoles">benevoles</option>
                <option value="stagiaires">stagiaires</option>
                <option value="partenaires">partenaires</option>
                {/* </optgroup> */}
              </select>
            </div>
            {/* errors will return when field validation fails  */}
          </div>
          <div className="sm:col-span-2">
            {typeOfFamily ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4">
                <div>
                  <label
                    htmlFor="type_of_family"
                    className=" block  font-semibold leading-6 text-sky-600 uppercase"
                  >
                    type de famille<span className="text-red-400"> *</span>
                  </label>
                  <div className="-mt-1">
                    <select
                      required
                      id="type_of_family"
                      onChange={handleChange}
                      name="type_of_family"
                      value={type_of_family || ""}
                      className=" invalid:text-gray-200 invalid:text-xs block  w-full uppercase peer px-4 
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                    >
                      <option value="">--Please choose an option--</option>
                      {/* <optgroup label="Type de membre"> */}
                      {/* <option></option> */}
                      <option value="Nucleaire">Nucléaire</option>
                      <option value="Recomposee">Recomposée</option>

                      <option value="Monoparentale (mère)">
                        Monoparentale (mère)
                      </option>
                      <option value="Monoparentale (père)">
                        Monoparentale (père)
                      </option>
                      <option value="Homoparentale (mère)">
                        Homoparentale (mère)
                      </option>
                      <option value="Homoparentale (père)">
                        Homoparentale (père)
                      </option>

                      {/* </optgroup> */}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="number_children_house"
                    className=" block  font-semibold leading-6 text-sky-600 uppercase"
                  >
                    Enfants maison<span className="text-red-400"> *</span>
                  </label>
                  <div className="-mt-6">
                    <input
                      type="number"
                      min="0"
                      required
                      id="number_children_house"
                      className=" block  w-full peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente"
                      onChange={handleChange}
                      name="number_children_house"
                      value={number_children_house || ""}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="number_adult"
                    className=" block  font-semibold leading-6 text-sky-600 uppercase"
                  >
                    Adults maison<span className="text-red-400"> *</span>
                  </label>
                  <div className="-mt-6">
                    <input
                      type="number"
                      min="0"
                      required
                      id="number_adult"
                      className=" block  w-full peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente"
                      onChange={handleChange}
                      name="number_adult"
                      value={number_adult || ""}
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
                      //required
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
                      {data &&
                        data.map((volet) => (
                          <option key={volet.Id_volet} value={volet.Id_volet}>
                            {volet.label_volet}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : fonctionEmployer ? (
              <div>
                <label
                  htmlFor="fonction"
                  className="block text-sm font-semibold leading-6 text-sky-600"
                >
                  Fonction de l'employe(e)
                  <span className="text-red-600"> *</span>
                </label>
                <div className="-mt-4">
                  <input
                    type="text"
                    required
                    id="fonction"
                    className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="fonction"
                    value={fonction || ""}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className=" sm:col-span-3 text-center border-y-[1px] border-y-red-200 ">
            {" "}
            <span className="block text-red-700 font-bold uppercase">
              Informations personnelles
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="card_member"
                className="block text-sm font-semibold leading-6 text-sky-600"
              >
                N_Card<span className="text-red-600"> *</span>
              </label>
              <div className="-mt-4">
                <input
                  type="number"
                  min="0"
                  required
                  id="card_member"
                  className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                  onChange={handleChange}
                  name="card_member"
                  value={card_member || ""}
                />
              </div>
            </div>
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
          </div>
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
              htmlFor="adress_member"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Adresse
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="adress_member"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="adress_member"
                value={adress_member || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="city_member"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Ville
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="city_member"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="city_member"
                value={city_member || ""}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="codePostal_member"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Code Postal
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="codePostal_member"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="codePostal_member"
                value={codePostal_member || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email_member"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Courriel
            </label>
            <div className="-mt-4">
              <input
                type="email_member"
                id="email_member"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="email_member"
                value={email_member || ""}
              />
            </div>
          </div>
          <div>
            <PhoneInput
              localization={fr}
              className=" max-w-fit rounded-full  px-1 text-gray-700"
              country={"ca"}
              id="phone_member"
              name="phone_member"
              value={phone_member || ""}
              onChange={(e) => handleChangePhone(e)}
              specialLabel="Phone"
              inputStyle={{
                width: "fit-content",
                "&:focus": {
                  borderColor: "red",
                },
              }}
            />
            {/* <input
                type="tel"
                required
                id="phone"
                pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="phone"
                value={phone || ""}
              /> */}
          </div>

          <div>
            <label
              htmlFor="language"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Langue Parlee<span className="text-red-600"> *</span>
            </label>
            <div className="-mt-4">
              <select
                required
                id="language"
                onChange={handleChange}
                name="language"
                value={language || ""}
                className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose a language--</option>
                {/* <optgroup label="Type de membre"> */}
                {/* <option></option> */}
                <option value="francais" selected>
                  {" "}
                  francais
                </option>
                <option value="anglais"> anglais</option>
                <option value="espagnol">espagnol</option>
                <option value="creole">creole</option>
                <option value="mandarin">mandarin</option>
                {/* </optgroup> */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="group_of_age"
                className="block text-sm font-semibold leading-6 text-sky-600"
              >
                Groupe d'age<span className="text-red-600"> *</span>
              </label>
              <div className="-mt-4">
                <select
                  required
                  id="group_of_age"
                  onChange={handleChange}
                  name="group_of_age"
                  value={group_of_age || ""}
                  defaultValue={group_of_age || ""}
                  className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-4 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
                >
                  <option value="">--Please choose--</option>

                  <option value="0-19"> 0-19</option>
                  <option value="20-24"> 20-24</option>
                  <option value="25-29"> 25-29</option>
                  <option value="30-34"> 30-34</option>
                  <option value="35-39" selected>
                    {" "}
                    35-39
                  </option>
                  <option value="40-44"> 40-44</option>
                  <option value="45-54"> 45-54</option>
                  <option value="55+"> 55+</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="origineEthnique"
                className="block text-sm font-semibold leading-6 text-sky-600"
              >
                Pays d'origine <span className="text-red-600"> *</span>
              </label>
              <div className="-mt-4">
                <input
                  type="text"
                  required
                  id="origineEthnique"
                  className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                  onChange={handleChange}
                  name="origineEthnique"
                  value={origineEthnique || ""}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="sourceRevenue"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Source de revenu
            </label>
            <div className="-mt-4">
              <select
                id="sourceRevenue"
                onChange={handleChange}
                name="sourceRevenue"
                value={sourceRevenue || ""}
                className="text-xs invalid:text-gray-200 block  w-full uppercase peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose a language--</option>

                <option value="emploi temps plein" selected>
                  emploi a temps plein
                </option>
                <option value="emploi temps partiel">
                  emploi a temps partiel
                </option>
                <option value="assurance">assurance-emploi</option>
                <option value="aide">aide sociale</option>
                <option value="RQAP">RQAP</option>
                <option value="travailleur autonome">
                  travailleur autonome
                </option>
                <option value="pension vieillesse">pension vieillesse</option>
                <option value="prets et bourses">prets et bourses</option>
                <option value="CNESST">CNESST</option>
                <option value="allocation">allocation</option>
                <option value="aucun revenu">aucun revenu</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="level_of_school"
              className="block text-sm font-semibold leading-6 text-sky-600"
            >
              Niveau d'etudes
            </label>
            <div className="-mt-4">
              <select
                id="level_of_school"
                onChange={handleChange}
                name="level_of_school"
                value={level_of_school || ""}
                className="text-xs invalid:text-gray-200 block  w-full uppercase peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose a language--</option>

                <option value="primaire"> primaire</option>
                <option value="secondaire"> secondaire</option>
                <option value="Etudes professionnelles">
                  Etudes professionnelles-Dep
                </option>
                <option value="Collegial">Collegial</option>
                <option value="Universitaire 1er">
                  Universitaire 1er cycle
                </option>
                <option value="Universitaire 2nd">
                  Universitaire 2nd cycle
                </option>
                <option value="Universitaire 3rd">
                  Universitaire 3e cycle
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="family_income"
              className="  block text-sm font-semibold leading-6 text-sky-600"
            >
              Revenu Familial
            </label>
            <div className="-mt-4">
              <select
                required
                id="family_income"
                onChange={handleChange}
                name="family_income"
                value={family_income || ""}
                className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose a language--</option>

                <option value="$0- $9 999"> $0- $9 999</option>
                <option value="$10 000- $19 999"> $10 000- $19 999</option>

                <option value="$20 000- $29 999">$20 000- $29 999</option>
                <option value="$30 000- $39 999">$30 000- $39 999</option>
                <option value="$40 000- $49 999">$40 000- $49 999</option>
                <option value="$50 000- $100 000">$50 000- $100 000</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <div>
              <label
                htmlFor="remarks"
                className="block text-sm font-semibold leading-6 text-sky-600"
              >
                Remarques importantes
              </label>
              <div className="-mt-4">
                <input
                  type="text"
                  id="remarks"
                  className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                  onChange={handleChange}
                  name="remarks"
                  value={remarks || ""}
                />
              </div>
            </div>
          </div>

          <div className=" flex justify-center gap-x-2 sm:col-span-3  border-y-[1px] border-y-sky-200 ">
            {" "}
            <span className="block text-green-700 font-bold uppercase">
              Informations complementaires{" "}
            </span>
            <span className="text-red-700 block uppercase text-xs">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  strings: [
                    "Pour les autorisations photos",
                    "sur l'Association du benevole/stagiaire/partenaire",
                    "sur la Personne a contacter en cas d'urgence",
                    "sur l'Universite/cegep du stagiaire",
                    "Pour les statistiques",
                  ],
                }}
              />
            </span>
          </div>

          <div>
            <label
              htmlFor="how_know_us"
              className="  block text-sm font-semibold leading-6 text-purple-800"
            >
              Comment avez-vous entendu?
              <span className="text-red-600 font-extrabold"> *</span>
            </label>
            <div className="-mt-4">
              <select
                required
                id="how_know_us"
                onChange={handleChange}
                name="how_know_us"
                value={how_know_us || ""}
                className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose a language--</option>

                <option value="Famille ou ami"> Famille ou ami</option>
                <option value="Ecole du quartier"> Ecole du quartier</option>
                <option value="site web">site web</option>
                <option value="facebook">facebook</option>
                <option value="autres medias sociaux">
                  autres medias sociaux
                </option>
                <option value="vitrine clsc">Vitrine clsc</option>
                <option value="journal du quartier">journal du quartier</option>
                <option value="reference">reference</option>
                <option value="en passant dans la rue">
                  en passant dans la rue
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="autorisationPicture"
              className="  block text-sm font-semibold leading-6 text-purple-800"
            >
              Autorisez-vous la prise de photo?
              <span className="text-red-600 font-extrabold"> *</span>
            </label>
            <div className="-mt-4">
              <select
                required
                id="autorisationPicture"
                onChange={handleChange}
                name="autorisationPicture"
                value={autorisationPicture || ""}
                className="invalid:text-xs invalid:text-gray-200 block  w-full uppercase peer px-1 pt-4
              border-b border-slate-600 placeholder-transparente shadow-sm text-gray-900"
              >
                <option value="">--Please choose an option--</option>

                <option value="non" selected>
                  NON
                </option>
                <option value="oui">OUI</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="fname_urgency"
              className="block text-sm font-semibold leading-6 text-purple-800"
            >
              Personne A contacter/Association/CEGEP
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="fname_urgency"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="fname_urgency"
                value={fname_urgency || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="adresse_urgency"
              className="block text-sm font-semibold leading-6 text-purple-800"
            >
              adresse urgence/Association/CEGEP
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="adresse_urgency"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="adresse_urgency"
                value={adresse_urgency || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone_urgency"
              className="block text-sm font-semibold leading-6 text-purple-800"
            >
              Telephone urgence/Association/CEGEP
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="phone_urgency"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="phone_urgency"
                value={phone_urgency || ""}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lien_urgency"
              className="block text-sm font-semibold leading-6 text-purple-800"
            >
              lien avec la personne a contacter
            </label>
            <div className="-mt-4">
              <input
                type="text"
                id="lien_urgency"
                className=" block  w-full peer px-1 pt-3
              border-b border-slate-600 placeholder-transparente"
                onChange={handleChange}
                name="lien_urgency"
                value={lien_urgency || ""}
              />
            </div>
          </div>
        </div>
        <div className="mt-2  flex justify-center">
          <button
            type="submit"
            className="uppercase block  rounded-md bg-sky-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition ease-in-out duration-200"
          >
            Enregistrer le nouveau membre
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMember;
