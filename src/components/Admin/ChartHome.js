import React from "react";
import { useQuery } from "react-query";
import { getMember } from "../../services/Member.Service";
import { GrDocumentUser } from "react-icons/gr";
import { MdFamilyRestroom, MdChildCare } from "react-icons/md";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  //Sector,
  Cell,
  //ResponsiveContainer,
} from "recharts";
//import members from "../../stores/members";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#3E0F0A",
  "#FF8042",
  "#0A28FE",
  "#C0049F",
];

const COLORS2 = ["#0A28FE", "#C0049F", "#BCB428", "#34B3042", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontWeight={"bold"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const data = {
//   labels: ["parents", "enfants", "intervenants"],
//   datasets: [
//     {
//       label: "Membres association",
//       data: ["60", "5", "35"],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//       ],
//       borderWidth: 3,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };
const ChartHome = () => {
  const { data } = useQuery("members", getMember);
  // const queryClient = useQueryClient();
  const [members, setMembers] = React.useState(
    data?.filter((member) => member.id_parent=== null && member.id_conjoint === null)
  );
  const [child, setChild] = React.useState(
    data?.filter((member) => member.id_parent !== null)
  );
  React.useEffect(() => {
    setMembers(data?.filter((member) => member.id_parent=== null && member.id_conjoint === null));
    setChild(data?.filter((member) => member.id_parent !== null));
  }, [data]);
  //data?.map((dat) => console.log(dat?.id_parent?.length));
  const numberOfMembersWithAge = (age) => {
    const value = members?.filter(
      (member) => member.group_of_age === age
    ).length;
    console.log(value);
    return value;
  };

  // const wait = (duration = 1000) => {
  //   return new Promise((resolve) => {
  //     window.setTimeout(resolve, duration);
  //   });
  // };
  // console.log(members);

  const data02 = [
    { name: "Group 0-19", value: numberOfMembersWithAge("0-19") },
    { name: "Group 20-24", value: numberOfMembersWithAge("20-24") },
    { name: "Group 25-29", value: numberOfMembersWithAge("25-29") },
    { name: "Group 30-34", value: numberOfMembersWithAge("30-34") },
    { name: "Group 35-39", value: numberOfMembersWithAge("35-39") },
    { name: "Group 40-44", value: numberOfMembersWithAge("40-44") },
    { name: "Group 45-54", value: numberOfMembersWithAge("45-54") },
    { name: "Group 55+", value: numberOfMembersWithAge("55+") },
  ];
  const data01 = [
    { name: "BKG", value: 1 },
    { name: "PETITE ECOLES", value: 1 },
    { name: "COPAINS-COPINES", value: 1 },
    { name: "ENTR'ADOS", value: 1 },
    { name: "ADULTES", value: 1 },
  ];
  return (
    <div className="h-full">
      <div className="mt-2 flex items-center flex-wrap gap-1 justify-center pb-4 space-y-2 md:space-y-1 ">
        <div className=" rounded-xl bg-purple-100 border-l-[5px] border-sky-600  flex items-center justify-between cursor-no-drop hover:shadow-xl transform hover:scale-[103%] hover:translate-x-3 transition duration-200 ease-in-out ">
          {/* <Pie data={data} options={options} /> */}
          <div className="flex  flex-col items-center justify-center">
            <div className=" flex  items-center justify-around gap-2">
              <GrDocumentUser color="green" fontSize={40} />
              <h2 className="text-sky-600 leading-[17px] font-extrabold uppercase text-2xl">
                {" "}
                membres{" "}
                <span className="text-red-700 text-5xl">{members?.length}</span>
              </h2>
            </div>
            <div className=" flex items-center justify-center mb-2 flex-wrap mt-4">
              <div className="flex items-center justify-center px-2 ">
                <span>stagiaires</span> :
                <span className="text-red-700 font-bold text-2xl">
                  {" "}
                  {
                    members?.filter(
                      (member) => member.type_of_member === "stagiaires"
                    ).length
                  }{" "}
                </span>
              </div>

              <div className="flex items-center justify-center px-4 ">
                <span>partenaires</span> :
                <span className="text-red-700 font-bold text-2xl">
                  {" "}
                  {
                    members?.filter(
                      (member) => member.type_of_member === "partenaires"
                    ).length
                  }{" "}
                </span>
              </div>

              <div className="flex items-center justify-center gpx-4">
                <span>employes</span> :
                <span className="text-red-700 font-bold text-2xl">
                  {" "}
                  {
                    members?.filter(
                      (member) => member.type_of_member === "Employe"
                    ).length
                  }{" "}
                </span>
              </div>
              <div className="flex items-center justify-center  px-4">
                <span>benevoles</span> :
                <span className="text-red-700 font-bold text-2xl">
                  {" "}
                  {
                    members?.filter(
                      (member) => member.type_of_member === "benevoles"
                    ).length
                  }{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-2 w-fit h-[100px] rounded-xl bg-slate-200 border-l-[5px] border-sky-600 px-8 flex items-center justify-between cursor-no-drop hover:translate-x-3 hover:shadow-xl transform hover:scale-[103%] transition duration-200 ease-in-out ">
          {/* <Pie data={data} options={options} /> */}
          <div className="flex  flex-col items-center justify-center">
            <div className=" flex  items-center justify-around gap-2">
              <MdFamilyRestroom color="green" fontSize={40} />
              <h2 className="text-green-800 leading-[17px] font-extrabold uppercase text-2xl">
                {" "}
                Familles{" "}
                <span className="text-red-700 font-bold text-4xl">
                  {
                    members?.filter(
                      (member) => member.type_of_member === "famille"
                    ).length
                  }
                </span>
              </h2>
            </div>
            <div>
              <h1 className="text-base uppercase font-extrabold text-teal-800  leading-[24px] py-2">
                <p>
                  <span>MonoParentales</span>:
                  <span className="text-red-700 font-bold text-2xl">
                    {
                      members?.filter(
                        (member) =>
                          member.type_of_member === "famille" &&
                          (member.type_of_family === "Monoparentale (mère)" ||
                            member.type_of_family === "Monoparentale (père)")
                      ).length
                    }
                  </span>
                </p>
                <p>
                  <span>Biparentales</span>:
                  <span className="text-red-700 font-bold text-2xl">
                    {
                      members?.filter(
                        (member) =>
                          member.type_of_member === "famille" &&
                          (member.type_of_family === "Nucleaire" ||
                            member.type_of_family === "Recomposee" ||
                            member.type_of_family === "Homoparentale (mère)" ||
                            member.type_of_family === "Homoparentale (père)")
                      ).length
                    }
                  </span>
                </p>
              </h1>
            </div>
          </div>
        </div>

        <div className="w-fit h-[100px] py-1 rounded-xl bg-red-100 border-l-[5px] border-sky-600 px-10 flex items-center justify-between cursor-no-drop hover:translate-x-3 hover:shadow-xl transform hover:scale-[103%] transition duration-200 ease-in-out ">
          {/* <Pie data={data} options={options} /> */}
          <div className="flex  flex-col items-center justify-center">
            <div className=" flex  items-center justify-around gap-2">
              <MdChildCare color="purple" fontSize={40} />
              <h2 className="text-purple-900 leading-[17px] font-extrabold uppercase text-2xl">
                {" "}
                Enfants:{" "}
                <span className="text-red-700 font-bold text-4xl">
                  {child?.length}
                </span>
              </h2>
            </div>
            <div>
              <h1 className="text-base uppercase font-extrabold text-teal-800  leading-[24px] py-2">
                <p>
                  <span>filles</span>:
                  <span className="text-red-700 font-bold text-2xl">
                    {" "}
                    {child?.filter((child) => child.sexe === "F").length}
                  </span>
                </p>
                <p>
                  <span>Garcons</span>:
                  <span className="text-red-700 font-bold text-2xl">
                    {child?.filter((child) => child.sexe === "M").length}
                  </span>
                </p>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="basic-[50%] flex flex-col items-center justify-center">
          <div className="bg-gray-200 shadow-2xl">
            <PieChart width={400} height={400}>
              {/* <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data02}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="green"
              label
            /> */}

              <Pie
                data={data02}
                cx="50%"
                cy="50%"
                labelLine={true}
                legendType="triangle"
                label
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                innerRadius={1}
                paddingAngle={2}
              >
                {data02.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="top" />

              <Tooltip />
            </PieChart>
          </div>
          <h1 className="text-base uppercase  text-green-900 font-bold ">
            Groupe d'age des membres
          </h1>
        </div>

        <div className="basic-[50%] flex flex-col items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              cx="50%"
              cy="50%"
              labelLine={true}
              legendType="circle"
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              innerRadius={1}
              paddingAngle={2}
            >
              {data02.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS2[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>

          <h1 className="text-base uppercase  text-teal-900 font-bold ">
            Classification des volets
          </h1>
        </div>
      </div>

      {/* <Pie data={data} options={options} /> */}
      {/* <Pie data={data} options={options} /> */}
    </div>
  );
};

export default ChartHome;
