/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios, { Method } from "axios";

/**
 * https://github.com/ali-master/react-typescript-hooks-sample
 */
const useAxios = (
  url: string,
  method: Method,
  body: any
): [boolean, string | null, any, Dispatch<SetStateAction<number>>] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios({
        url: url,
        method: method,
        data: body,
      });
      
      const data = Object.values(response?.data);
      setPlan(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      // setRefreshInterval(10000);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().then((r) => r);
  }, [url]);

useEffect(() => {
  if (refreshInterval && refreshInterval > 0) {
    const interval = setInterval(() => { fetchData().then((r) => r) }, refreshInterval);
    console.log("Interval UseEffect invoked");
    // setPlan(plan);
    return () => clearInterval(interval);
  }
}, [refreshInterval]);

return [loading, error, plan, setRefreshInterval];
};

export default useAxios;
