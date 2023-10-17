import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../hooks/useAxios";
import { Item } from "../../components/PlanTable/config";
import { DefaultSpinner } from "../../components/Spinner";

export const GraphicsPage = () => {
  const [data, setData] = useState<Item[]>();

  const [loading, error, plan, setRefreshInterval] = useAxios(
    "https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/plan_data.json?auth=sRB7jdjPFoz38yQ9339pUHK0ID33f8t45K5UiK7Q",
    "get",
    null
  );

  // const data = [
  //   {
  //     "name": "Page A",
  //     "uv": 4000,
  //     "pv": 2400
  //   },
  //   {
  //     "name": "Page B",
  //     "uv": 3000,
  //     "pv": 1398
  //   },
  //   {
  //     "name": "Page C",
  //     "uv": 2000,
  //     "pv": 9800
  //   },
  //   {
  //     "name": "Page D",
  //     "uv": 2780,
  //     "pv": 3908
  //   },
  //   {
  //     "name": "Page E",
  //     "uv": 1890,
  //     "pv": 4800
  //   },
  //   {
  //     "name": "Page F",
  //     "uv": 2390,
  //     "pv": 3800
  //   },
  //   {
  //     "name": "Page G",
  //     "uv": 3490,
  //     "pv": 4300
  //   }
  // ]

  useEffect(() => {
    if (plan !== null) {
      setData(plan);
      setRefreshInterval(10000);
      console.log(plan);
    }
  }, [plan]);

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  } else if (loading) {
    return (
      <>
        <DefaultSpinner size="extra-large" label={"Loading data..."} />
      </>
    );
  } else {
    return (
      <div style={{ width: "100%", height: 400 }}>     
<ResponsiveContainer>
        <BarChart
          width={1200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }
        }
        barCategoryGap={'30%'}
        // barGap={"10%"}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="inplan" fill="#8884d8" />
          <Bar dataKey="produced" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    );
  }
};
