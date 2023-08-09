import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    Id_member: "",
    type_of_member: "famille",
    card_member: "",
    sexe: "M",
    type_of_family: "",
    family_income: "",
    number_children_house: 0,
    number_children_carrefour: 0,
    number_adult: "",
    how_know_us: "",
    status_member: "",
    fname_urgency: "",
    lname_urgency: "",
    adresse_urgency: "",
    phone_urgency: "",
    lien_urgency: "",
    remarks: "",
    paid_card: "",
    fname: "",
    lname: "",
    codePostal_member: "",
    city_member: "",
    adress_member: "",
    email_member: "",
    phone_member: "",
    group_of_age: "",
    sourceRevenue: "",
    language: "",
    origineEthnique: "",
    autorisationPicture: "",
    tuteur: "",
    level_of_school: "",
    fonction: "",

    allergies_connues: "",
    restrictions_foods: "",
    medicaments: "",
    eat_alone: "",
    rentreSeul: "",
    details_health: "",
    expirationHealth: "",
    numberHealth: "",
    health_info: "",
    birthday_child: "",
    school_child: "",
    autorisationDivulguerInfo: "",
    autorisationDivulgationDoctor: "",
    id_parent: "", //ici id du membre parent
    id_intervenant: "", //ici id du membre qui est intervenant

    //data conjoint
    id_conjoint: "", //ici id du membre qui est conjoint

    //pour la table hasmember
    Id_volet: "",
    Id_period: "",
  },

  reducers: {
    addMember: (state, action) => {
      const oneMember = action.payload;
      return { ...state, ...oneMember };
    },
    deleteMember: (state, action) => {},
    alterMember: (state, action) => {},
  },
});
export const { addMember, deleteMember, alterMember } = memberSlice.actions;

export default memberSlice.reducer;
