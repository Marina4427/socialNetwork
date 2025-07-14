import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user = useSelector((store) => store.user.user);
    const navigate= useNavigate();
    return (
        <main>
            {(user) ? (navigate("/myprofile")) : null }
        </main>
     );
}
 
export default Home;