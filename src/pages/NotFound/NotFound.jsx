import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NotFound = () => {
  const user = useSelector((store) => store.user?.user);
  if ( !user?.email) {
    return (
      <Navigate to ='/login' />
    );
  }

  return <Navigate to="/" />;
};

export default NotFound;
