import { Suspense } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Friends from "./pages/Friends/Friends";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MyProfile from "./pages/MyProfile/MyProfile";
import './styles/style.scss';

function App() {
  return (
    <Suspense fallback={"...Loading"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="friends" element={<Friends />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;