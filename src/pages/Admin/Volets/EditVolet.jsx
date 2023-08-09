import React from "react";
import ListVolets from "../../../components/Admin/ListVolets";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Periode from "../../../components/Admin/Periode";
import UsersAdd from "../Users/UsersAdd";
const EditVolet = () => {
  return (
    <div>
      <h1 className="text-center my-2 text-3xl text-sky-800 font-bold">
        Reglages
      </h1>

      <Tabs>
        <TabList>
          <Tab>Volets</Tab>
          <Tab>Periode</Tab>
          <Tab>Utilisateurs</Tab>
        </TabList>

        <TabPanel>
          <h2 className="text-sky-900 font-bold uppercase">
            {" "}
            / Gestion des volets
          </h2>
          <ListVolets />
        </TabPanel>
        <TabPanel>
          <h2 className="text-sky-900 font-bold uppercase">
            {" "}
            / Gestion des periodes
          </h2>
          <Periode />
        </TabPanel>
        <TabPanel>
          <h2 className="text-sky-900 font-bold uppercase">
            {" "}
            / Gestion des utilisateurs
          </h2>
          <UsersAdd />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EditVolet;
