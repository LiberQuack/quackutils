import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios"

function httpClientBuilder(config?:AxiosRequestConfig): AxiosInstance {
    const httpClient = axios.create(config);

    httpClient.interceptors.response.use(undefined, ((error: AxiosError) => {
        const responseBody = error.response?.data;
        let prettyResponse

        try {
            prettyResponse = JSON.stringify(responseBody, null, 2)
        } finally {
            let enhancedErrorMessage = `Response status ${error.response?.status} body\r\n${prettyResponse ?? responseBody}`;
            console.error(enhancedErrorMessage);

            (error as any).originalMessage = error.message
            error.message = enhancedErrorMessage
        }

        throw error;
    }))

    return httpClient;
}

export {httpClientBuilder};