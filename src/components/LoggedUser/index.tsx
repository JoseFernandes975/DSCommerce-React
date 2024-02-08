import { useContext } from 'react';
import * as authService from '../../services/auth-service';
import { ContextToken } from '../../utils/context-token';
import { Link } from 'react-router-dom';

export default function LoggedUser(){
    
    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken); 

    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(undefined);
    }

    return(
/*Se TokenPayload existir e Token é valido? Se sim carregar essa div, se não, mostrar esse Link */ 
 contextTokenPayload && authService.isAuthenticated() 
      ? (
         <div className="dsc-logged-user">
         <p>{contextTokenPayload?.user_name}</p>
         <span onClick={handleLogoutClick}>Sair</span>
         </div>
        )
      : (
         <Link to="/login">
         Entrar
         </Link>
        )
    );
}