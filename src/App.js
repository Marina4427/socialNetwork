import { Suspense } from "react";
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
    </Suspense>
  );
}

export default App;
