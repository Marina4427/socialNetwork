import { Suspense } from "react";
import "./styles/style.scss";
import "./utils/i18n";
import PrivateRouting from "./routing/PrivateRouting";
import AuthRouting from "./routing/AuthRouting";
import { useSelector } from "react-redux";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  const user = useSelector((store) => store.user?.user);

  return (
    <Suspense fallback={"...Loading"}>
      { !(user?.email.length) ? <AuthRouting /> : <PrivateRouting />}
     
    </Suspense>
  );
}

export default App;