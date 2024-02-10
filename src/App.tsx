import { Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ClientHome from './routes/ClientHome';
import ProductDetails from './routes/ClientHome/ProductDetails';
import Cart from './routes/ClientHome/Cart';
import { ContextCartCount } from './utils/context-cart';
import { useEffect, useState } from 'react';
import Login from './routes/ClientHome/Login';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from './utils/history';
import { PrivateRoute } from './components/PrivateRouter';
import { AccessTokenPayloadDTO } from './models/auth';
import { ContextToken } from './utils/context-token';
import * as authService from './services/auth-service';
import * as cartService from './services/cart-service';
import Confirmation from './routes/ClientHome/Confirmation';

function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  /*Para iniciar pegando a quantidade de items no carrinho salvo no localstorage*/ 
  /*Verifica se o token é válido, se for, iniciar pegando o token já salvo no localstorage*/ 
  useEffect(() => {
    setContextCartCount(cartService.get().items.length);

    if (authService.isAuthenticated()) {
    const payload = authService.getAccessTokenPayload();
    setContextTokenPayload(payload);
    }
    }, []);

return(
  <ContextCartCount.Provider  value={{contextCartCount, setContextCartCount}}>
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>


    <HistoryRouter history={history}>
    <Routes>
     <Route path='/' element={<ClientHome />} >
       <Route index element={<Catalog />} />
       <Route path='catalog' element={<Catalog />} />
       <Route path='product-details/:productId' element={<ProductDetails />} />
       <Route path='cart' element={<Cart />} />
       <Route path='login' element={<Login />} />
       <Route path='confirmation/:orderId' element={<PrivateRoute><Confirmation /></PrivateRoute> } />
     </Route>
     <Route path='/admin' element={<PrivateRoute roles={["ROLE_ADMIN"]}><Admin /></PrivateRoute> }>
       <Route index element={<AdminHome />} />
     </Route>
     <Route path='*' element={<Navigate to="/" />} />
 
    </Routes>
    </HistoryRouter>
    </ContextToken.Provider>
    </ContextCartCount.Provider>
);
}

export default App
