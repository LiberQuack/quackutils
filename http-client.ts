import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios"

function httpClientBuilder(config?:AxiosRequestConfig): AxiosInstance {
    const httpClient = axios.create(config);

    httpClient.interceptors.response.use(undefined, ((error: AxiosError) => {
        const responseBody = error.response?.data;
        let prettyResponse

        try {
            prettyResponse = JSON.stringify(responseBody, null, 2)
        } finally {
            console.error(`Response with status ${error.response?.status} (${error.response?.statusText}) and body\r\n${prettyResponse ?? responseBody}`);
        }

        throw error;
    }))

    return httpClient;
}

export {httpClientBuilder};