import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParent } from "../../stores/parents";
import {
  addParentList,
  clearList,
  updateParent,
} from "../../stores/listParents";
import { switchParent, discrimentParent } from "../../stores/checkParent";
//import { useCallback } from "react";
//import { switchParent } from "../../stores/checkParent";
//import localStorage from "redux-persist/es/storage";
//onClick={()=>{localStorage.removeItem('persist:root')}}
const ParentsInfo = () => {
  const dispatch = useDispatch();
  const parent = useSelector((state) => state.cardMember.parent);
  const { isOk } = useSelector((state) => state.cardMember.checkParent);
  const { type_of_family } = useSelector((state) => state.cardMember.member);
  const parents = useSelector((state) => state.cardMember.listParents.parents);
  //console.log(parents);
  //const typeFamille = [];
  //typeFamille.push(type_of_family);
  //console.log(typeFamille);
  //if (typeFamille.includes("Monoparentale (mère)"))
  // if (type_of_family !== "Monoparentale (mère)")
  //   dispatch(switchParent({ isOk: false }));
  //console.log(parent);

  //console.log("famille:type_of_family" + type_of_family);
  //if (typeFamille.includes("Monoparentale (père)"))
  //console.log("famille:type_of_family" + type_of_family);
  const [id, setId] = useState(0);
  const [totalPa, setTotalP] = useState(0);
  //const totalParents = parent.length;
  //console.log(totalParents)
  const {
    fname,
    lname,
    adress,
    city,
    province,
    codePostal,
    email,
    phone,
    niveauScolaire,
    birthday,
    sourceRevenue,
    language,
    origineEthnique,
    sexe,
    tuteur,
  } = parent;
  //const totalP = isOk ? 2 : 1;
  //console.log(parent)
  //let parentfilter = parents//.filter((t) => t.id == id);
  // let {
  //   fname,
  //   lname,
  //   adress,
  //   city,
  //   province,
  //   codePostal,
  //   email,
  //   phone,
  //   birthday,
  //   sourceRevenue,
  //   language,
  //   origineEthnique,
  //   sexe,
  //   tuteur,
  // } = parent;
  // console.log(parentfilter);
  //const [namef,setNamef]=useState('')
  const handleChange = (e) => {
    // console.log(e.target, id);
    //console.log(parents)

    //console.log(parents[id]);
    // console.log(parentfilter[0]);
    //setNamef(e.target.value)
    const { name, value } = e.target;
    // if (parentfilter) parentfilter = parents;
    // console.log(parentfilter[id]);

    // console.log(
    //   fname,
    //   lname,
    //   adress,
    //   city,
    //   province,
    //   codePostal,
    //   email,
    //   phone,
    //   birthday,
    //   sourceRevenue,
    //   language,
    //   origineEthnique,
    //   sexe,
    //   tuteur
    // );
    // // setId(1);
    //console.log(id);
    //const { name, value } = e.target;

    //setId(1);
    //console.log(id);
    //dispatch(addParent({ [name]: value }));
    dispatch(addParent({ [name]: value }));
    //const { name, value } = e.target;
    // const parentfilter = parents.filter((t) => t.id === id);
    //dispatch(updateParent({ namef, id: 0 }));
    //dispatch(updateParent({ namef, id: 0 }));
    //const { name, value } = e.target;
    // const parentfilter = parents.filter((t) => t.id === id);
    //console.log(parentfilter[id]);

    //dispatch(addParent({ [name]: value ,id:0}));

    // dispatch(
    //   addParent({
    //     id,
    //     fname,
    //     lname,
    //     adress,
    //     city,
    //     province,
    //     codePostal,
    //     email,
    //     phone,
    //     birthday,
    //     sourceRevenue,
    //     language,
    //     origineEthnique,
    //     sexe,
    //     tuteur,
    //   })
    //);
    //  const { name, value } = e.target;
    // setUserData({ ...userData, [name]: value });
  };
  const handlesubmit = (e) => {
    //console.log("object");
    e.preventDefault();
    // const oneparent = { fname, id };
    if (isOk !== 0) {
      console.log("isOk");
      dispatch(
        addParentList({
          id,
          fname,
          lname,
          adress,
          city,
          province,
          codePostal,
          email,
          phone,
          niveauScolaire,
          birthday,
          sourceRevenue,
          language,
          origineEthnique,
          sexe,
          tuteur,
        })
      );

      // setTotalP(parents.length);
      dispatch(discrimentParent());
      setId(1);
      // console.log("total:" + totalPa);
      // type_of_family === "Monoparentale (mère)"
      //   ? dispatch(discrimentParent())
      //   :  type_of_family === "Monoparentale (père)"
      //   ? dispatch(switchParent({ isOk: 1 }))
      //   : totalPa === 2
      //   ? dispatch(switchParent({ isOk: false }))
      //   : console.log(" 4 ok");
    } else {
      //console.log("no ok");
      dispatch(
        addParent({
          fname: "",
          lname: "",
          adress: "",
          city: "",
          province: "",
          codePostal: "",
          email: "",
          phone: "",
          niveauScolaire: "",
          birthday: "",
          sourceRevenue: "",
          language: "",
          origineEthnique: "",
          sexe: "",
          tuteur: "",
        })
      );

      setId(0);
    }
  };
  //   [
  //     tuteur,
  //     id,
  //     fname,
  //     lname,
  //     adress,
  //     city,
  //     province,
  //     codePostal,
  //     email,
  //     phone,
  //     niveauScolaire,
  //     birthday,
  //     sourceRevenue,
  //     language,
  //     origineEthnique,
  //     sexe,
  //     dispatch,
  //   ]
  // );
  const onParentRemove = (Id) => {
    dispatch(updateParent({ id: Id }));
    setTotalP(parents.length);
    if (type_of_family === "Monoparentale (mère)") {
      dispatch(switchParent({ isOk: 1 }));
      //console.log(isOk);
    } else if (type_of_family === "Monoparentale (père)") {
      dispatch(switchParent({ isOk: 1 }));
      //console.log(isOk);
    } else {
      //console.log(totalPa);
      if (totalPa === 1) {
        //if (Id === 0) setId(1);
        if (Id === 0) setId(0);
        if (Id === 1) setId(1);
        dispatch(clearList());
        //setId(0);
        dispatch(switchParent({ isOk: 2 }));
      } else {
        //dispatch(clearList());
        if (Id === 0) setId(0);
        if (Id === 1) setId(1);
        // setId(0);
        dispatch(switchParent({ isOk: 1 }));
      }
    }
  };
  //console.log(parents.length);
  return (
    <div className="flex flex-col mb-1 py-2">
      <div className="flex space-x-2">
        <p className="mx-2 text-xl font-bold uppercase ">
          <span className="underline underline-offset-8">Type de famille </span>{" "}
          : <span className="text-red-700  overline">{type_of_family}</span>{" "}
          {type_of_family === "Monoparentale (mère)" ? (
            <span>__Total parent:+1</span>
          ) : type_of_family === "Monoparentale (père)" ? (
            <span>__Total parent:+1</span>
          ) : (
            <span>__Total parent:+2</span>
          )}
        </p>
      </div>
      {/* <ul>
        {" "}
        {parents.map((parent) => (
          <li key={parent.id}>{parent.fname}</li>
        ))}{" "}
      </ul> */}
      {/* {parent.type_of_family} */}
      <div disabled className="w-full mx-2 flex-1">
        <form
          onSubmit={handlesubmit}
          className="w-full space-y-1  text-base text-center flex flex-col  "
        >
          <div className="flex justify-end items-center font-extrabold">
            {parents.length === 1 &&
            type_of_family === "Monoparentale (mère)" ? (
              <button
                type="submit"
                disabled
                className="w-1/6 cursor-not-allowed bg-sky-500 px-2 py-1 text-base uppercase font-bold  rounded-xl hover:bg-sky-700 text-white "
              >
                ajouter
              </button>
            ) : parents.length === 1 &&
              type_of_family === "Monoparentale (père)" ? (
              <button
                type="submit"
                disabled
                className="w-1/6 cursor-not-allowed bg-sky-500 px-2 py-1 text-base uppercase font-bold  rounded-xl hover:bg-sky-700 text-white "
              >
                ajouter
              </button>
            ) : parents.length === 2 ? (
              <button
                type="submit"
                disabled
                className="w-1/6 cursor-not-allowed bg-sky-500 px-2 py-1 text-base uppercase font-bold  rounded-xl hover:bg-sky-700 text-white "
              >
                ajouter
              </button>
            ) : (
              <button
                type="submit"
                className="w-1/6 bg-sky-500 px-2 py-1 text-base uppercase font-bold  rounded-xl hover:bg-sky-700 text-white "
              >
                ajouter
              </button>
            )}
          </div>
          <div className="mt-1 h-[17rem]   ">
            <fieldset className="py-2 px-2  h-full ml-5 border  border-green-400 rounded-xl">
              <legend className="mx-auto px-4 text-green-700 uppercase font-extrabold text-base italic">
                Parent#{id + 1}
              </legend>
              <div className="w-full flex  ml-2 flex-col md:flex-row flex-wrap  gap-6  justify-center min-h-fit md:justify-start  ">
                <div className="flex justify-between w-full  ">
                  <div className="flex flex-col items-start w-2/6">
                    <input
                      type="text"
                      id="fnameUrgency"
                      onChange={handleChange}
                      className=" peer px-1 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="fname"
                      value={fname || ""}
                      required
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      Prenom<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-3/6 ml-4">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-2 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="lname"
                      value={lname || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      nom<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/6 ml-4">
                    <select
                      id="sexe"
                      required
                      name="sexe"
                      value={sexe || "M"}
                      onChange={handleChange}
                      className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                    >
                      <optgroup label="sexe">
                        <option value="ami"> M</option>
                        <option value="Ecole"> F</option>
                      </optgroup>
                    </select>
                    <label
                      htmlFor="sexe"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      sexe<span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col items-start w-full">
                  <input
                    type="text"
                    id="fnameUrgency"
                    className=" peer px-1 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                    name="adress"
                    value={adress || ""}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="fnameUrgency"
                    className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                  >
                    adresse<span className="text-red-600"> *</span>
                  </label>
                </div>

                <div className="flex justify-between w-full  ">
                  <div className="flex flex-col items-start w-1/2">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-1 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="city"
                      value={city || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      ville<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/2 ml-4">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-2 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="province"
                      value={province || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      Province<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/3 ml-4">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-2 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="codePostal"
                      value={codePostal || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      code postal<span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between w-full  ">
                  <div className="flex flex-col items-start w-1/2">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-1 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="email"
                      value={email || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      email<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/3 ml-4">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-2 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="phone"
                      value={phone || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      telephone<span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/3 ml-4">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-2 py-2 w-full
              border-b border-slate-600 placeholder-transparente"
                      name="tuteur"
                      value={tuteur || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      cellulaire<span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div>
                <div className="flex w-ful mt-4 gap-4">
                  <div className=" mr-4 flex flex-col items-start w-1/3">
                    <select
                      id="howKnowUs"
                      required
                      name="niveauScolaire"
                      value={niveauScolaire || ""}
                      onChange={handleChange}
                      className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                    >
                      <optgroup label="scolarite">
                        <option value="ami"> primaire</option>
                        <option value="Ecole"> secondaire</option>
                        <option value="site">
                          Etudes professionnelles-Dep
                        </option>
                        <option value="facebook">Collegial</option>
                        <option value="autres">Universitaire 1er cycle</option>
                        <option value="vitrine">Universitaire 2nd cycle</option>
                        <option value="journal">Universitaire 3e cycle</option>
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
                      niveau scolaire
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className=" w-1/3 flex flex-col items-start">
                    <select
                      id="howKnowUs"
                      required
                      name="sourceRevenue"
                      value={sourceRevenue || ""}
                      onChange={handleChange}
                      className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                    >
                      <optgroup label="scolarite">
                        <option value="ami"> emploi a temps plein</option>
                        <option value="Ecole"> emploi a temps partiel</option>
                        <option value="site">assurance-emploi</option>
                        <option value="facebook">aide sociale</option>
                        <option value="autres">RQAP</option>
                        <option value="vitrine">travailleur autonome</option>
                        <option value="journal">pension vieillesse</option>
                        <option value="journal">prets et bourses</option>
                        <option value="journal">CNESST</option>
                        <option value="journal">allocation</option>
                        <option value="journal">aucun revenu</option>
                      </optgroup>
                    </select>
                    <label
                      htmlFor="source de revenu"
                      className=" ml-1 -mt-12 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      source de revenu
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className=" w-1/3 flex flex-col items-start">
                    <select
                      id="howKnowUs"
                      required
                      name="language"
                      value={language || ""}
                      onChange={handleChange}
                      className=" peer px-1 py-2
                    border-b border-slate-600 placeholder-transparente"
                    >
                      <optgroup label="scolarite">
                        <option value="ami"> francais</option>
                        <option value="Ecole"> anglais</option>
                        <option value="site">espagnol</option>
                        <option value="facebook">creole</option>
                        <option value="facebook">mandarin</option>
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
                      langue parlee a la maison
                      <span className="text-red-600"> *</span>
                    </label>
                  </div>

                  <div className="flex flex-col items-start w-1/3">
                    <input
                      type="text"
                      id="fnameUrgency"
                      className=" peer px-1 py-2 
              border-b border-slate-600 placeholder-transparente"
                      name="origineEthnique"
                      value={origineEthnique || ""}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fnameUrgency"
                      className=" ml-1 -mt-10 text-xs text-blue-600  font-bold
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-9
            peer-placeholder-shown:text-xs 
            duration-300 uppercase"
                    >
                      pays d'origine<span className="text-red-600"> *</span>
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
        <div>
          <div className="flex gap-4 mt-2 items-center ml-4 w-full">
            {parents.map((parent) => (
              <div
                key={parent.id}
                className=" border-dashed border-2 w-1/2"
                onClick={() => onParentRemove(parent.id)}
              >
                <p> {`Parent#${parent.id} `} </p>{" "}
                <span
                  className="text-gray-700 uppercase text-xs
             "
                >
                  Nom complet
                </span>
                <span
                  className="text-gray-700 uppercase text-xs
             "
                >
                  {`:${parent.fname} ${parent.lname}`}{" "}
                </span>
                <span
                  className="text-gray-700 uppercase text-xs
             "
                >
                  sexe
                </span>
                <span
                  className="text-gray-700 uppercase text-xs
             "
                >
                  {`:${parent.sexe}`}{" "}
                </span>
                <button className="bg-red-500  rounded-xl px-2 text-white ml-2 hover:bg-red-700">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsInfo;
