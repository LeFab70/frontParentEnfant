import React from "react";
//import ChartHome from "../../components/Admin/ChartHome";
//import { Link } from "react-router-dom";
//import SideMenu from "../../components/Admin/SideMenu";
import { lazy, Suspense } from "react";
//import MultiFormMember from "../../components/Admin/MultiFormMember";

const Dashboard = () => {
  //const [index, setIndex] = useState(1);
  const ChartHome = lazy(() => import("../../components/Admin/ChartHome"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChartHome />
      {/* <MultiFormMember step={index} /> */}
    </Suspense>
  );
};

export default Dashboard;
