import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import { ProductDTO } from "../models/product";

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

export function deleteById(productId: number){
  const config : AxiosRequestConfig = {
    method: "DELETE",
    url: `/products/${productId}`,
    withCredentials: true
  }

  return requestBackend(config);
}

export function updateRequest(obj: ProductDTO){
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/products/${obj.id}`,
    withCredentials: true,
    data: obj
  }

  return requestBackend(config);
}

export function insertRequest(obj: ProductDTO){
const config: AxiosRequestConfig = {
  method: "POST",
  url: "/products",
  withCredentials: true,
  data: obj
}

return requestBackend(config);
}