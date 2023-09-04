/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios, { Method } from "axios";

/**
 * https://github.com/ali-master/react-typescript-hooks-sample
 */
const useAxios = (
  url: string,
  method: Method,
  body: any
): [boolean, string | null, any] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
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
      }
    };

    fetchData().then((r) => r);
  }, [url]);

  return [loading, error, plan];
};

export default useAxios;