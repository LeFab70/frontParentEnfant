import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getHasMember, getMember } from "../../services/Member.Service";
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
import { getPeriods } from "../../services/Period.Service";
///import { getVolets } from "../../services/Volet.Service";
//import members from "../../stores/members";

const COLORS = [
  "#f9FE",
  "#a49F",
  "#1a0A",
  "#23fa",
  "#Ea2f",
  "black",
  "red",
  "teal",
];

const COLORS2 = ["#28FE", "#C49F", "#B428", "#3042", "#042"];
//const RADIAN = Math.PI / 180;
//  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,
//  }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
//   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
//   const value = data[index].value;
//   const percentage = `${((value / total) * 100).toFixed(2)}%`;

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor="middle"
//       dominantBaseline="central"
//     >
//       {`${percentage} (${value})`}
//     </text>)

// }

//({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       fontWeight={"bold"}
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

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
  const allPeriods = useQuery("periods", getPeriods);
  const idValidePeriod = allPeriods.data?.filter(
    (period) => period.close === null
  )[0].Id_period;
  const { data } = useQuery("members", getMember);
  // const queryClient = useQueryClient();
  const [members, setMembers] = React.useState(
    data?.filter(
      (member) => member.id_parent === null && member.id_conjoint === null
    )
  );
  const [child, setChild] = React.useState(
    data?.filter((member) => member.id_parent !== null)
  );
  React.useEffect(() => {
    setMembers(
      data?.filter(
        (member) => member.id_parent === null && member.id_conjoint === null
      )
    );
    setChild(data?.filter((member) => member.id_parent !== null));
  }, [data]);
  //data?.map((dat) => console.log(dat?.id_parent?.length));
  const numberOfMembersWithAge = (age) => {
    const value = members?.filter(
      (member) => member.group_of_age === age
    ).length;
    // console.log(value);
    return value;
  };

  /* verifier le cas de la periode

8=********************************** sur les stat precedent
*/

  // const wait = (duration = 1000) => {
  //   return new Promise((resolve) => {
  //     window.setTimeout(resolve, duration);
  //   });
  // };
  // console.log(members);

  //a revoir suivant l'id de la periode active et refactorine
  const dataList = [
    { name: "Group 0-19", value: numberOfMembersWithAge("0-19") },
    { name: "Group 20-24", value: numberOfMembersWithAge("20-24") },
    { name: "Group 25-29", value: numberOfMembersWithAge("25-29") },
    { name: "Group 30-34", value: numberOfMembersWithAge("30-34") },
    { name: "Group 35-39", value: numberOfMembersWithAge("35-39") },
    { name: "Group 40-44", value: numberOfMembersWithAge("40-44") },
    { name: "Group 45-54", value: numberOfMembersWithAge("45-54") },
    { name: "Group 55+", value: numberOfMembersWithAge("55+") },
  ];
  const data02 = [];

  for (let data of dataList) {
    if (data.value !== 0) data02.push(data);
  }
  const data01 = [];
  //const queryClient = useQuery("volets", getVolets);
  const dataListVolet = useQuery("voletsList", getHasMember);
  //console.table(dataListVolet.data); , {
  //   refetchIntervalInBackground: 60000,
  // }
  //const voletsList = dataListVolet.data ? dataListVolet.data : [];
  // console.table(
  //   voletsList
  //   //dataListVolet.data?.filter((volets) => idValidePeriod === volets?.Id_period)
  // );
  const [listVolets, setListVolets] = React.useState([]);

  // const listVolets = dataListVolet.data
  //   ? [
  //       ...dataListVolet.data.filter(
  //         (volets) => idValidePeriod === volets?.Id_period
  //       ),
  //     ]
  //   : [];

  useEffect(() => {
    setListVolets(
      dataListVolet.data
        ? [
            ...dataListVolet.data.filter(
              (volets) => idValidePeriod === volets?.Id_period
            ),
          ]
        : []
    );
  }, [dataListVolet.data, idValidePeriod]);
  //console.log(listVolets);
  const nameVolets = [];
  const numberOfMembersWithVolet = () => {
    for (let volet of listVolets) {
      // console.log(volet.Volet?.label_volet);
      // const voletFound = {
      //   name: volet.Volet?.label_volet ? volet.Volet?.label_volet : "",
      //   value: listVolets?.filter(
      //     (voletu) => voletu.Volet?.label_volet === this.name
      //   ).length,
      // };
      // if (volet.Volet?.label_volet1 !== undefined)
      nameVolets.push(volet.Volet?.label_volet);
    }
    //console.log(value);
    //return value;
  };

  numberOfMembersWithVolet();

  const grouped = [
    nameVolets.reduce((result, current) => {
      //console.log(current)
      if (current !== undefined)
        if (!result[current]) {
          result[current] = 1;
        } else {
          result[current]++;
        }
      //console.log(result);
      return result;
    }, {}),
  ];

  grouped.forEach((obj) => {
    for (const prop in obj) {
      //console.log(prop, obj[prop]);
      data01.push({ name: prop, value: obj[prop] });
    }
  });
  const total = data01.reduce((sum, entry) => sum + entry.value, 0);
  const total2 = data02.reduce((sum, entry) => sum + entry.value, 0);

  //console.log(grouped);
  // for (let volet of grouped) {
  //   console.log(volet)
  //   // data01.push({
  //   //   name: grouped[0],
  //   //   value: grouped,
  //   // });
  // }
  //console.log(nameVolets);
  // for (let volet of nameVolets) {
  //   //const element = volet;
  //   // console.log(nameVolets.filter((v) => v === volet))
  //   if (volet !== undefined)
  //     data01.push({
  //       name: "volet",
  //       value: nameVolets.filter((v) => v === volet).length,
  //     });
  //   // { name: "BKG", value: 1 },
  //   // { name: "PETITE ECOLES", value: 1 },
  //   // { name: "COPAINS-COPINES", value: 1 },
  //   // { name: "ENTR'ADOS", value: 1 },
  //   // { name: "ADULTES", value: 1 },
  // }

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
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                }) => {
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  const value = data02[index].value;
                  const percentage = `${((value / total2) * 100).toFixed()}%`;

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="black"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {`${percentage} (${value})`}
                    </text>
                  );
                }}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                innerRadius={4}
                paddingAngle={10}
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
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                const value = data01[index].value;
                const percentage = `${((value / total) * 100).toFixed()}%`;

                return (
                  <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {`${percentage} (${value})`}
                  </text>
                );
              }}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              innerRadius={1}
              paddingAngle={5}
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
