import { OrderDTO } from "../models/order";

export function save(cart: OrderDTO){
    const obj = JSON.stringify(cart);
    localStorage.setItem("com.josefernandes.jfcommerce/cart",obj);
}

export function get(): OrderDTO{
 const order =  localStorage.getItem("com.josefernandes.jfcommerce/cart") || '{"items":[]}';
 return JSON.parse(order);
}