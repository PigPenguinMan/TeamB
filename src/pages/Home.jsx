
import SearchBar_Home from "../components/SearchBar";
import Weather from "../components/Weather";
import DataContext from "../data/DataContext";
import HealthInfo from '../components/HealthInfo'
import { useNavigate } from "react-router-dom";
import FirebaseSignUp from "./FirebaseSignUp";
import { useContext } from "react";
import { useEffect } from "react";
import FirebaseLogin from "../components/FirebaseLogin";
const Home = () => {
    const data = useContext(DataContext);
    
    const user = localStorage.getItem("currentUser")
    console.log("user",data.action)
    useEffect(()=>{
        if(user){
            data.action.setIsLoginned(true)
        } else {
            data.action.setIsLoginned(false)
        }
    },[user]);
    
    const navigate = useNavigate();
    const navQustion = ()=>{
        navigate('/question');
    }
    
    return ( 
        <div className="Home">
            {data.state.isLoginned ? (
                <>
                    <div className="Search_box">
                        <SearchBar_Home/>
                    </div>
                    <br/>
                    <div className="Temperature">기온 날씨
                        <Weather/>
                    </div>
                    <div>
                        <HealthInfo/>
                    </div>
                    <br/>
                    <div className="Questionnaire">
                        <button onClick={navQustion}> 문진표 작성</button>
                    </div>    
                    <br/>
                </>
            ):(
                <>
                <FirebaseSignUp />
                <FirebaseLogin />
                </>
            )}
        </div>
    );
}

export default Home;