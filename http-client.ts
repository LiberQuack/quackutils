import axios, {AxiosError, AxiosRequestConfig} from "axios"
import {inlineErr} from "./inline-error";

function httpClientBuilder(config?:AxiosRequestConfig) {
    const httpClient = axios.create(config);

    httpClient.interceptors.response.use(undefined, ((error: AxiosError) => {
        const responseBody = error.response?.data;
        let prettyResponse

        try {
            prettyResponse = JSON.stringify(responseBody, null, 2)
        } finally {
            console.error(`Response with status ${error.response?.status} (${error.response?.statusText}) and body\r\n${prettyResponse ?? responseBody}`);
        }

        return error
    }))
    return httpClient;
}

export {httpClientBuilder};