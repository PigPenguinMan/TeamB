import { useContext, useState } from "react";
import DataContext from "../data/DataContext";
import '../css/Notice_Modal.css'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Notice_Modal = (props) => {
    const infant = localStorage.getItem("currentInfant")
    const infantRef = doc(db, "infant", infant)
    const data = useContext(DataContext)
    
    const setMeasures = async (e) => {
        await updateDoc(infantRef, {
            [e.target.name]: input
        });
        data.action.setMesureToggle(!data.state.mesureToggle)
        props.setShow(false)
    }

    const [input,setInput] = useState("");
    const inputDesc = (e) => {
        setInput(e.target.value)
    }
    return (  
        <>
            <div className="layer_bg">
                <div className="layer_notice">
                    <div className="measure_box">
                    <p>체온을 입력해주세요</p>
                    <input type="text" onChange={inputDesc} />
                    {input ? (
                        <>
                            <button name="temperature" onClick={setMeasures
                            }>완료</button>
                        </>
                    ):(
                        <>
                            <button onClick={()=>{props.setShow(false)}}>취소</button>
                        </>
                    )

                    }
                </div>
                </div>
            </div>
        </>
    );
}
 
export default Notice_Modal;