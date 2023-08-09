//import { useDispatch, useSelector } from "react-redux";
//const dispatch = useDispatch();
export const clearAllField = (a, b) => {
  //const dispatch = useDispatch();
  console.log(a);
  console.log(b);
  a(
    b({
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
