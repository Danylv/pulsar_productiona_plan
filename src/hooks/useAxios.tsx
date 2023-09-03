import { useState, useEffect } from "react";
// import axios from 'axios';

// interface IuseAxiosParams extends AxiosStatic {
// url?: string;
// method: string;
// body?: string,
// headers?: string;
// };
// const axios = require("axios").defaults.baseURL;
const useAxios = ({ method, body = null, headers = null }: any) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState();
  const [loading, setloading] = useState(true);
//   axios.defaults.baseURL =
//   'https://pulsar-a051b-default-rtdb.europe-west1.firebasedatabase.app/plan_data.json?auth=sRB7jdjPFoz38yQ9339pUHK0ID33f8t45K5UiK7Q';

//   const fetchData = () => {
//     axios[method](axios.defaults.baseURL, JSON.parse(headers), JSON.parse(body))
//       .then((res: any) => {
//         setResponse(res.data);
//       })
//       .catch((err: any) => {
//         setError(err);
//       })
//       .finally(() => {
//         setloading(false);
//       });
//   };

  useEffect(() => {
    // fetchData();
  }, [method, body, headers]);

  return { response, error, loading };
};

export default useAxios;
