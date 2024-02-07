import { useContext, useState } from 'react';
import './styles.css';
import * as cartService from '../../../services/cart-service';
import { OrderDTO } from '../../../models/order';
import { Link } from 'react-router-dom';
import { ContextCartCount } from '../../../utils/context-cart';


export default function Cart() {

  const [cart, setCart] = useState<OrderDTO>(cartService.get());

  const { setContextCartCount } = useContext(ContextCartCount);

  function handleClearClick(){
    cartService.clearCart();
    const newCart = cartService.get();
    setCart(newCart);
    setContextCartCount(newCart.items.length);
  }

  function handleIncreaseItemClick(productId: number){
    cartService.increaseItem(productId);
    setCart(cartService.get());
  }

  function handleDecreaseItemClick(productId: number){
    cartService.decreaseItem(productId);
    const newCart = cartService.get();
    setCart(newCart);
    setContextCartCount(newCart.items.length);
  }



    return(
        <main>
        <section id="cart-container-section" className="dsc-container">

        {
          cart.items.length === 0 
          ? ( <div><h2 className='dsc-section-title dsc-mb20'>Seu carrinho está vazio!</h2></div> )
          : (

             <div className="dsc-card dsc-mb20">

            {
                cart.items.map(x => (
                    <div key={x.productId} className="dsc-cart-item-container dsc-line-bottom">
                     <div className="dsc-cart-item-left">
                      <img src={x.imgUrl} alt={x.name} />
                     <div className="dsc-cart-item-description">
                       <h3>{x.name}</h3>
                        <div className="dsc-cart-item-quantity-container">
                          <div onClick={() => handleDecreaseItemClick(x.productId)} className="dsc-cart-item-quantity-btn">-</div>
                          <p>{x.quantity}</p>
                          <div onClick={() => handleIncreaseItemClick(x.productId)} className="dsc-cart-item-quantity-btn">+</div> 
                        </div>
                      </div>
                     </div>
                    <div className="dsc-cart-item-right">
                      R$ {x.subTotal.toFixed(2)}
                    </div>
                  </div>
                ))
            }
          
            <div className="dsc-cart-total-container">
              <h3>R$ {cart.total.toFixed(2)}</h3>
            </div>
          </div>
          )
        }


          
          <div className="dsc-btn-page-container">
              <div className="dsc-btn dsc-btn-blue">
                Finalizar pedido
              </div>
              <Link to={'/catalog'}>
              <div className="dsc-btn dsc-btn-white">
                Continuar comprando
              </div>
              </Link>
              <div onClick={handleClearClick} className="dsc-btn dsc-btn-white">
                Limpar Carrinho
              </div>
              
          </div>
        </section>
      </main>
    );
}