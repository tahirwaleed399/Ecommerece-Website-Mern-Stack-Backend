import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }:any) {
    const userState = useSelector((state:any)=>state.user);
    if(userState.isAuthenticated === null ) return 'Loading...';

    return userState.isAuthenticated ? children : <Navigate to="/" />;
  }

  export default PrivateRoute;