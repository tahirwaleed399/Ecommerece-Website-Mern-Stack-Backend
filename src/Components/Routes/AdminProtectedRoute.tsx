import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }:any) {
    const userState = useSelector((state:any)=>state.user);
    if(userState.isAuthenticated === null ) return 'Loading...';

    return userState.user.role ==='admin' ? children : <Navigate to="/me" />;
  }

  export default AdminProtectedRoute;