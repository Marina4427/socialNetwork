import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const {user} = useSelector((store) => store.user)
  if ( !user.email.length) {
    return (
      <Navigate to ='/register' />
    );
  }

  return <Navigate to="/" />;
};

export default NotFound;
