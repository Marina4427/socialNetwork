import { Suspense } from "react";
<<<<<<< HEAD
import "./styles/style.scss";
import "./utils/i18n";
import PrivateRouting from "./routing/PrivateRouting";
import AuthRouting from "./routing/AuthRouting";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user?.user);

  return (
    <Suspense fallback={"...Loading"}>
      {!user.email.length ? <AuthRouting /> : <PrivateRouting />}
=======
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Friends from "./pages/Friends/Friends";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MyProfile from "./pages/MyProfile/MyProfile";
import './styles/style.scss';
import './utils/i18n';
import NotFound from "./pages/NotFound/NotFound";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector((store) => store.user?.user || { email: '' })
  return (
    <Suspense fallback={"...Loading"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="friends" element={<Friends />} />

          {!user?.email && (
            <>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </>
          )}
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
>>>>>>> 7e0dc2ea8a76232a807cad12bcc021aeb3673514
    </Suspense>
  );
}

export default App;
