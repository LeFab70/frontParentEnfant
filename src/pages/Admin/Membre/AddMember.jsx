import React from "react";
import NewMember from "../../../components/Members/NewMember";
// import Stepper from "../../../components/multiStepForms/Stepper";
// import StepperControl from "../../../components/multiStepForms/StepperControl";
// import MemberInfo from "../../../components/Members/MemberInfo";
// import ParentsInfo from "../../../components/Members/ParentsInfo";
// import ChildInfo from "../../../components/Members/ChildInfo";
// import Complete from "../../../components/Members/Complete";
// //import { StepContext } from "../../../StepContext";
// import Payement from "../../../components/Members/Payement";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListOfMember from "../../../components/Admin/ListOfMember";
import AddConjoint from "../../../components/Members/AddConjoint";
import AddChild from "../../../components/Members/AddChild";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMember } from "../../../stores/members";

const AddMember = () => {
  const user = useSelector((state) => state.cardMember.user);
  // const [currentStep, setCurrentStep] = useState(1);
  // const steps = [
  //   "Carte de membre",
  //   "Parents",
  //   "Enfants",
  //   "Recapitulatifs",
  //   "complete",
  // ];
  //const [userData, setUserData] = useState("");
  //const [finalData, setFinalData] = useState([]);
  // const displayStep = (step) => {
  //   switch (step) {
  //     case 1:
  //       return <MemberInfo />;
  //     case 2:
  //       return <ParentsInfo />;
  //     case 3:
  //       return <ChildInfo />;
  //     case 4:
  //       return <Payement />;
  //     case 5:
  //       return <Complete />;

  //     default:
  //   }
  // };
  // const handleClick = (direction) => {
  //   let newStep = currentStep;
  //   direction === "suivant" ? newStep++ : newStep--;
  //   newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  // };

  const dispatch = useDispatch();

  const clearAllFields = () => {
    //localStorage.removeItem("persist:root");
    // fname.value = "";
    // lname.value = "";
    // card_member.value = "";
console.log("object")
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
        id_conjoint: null, //ici id du membre qui est conjoint

        //pour la table hasmember
        Id_volet: null,
        Id_period: null,
      })
    );
  };

  clearAllFields();

  return (
    <>
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-base  font-bold tracking-tight text-sky-900 ">
          Gestion des membres
        </h2>
      </div>

      <Tabs>
        <TabList className="bg-sky-900 text-white font-extrabold  flex flex-col sm:flex-row mb-2">
          {user.role === "admin" && <Tab>Nouveau membre</Tab>}
          <Tab>Trouver un membre</Tab>
          {user.role === "admin" && <Tab>Ajouter un conjoint(e) au membre</Tab>}
          {user.role === "admin" && <Tab>Ajouter un enfant au membre</Tab>}
          {user.role === "admin" && <Tab>Reinscrire un membre</Tab>}
        </TabList>

        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase">
              {" "}
              / Ajout d'un membre
            </h2>
            <NewMember />
          </TabPanel>
        )}
        <TabPanel>
          <h2 className="text-red-900 font-bold uppercase">
            {" "}
            / Liste des membres
          </h2>
          <ListOfMember />
        </TabPanel>
        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase">
              {" "}
              / Ajout de conjoint(e)
            </h2>
            <AddConjoint />
          </TabPanel>
        )}

        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase">
              {" "}
              / Ajout d'enfants
            </h2>
            <AddChild />
          </TabPanel>
        )}
        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase">
              {" "}
              /Reinscrire un membre
            </h2>
          </TabPanel>
        )}
      </Tabs>

      {/* gestion des etapes */}
      {/* <div className="container horizontal mt-1 ">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="py-4 px-0 my-1 h-fit"> */}
      {/* <StepContext.Provider
            value={{ userData, setUserData, finalData, setFinalData }}
          > */}
      {/* {displayStep(currentStep)}
          {/* </StepContext.Provider> */}
      {/* </div>
     // </div> */}

      {/* gestion de la navigation */}
      {/* {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )} */}
    </>
  );
};

export default AddMember;
