import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import { SiMinutemailer } from "react-icons/si";
import { FcStatistics } from "react-icons/fc";
const Statistique = () => {
  const user = useSelector((state) => state.cardMember.user);

  return (
    <>
      <div className="mx-auto max-w-7xl text-center mt-2 uppercase">
        <h2 className="text-base  font-bold tracking-tight text-sky-900 ">
          Impressions Statitstiques et Envoi des mails aux membres
        </h2>
      </div>
      <Tabs>
        <TabList className="bg-sky-900 text-white font-extrabold  flex flex-col sm:flex-row mb-2">
          {user.role === "admin" && (
            <Tab>
              <div className="flex gap-3 align-items-center ">
                Statistique{" "}
                <FcStatistics className="font-extrabold text-red-950 " />
              </div>
            </Tab>
          )}

          {user.role === "admin" && (
            <Tab>
              <div className="flex gap-3 align-items-center ">
                {" "}
                Envoie des mails{" "}
                <SiMinutemailer className="font-extrabold text-2xl text-center" />
              </div>{" "}
            </Tab>
          )}
        </TabList>

        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase"> / Statistique</h2>
            {/* <NewMember /> */}
          </TabPanel>
        )}
        {user.role === "admin" && (
          <TabPanel>
            <h2 className="text-red-900 font-bold uppercase">
              {" "}
              / Envoie des mails
            </h2>
            {/* <ListOfMember /> */}
          </TabPanel>
        )}
      </Tabs>
    </>
  );
};

export default Statistique;
