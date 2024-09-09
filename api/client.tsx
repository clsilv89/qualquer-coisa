import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => apiClient.get(url).then(responseBody),
    post: (url: string, body: {}) => apiClient.post(url, body).then(responseBody),
    put: (url: string, body: {}) => apiClient.put(url, body).then(responseBody),
    delete: (url: string) => apiClient.delete(url).then(responseBody),
};

export const Post = {
    getPosts: (): Promise<{}> => requests.get(`posts`),
};