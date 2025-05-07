import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import HomeAside from "../components/homeAside/HomeAside";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <main>
        {/* <div className="container"> */}
          <div className="content">
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
