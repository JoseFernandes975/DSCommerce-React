import { useEffect, useState } from 'react';
import './styles.css';
import * as cartService from '../../../localstorage/cart-repository';
import { OrderDTO, OrderItemDTO } from '../../../models/order';


const item1 = new OrderItemDTO(
    4, 1, "PC Gamer", 1200, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg"
);

const item2 = new OrderItemDTO(5, 2, "Rails for Dummies", 100.99, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg");


export default function Cart() {

  const [cart, setCart] = useState<OrderDTO>(cartService.get());

    return(
        <main>
        <section id="cart-container-section" className="dsc-container">
          <div className="dsc-card dsc-mb20">
            {
                cart.items.map(x => (
                    <div key={x.productId} className="dsc-cart-item-container dsc-line-bottom">
                     <div className="dsc-cart-item-left">
                      <img src={x.imgUrl} alt={x.name} />
                     <div className="dsc-cart-item-description">
                       <h3>{x.name}</h3>
                        <div className="dsc-cart-item-quantity-container">
                          <div className="dsc-cart-item-quantity-btn">-</div>
                          <p>{x.quantity}</p>
                          <div className="dsc-cart-item-quantity-btn">+</div>
                        </div>
                      </div>
                     </div>
                    <div className="dsc-cart-item-right">
                      R$ {(x.price * x.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
            }
          

           
            <div className="dsc-cart-total-container">
              <h3>R$ 15000,00</h3>
            </div>
          </div>
          <div className="dsc-btn-page-container">
              <div className="dsc-btn dsc-btn-blue">
                Finalizar pedido
              </div>
              <div className="dsc-btn dsc-btn-white">
                Continuar comprando
              </div>
          </div>
        </section>
      </main>
    );
}