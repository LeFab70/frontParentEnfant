import { useTranslation } from "react-i18next";

const Languageoption = (props) => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 border-2 border-sky-700  px-4 py-2 bg-gray-100  text-xl text-gray-900 rounded-md  ">
      <span className="mr-2 text-gray-500"> {t("choiceLanguage")}</span>
      <select
        onChange={props.onChange}
        className="bg-white text-gray-900 font-bold border-2 border-sky-600 rounded-xl px-4 py-1"
      >
        {/* <option>{t("choiceLanguage")}</option> */}
        <option value={"fr"}>Francais</option>
        <option value={"en"}>English</option>
      </select>
    </div>
  );
};
export default Languageoption;
