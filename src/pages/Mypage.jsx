
import { useState } from "react";
import { doc,getDoc} from "firebase/firestore"
import { db } from "../Firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const [name,setName] = useState();
    const user = localStorage.getItem("currentUser")
    const getSingleData = async () => {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        }
      };
      console.log(name)
      useEffect(()=>{
        getSingleData()
      },[])

    const logOut =()=>{
        localStorage.clear();
        navigate('/');
    }



    return ( 
        <div className="Mypage"> 
            <div className="Mypage_first">
                {/* 프로필,이름 */}
                
                <p>{name}</p>
                <button onClick={()=>{logOut()}}>로그아웃</button>
            </div>
            <hr/>
            <div className="Mypage_second"></div>
            <hr/>
            <div className="Mypage_third"></div>
            <hr/>
            <div className="Mypage_forth"></div>
        </div>
    );
}
 
export default MyPage;

