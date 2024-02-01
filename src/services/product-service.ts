
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";

export function findPageRequest(page: number, name: string, sort = "name", size = 12) {
    /*Um objeto onde contém as configurações da requisição*/
     const config : AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
          page: page,
          name: name,
          sort: sort,
          size: size
        }
     }

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/products/${id}`});
}
