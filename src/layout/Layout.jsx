import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import HomeAside from "../components/homeAside/HomeAside";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from '../utils/axios';
import { fillUser } from "../redux/reducers/userSlice";

const Layout = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  //обновляем данные при обновлении страницы
  useEffect(() => {
    axios(`/users/${user.id}`)
    .then((res) => dispatch(fillUser(res.data)) )
  }, [])


  return (
    <>
      <Header />
      <main>
        {/* <div className="container"> */}
          <div className="content row">
            {location.pathname !== '/register' && location.pathname !== '/login' ? <HomeAside /> : '' }
            <Outlet />
          </div>
        {/* </div> */}
      </main>
      
      <Footer />
    </>
  );
};

export default Layout;
