import { useState } from "react";
import axios from "axios";
import useDebouncedPromise from "./useDebouncedPromise";

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false
};

export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
  const deabouncedAxios = useDebouncedPromise(axios, config.debounceDelay);

  async function call(localConfig) {
    setRequestInfo({
      ...localConfig,
      ...initialRequestInfo,
      loading: true
    });

    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:5000",
      delay: 500,
      ...config
    };

    const fn = finalConfig.debounced ? deabouncedAxios : axios;

    try {
      response = await fn(finalConfig);

      setRequestInfo({
        ...initialRequestInfo,
        data: response.data
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  }

  return [call, requestInfo];
}
