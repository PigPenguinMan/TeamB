import { useSelector } from 'react-redux';
import { useContext} from "react";
import DataContext from "../data/DataContext";
import Preview from './Preview';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../css/Notice.css'
import { useState, useEffect } from 'react';
import Notice_Modal from './Notice_Modal';
import { faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';
import { faGlassWater } from '@fortawesome/free-solid-svg-icons';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';


const Notice = () => {
    const data = useContext(DataContext);
    const infant = localStorage.getItem("currentInfant")

    const [temp1,setTemp1] = useState("");

    const [temp1_name, setTemp1_name] = useState("");

    const getInfantName = async () => {
        const docRef = doc(db, "infant", infant);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        setName(docSnap.data().name);
        }
    }
    useEffect(()=>{
        getInfantName()
    },[infant])

    const getInfantTemp = async () => {
        const docRef = doc(db, "infant", infant);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTemp1(docSnap.data().temperature);
        }
    }
    useEffect(()=>{
        getInfantTemp()
    },[data.state.mesureToggle])



    const preview4 = useSelector((state)=>(state.temperature.preview4))
    const date = new Date();

    const [show,setShow] = useState(false);
    const [name,setName] = useState("");
    const fever = function() {
        if(temp1 >= 39 ){
            setTemp1_name("고열") 
        } else if(temp1 >= 37.5 ){
            setTemp1_name("미열")
        } else if(temp1 >= 35.5){
            setTemp1_name("정상")
        } else {
            setTemp1_name("정상")
        }
    }
    useEffect(() => {
        fever()
    },[temp1])
    return (  
        <>
        {temp1 ? (
            <div className='notice_box' style={temp1_name == "고열" ?  {background:"#ffb6b9"} : temp1_name == "정상" ? {background:"#ccd8fc"} : null}>                
                <div className='today_date'>
                    {date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()}
                </div>
                <div className='temp_box clearfix'>
                    <div style={{display:"inline-block"}}>
                        <div className='temp_font_box'>
                            <div className='temp_font'>
                                <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{color:"#1b4542"}} />
                            </div>
                        </div>
                    <h2 className='infant_temp'>{temp1}°C</h2>
                    </div>
                </div>
                <p className='temp_name'>현재(최근): <span>{temp1_name} 상태</span></p>
                {temp1_name == "고열" ? 
                (
                    <>
                        <li className='temp_check'>{temp1_name} 상태로 병원 진료가 필요합니다.</li>
                        <div className='temp_desc_box'>
                            <ul>
                                <li className='happycat_box'>
                                    <img className='happycat' src={`${process.env.PUBLIC_URL}/images/unhappycat.jpg`} alt="아픈 고양이" />
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#ebfad9"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faPrescriptionBottleAlt} style={{color:"#ffa553"}} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        {temp1_name}상태 입니다. <span>1시간 뒤</span>체온상태에 따라 <span>해열제 복용 여부를 다시 확인</span>해요.
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#ffb6b9"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        높은 실내온도,수분부족 등에 의해서도 체온 상승할 수 있으니 다시 <span>1시간뒤 체온 측정</span>을 해주세요.
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#eff3ff"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faGlassWater} style={{color:"#89cbfd"}} />
                                        </div>
                                    </div >
                                    <div className='desc_box'>
                                        <span>수분 섭취</span>를 충분히 해 주세요
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#ffb6b9"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faShirt} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        옷은 가볍게 입히고 <span>가벼운 이불</span>을 덮어주세요. 
                                    </div>   
                                </li>
                            </ul>
                        </div>
                    </>
                ):(
                    <>
                        <li className='temp_check'>{temp1_name} 상태로 병원 진료는 필요하지 않아요.</li>
                        <div className='temp_desc_box'>
                            <ul>
                                <li className='happycat_box'>
                                    <img className='happycat' src={temp1_name == "정상" ? `${process.env.PUBLIC_URL}/images/happycat.jpg` : `${process.env.PUBLIC_URL}/images/unhappycat2.jpg`} alt="행복한 고양이" />
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#ebfad9"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faPrescriptionBottleAlt} style={{color:"#ffa553"}} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        {temp1_name}상태 입니다. <span>1시간 뒤</span>체온상태에 따라 <span>해열제 복용 여부를 다시 확인</span>해요.
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#fffbdb"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        높은 실내온도,수분부족 등에 의해서도 체온 상승할 수 있으니 다시 <span>1시간뒤 체온 측정</span>을 해주세요.
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#eff3ff"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faGlassWater} style={{color:"#89cbfd"}} />
                                        </div>
                                    </div >
                                    <div className='desc_box'>
                                        <span>수분 섭취</span>를 충분히 해 주세요
                                    </div>
                                </li>
                                <li className='clearfix'>
                                    <div className='desc_font_box' style={{ background: "#fffbdb"}}>
                                        <div className='desc_font'>
                                            <FontAwesomeIcon icon={faShirt} />
                                        </div>
                                    </div>
                                    <div className='desc_box'>
                                        옷은 가볍게 입히고 <span>가벼운 이불</span>을 덮어주세요. 
                                    </div>   
                                </li>
                            </ul>
                        </div>
                    </>
                )}
               <button className='plus_btn' style={{bottom:"-110px"}} onClick={()=>{
                    setShow(true)
                }}><div className='font_plus' ><FontAwesomeIcon style={{color:"white"}} icon={faPlus} /></div></button>
                {show && <Notice_Modal setShow={setShow}/>}
            </div>
        ):(
            data.state.login ? (
                <div className='first_box'>
                    <div className='My_row'>
                        <ul>
                            <li className='title'>{name}의 현재체온을 등록해주세요</li>
                            <li>우측하단에 버튼을 누르면</li>
                            <li><strong className='bold' >현재 체온 </strong>을 등록할 수 있어요</li>
                        </ul>
                        <button className='plus_btn' onClick={()=>{
                            setShow(true)
                        }}><div className='font_plus' ><FontAwesomeIcon style={{color:"white"}} icon={faPlus} /></div></button>
                        {show && <Notice_Modal setShow={setShow} />}
                </div>  
                </div>
            ):(
                <div className='notice_preview_box'>
                    <Preview content={preview4} />
                </div>
            )
        )}
        </>
    );
}
 
export default Notice;