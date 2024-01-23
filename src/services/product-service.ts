
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, name: string, sort = "name", size = 12) {
    /*Um objeto onde contém as configurações da requisição*/
     const config : AxiosRequestConfig = {
        method: "GET",
        baseURL: BASE_URL,
        url: "/products",
        params: {
          page: page,
          name: name,
          sort: sort,
          size: size
        }
     }

    return axios(config);
}

export function findById(id: number) {
    return axios.get(`${BASE_URL}/products/${id}`);
}
