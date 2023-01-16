import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import Question from "../components/Question";
import Singup from "../components/Singup";
import DataContext from "../data/DataContext";
import { db } from "../Firebase";

const Main = () => {
    const data = useContext(DataContext)
    const user = localStorage.getItem("currentUser")
    // 아이유무 함수
    const ischeckInfant = async () => {
        const docRef = doc(db, "infant", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            data.action.setLogin(true)
            localStorage.setItem("currentInfant",user)
        } else {
            data.action.setLogin(false)
        }
    }
    useEffect(()=>{
        ischeckInfant()
    },[user])
    return ( 
        <div>
            <Singup/>
            <Nav/>
        </div>    
    );
}

export default Main;