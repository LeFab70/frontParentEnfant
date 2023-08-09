import React from "react";
//import Select from 'react-select';
// import { useContext } from "react";
// import { StepContext } from "../../StepContext";
import { useSelector } from "react-redux";
//import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
//import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addMember } from "../../stores/members";
import { switchParent } from "../../stores/checkParent";
import { clearList } from "../../stores/listParents";
//import { persistor } from "../../store";

const MemberInfo = () => {
  // const { userData, setUserData } = useContext(StepContext);
  // const purge = () => {
  //  // persistor.purge();
  // };
  const dispatch = useDispatch();
  const {
    id_member,
    card_member,
    type_of_family,
    family_income,
    number_children_house,
    number_children_carrefour,
    number_adult,
    how_know_us,

    fname_urgency,
    lname_urgency,
    email_urgency,
    phone_urgency,
    lien_urgency,
    remarks,
  } = useSelector((state) => state.cardMember.member);
  // const { isOk } = useSelector((state) => state.cardMember.checkParent);
  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;

    dispatch(addMember({ [name]: value }));

    if (name === "type_of_family")
      if (value === "Monoparentale (mère)") {
        dispatch(switchParent({ isOk: 1 }));
        dispatch(clearList());
        //console.log(isOk);
      } else if (value === "Monoparentale (père)") {
        dispatch(switchParent({ isOk: 1 }));
        dispatch(clearList());
        //console.log(isOk);
      } else {
        dispatch(clearList());
        dispatch(switchParent({ isOk: 2 }));
      }
    // const { name, value } = e.target;
    // setUserData({ ...userData, [name]: value });
    //console.log(type_of_family)
  };
  // const schema = yup
  //   .object({
  //     cardMember: yup
  //       .number()
  //       .positive()
  //       .integer()
  //       .required("fournir le numero de carte : Required"),
  //     typeOfFamily: yup.string().required("type de famille requis"),
  //     familyIncome: yup.string().required(" revenu la maison requis"),
  //     numberOfChildHouse: yup
  //       .number("doit etre un nombre")
  //       .positive()
  //       .integer()
  //       .required("nombre enfants dans la maison requis"),
  //     numberOfChildCarrefour: yup
  //       .number("doit etre un nombre")
  //       .positive()
  //       .integer()
  //       .required("nombre enfants a carrefour requis"),
  //     numberOfAdult: yup
  //       .number("doit etre un nombre")
  //       .positive()
  //       .integer()
  //       .required("nombre adultes dans la maison requis"),
  //     howKnowUs: yup.string().required(" comment vous connaisez-vous requis"),
  //     fnameUrgency: yup.string().required(" prenom urgence requis"),
  //     lnameUrgency: yup.string().required(" nom urgence requis"),
  //     emailUrgency: yup
  //       .string()
  //       .email("doit-etre une adresse mail")
  //       .required(" email urgence requis"),
  //     phoneUrgency: yup.string().required(" telephone urgence requis"),
  //     lienUrgency: yup.string().required(" lien avec urgence requis"),
  //     remarks: yup.string().required(" remarques requis"),
  //     autorizationPicture: yup
  //       .string()
  //       .required(" autorization to Picturerequis"),
  //     // healthInfo: yup.string().required(" situation de sante"),
  //     // detailsHealth: yup.string(),
  //     // allergies: yup.string().required(" allergies requis"),
  //     // restrictionsFoods: yup.string().required(" restrictions to Foods requis"),
  //     // medicaments: yup.string().required(" medicaments au qoutidien requis"),
  //     // eatAlone: yup.string().required(" mange seul? requis"),
  //     paidCard: yup.string().required(" carte payee? requis"),
  //   })
  //   .required();

  // const {
  //   register,
  //   handleSubmit,

  //   formState: { errors },
  // } = useForm({
  //   mode: "onBlur",
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     cardMember: "343",

  //     numberOfChildHouse: 1,

  //     numberOfChildCarrefour: 1,
  //     numberOfAdult: 2,
  //     // howKnowUs: "",
  //     fnameUrgency: "",
  //     lnameUrgency: "",
  //     emailUrgency: "",
  //     phoneUrgency: "",
  //     lienUrgency: "",
  //     remarks: "RAS",
  //     // autorizationPicture: "oui",
  //     // healthInfo: "",
  //     // detailsHealth: "",
  //     // allergies: "",
  //     // restrictionsFoods: "aucun",
  //     // medicaments: "aucun",
  //     // eatAlone: "oui",
  //     paidCard: "oui",
  //   },
  // });

  // const wait = (duration = 1000) => {
  //   return new Promise((resolve) => {
  //     window.setTimeout(resolve, duration);
  //   });
  // };

  // const onSubmit = async (data, e, response) => {
  //   // e.preventDefault();
  //   //try {
  //   await wait(2000);
  //   alert(JSON.stringify(data));
  //   //  dispatch(addUser({ name: res.data.user, role: "admin" }));
  //   // dispatch(addUser({ name: res.data.user, role: "admin" }));
  //   //serviceAccount.saveToken(res.data.access_token);
  //   // } catch (error) {
  //   //  console.log(error);
  //   //  }
  // };

  return (
    <div className="flex flex-col mb-4 py-2 h-fit w-full">
      <div className="w-full mx-2 flex-1">
        <form className="w-full space-y-2 h-fit text-base text-center flex flex-col space-x-2  ">
          <div className="flex flex-col items-start mb-4 ml-5 mt-2">
            <input
              type="number"
              required
              id="cardMember"
              placeholder=" "
              className=" peer px-6 py-2 w-50 
              border-b border-slate-600 placeholder-transparente"
              onChange={handleChange}
              name="card_member"
              value={card_member || ""}
            />
            <label
              htmlFor="cardMember"
              className=" ml-1 -mt-11 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
            >
              Numero carte du membre<span className="text-red-600"> *</span>
            </label>

            {/* errors will return when field validation fails  */}
          </div>
          <div className="mt-1 h-[9rem]   ">
            <fieldset className="py-2   h-full ml-5 border  border-green-400 rounded-xl">
              <legend className="mx-auto px-4 text-green-700 uppercase font-extrabold text-xs italic">
                Informations statistiques
              </legend>
              <div className=" flex space-x-10 ml-2 flex-col md:flex-row flex-wrap  gap-10  md:gap-x-5 md:space-y-2 justify-center min-h-fit md:justify-start  ">
                <div className="flex flex-col items-start">
                  <select
                    id="Type_de_famille"
                    onChange={handleChange}
                    name="type_of_family"
                    value={type_of_family || ""}
                    className=" peer px-1 py-2
              border-b border-slate-600 placeholder-transparente"
                  >
                    <optgroup label="Type_de_famille">
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
                    </optgroup>
                  </select>
                  <label
                    htmlFor="Type_de_famille"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    Type de famille<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <select
                    id="familyIncome"
                    onChange={handleChange}
                    name="family_income"
                    value={family_income || ""}
                    className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                  >
                    <optgroup label="familyIncome">
                      <option value="0"> $0- $9 999</option>
                      <option value="10000"> $10 000- $19 999</option>

                      <option value="20000">$20 000- $29 999</option>
                      <option value="30000">$30 000- $39 999</option>
                      <option value="40000">$40 000- $49 999</option>
                      <option value="50000">$50 000- $100 000</option>
                    </optgroup>
                  </select>
                  <label
                    htmlFor="familyIncome"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    Revenu familial<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    id="numberOfChildHouse"
                    className=" peer px-1 py-2
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="number_children_house"
                    value={number_children_house || ""}
                  />
                  <label
                    htmlFor="numberOfChildHouse"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    N.Enfants a la maison
                    <span className="text-red-600"> *</span>
                  </label>
                </div>
                {/* errors will return when field validation fails  */}

                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    id="numberOfChildCarrefour"
                    className=" peer px-1 py-2
                  border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="number_children_carrefour"
                    value={number_children_carrefour || ""}
                  />
                  <label
                    htmlFor="numberOfChildCarrefour"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    N.Enfants a carrefour
                    <span className="text-red-600"> *</span>
                  </label>
                </div>
                {/* errors will return when field validation fails  */}

                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    id="numberOfAdult"
                    className=" peer px-1 py-2
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="number_adult"
                    value={number_adult || ""}
                  />
                  <label
                    htmlFor="numberOfAdult"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    N.adultes<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <select
                    id="howKnowUs"
                    required
                    name="how_know_us"
                    onChange={handleChange}
                    value={how_know_us || ""}
                    className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                  >
                    <optgroup label="howKnowUs">
                      <option value="ami"> Famille ou ami</option>
                      <option value="Ecole"> Ecole du quartier</option>
                      <option value="site">site web</option>
                      <option value="facebook">facebook</option>
                      <option value="autres">autres medias sociaux</option>
                      <option value="vitrine">Vitrine clsc</option>
                      <option value="journal">journal du quartier</option>
                      <option value="reference">reference</option>
                      <option value="rue">en passant dans la rue</option>
                    </optgroup>
                  </select>
                  <label
                    htmlFor="howKnowUs"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    Comment avez-vous entendu parler de nous?
                    <span className="text-red-600"> *</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="mt-1 h-[8.75rem] ">
            <fieldset className="py-2  h-full ml-5 border min-h-fit border-red-400 rounded-xl">
              <legend className="mx-auto px-4 text-red-700 uppercase font-extrabold text-xs italic">
                Contact en cas d'urgence
              </legend>

              <div className=" flex space-x-10 md:space-y-1 ml-2 flex-col md:flex-row flex-wrap  gap-10  md:gap-x-5 justify-center min-h-fit md:justify-start  ">
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    id="fnameUrgency"
                    className=" peer px-1 py-2
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="fname_urgency"
                    value={fname_urgency || ""}
                  />
                  <label
                    htmlFor="fnameUrgency"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    Prenom<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    id="lnameUrgency"
                    className=" peer px-1 py-2 
              border-b border-slate-600 placeholder-transparente"
                    onChange={handleChange}
                    name="lname_urgency"
                    value={lname_urgency || ""}
                  />
                  <label
                    htmlFor="lnameUrgency"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    nom<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    id="emailUrgency"
                    className=" peer px-2 py-2 w-60
                  border-b border-slate-600 placeholder-transparente"
                    name="email_urgency"
                    onChange={handleChange}
                    value={email_urgency || ""}
                  />
                  <label
                    htmlFor="emailUrgency"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    Email<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    id="phoneUrgency"
                    className=" peer px-1 py-2
                  border-b border-slate-600 placeholder-transparente"
                    name="phone_urgency"
                    onChange={handleChange}
                    value={phone_urgency || ""}
                  />
                  <label
                    htmlFor="phoneUrgency"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    telephone<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    id="lienUrgency"
                    className=" peer px-1 py-2
                  border-b border-slate-600 placeholder-transparente"
                    name="lien_urgency"
                    onChange={handleChange}
                    value={lien_urgency || ""}
                  />
                  <label
                    htmlFor="lienUrgency"
                    className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    lien<span className="text-red-600"> *</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col items-start mb-20 ml-5 mt-20">
            <input
              type="text"
              id="remarks"
              className=" peer px-1 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
              name="remarks"
              onChange={handleChange}
              value={remarks || ""}
            />
            <label
              htmlFor="remarks"
              className=" text-teal-700 ml-1 -mt-12   font-extrabold text-base
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
            >
              remarques<span className="text-red-600"> *</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberInfo;
