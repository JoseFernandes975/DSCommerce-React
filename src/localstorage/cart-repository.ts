import { OrderDTO, OrderItemDTO } from "../models/order";
import { CART_KEY } from "../utils/system";

export function save(cart: OrderDTO){
    const obj = JSON.stringify(cart);
    localStorage.setItem(CART_KEY,obj);
}

export function get(): OrderDTO{
 const str =  localStorage.getItem(CART_KEY) || '{"items":[]}';
 const obj = JSON.parse(str) as OrderDTO;

 const cart = new OrderDTO();
 obj.items.forEach(x => {
   cart.items.push(new OrderItemDTO(x.productId, 1, x.name, x.price, x.imgUrl));
 });

 console.log(cart);
 return cart;
}