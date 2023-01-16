import SearchBar_Home from "../components/SearchBar";
import Weather from "../components/Weather";
import DataContext from "../data/DataContext";
import HealthInfo from '../components/HealthInfo'
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import mydoctor from '../../src/img/mydoctor.png'
import { FcPuzzle, FcApproval,FcBiomass, FcPlus } from "react-icons/fc";
import { IconContext } from "react-icons";
import medical3 from '../img/medical3.png';
import {motion} from 'framer-motion'
const Home = () => {
    const data = useContext(DataContext);
    const [name, setName] = useState();
    const user = localStorage.getItem("currentUser")
    console.log("user", data.action)
    useEffect(()=>{
        if(user){
            data.action.setIsLoginned(true)
            getSingleData();
        } else {
            data.action.setIsLoginned(false)
        }
    },[user]);
        const docRef = doc(db, "infant", user);
        const ischeckInfant = async () => {
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

    
    const navigate = useNavigate();
    const navQustion = ()=>{
        navigate('/question');
    }
    
    let date = new Date();
    let days = ["일", "월", "화", "수", "목", "금", "토"];

    const getSingleData = async () => {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
      }
    }

    return ( 
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4, duration:0.4}}
        >
        <Container className="Home" style={{position: "relative", maxWidth : "420px", height : "100vh" , overflow:'hidden' /* 01/09 overflow 추가 - home */ }}>
                    <Row className="Search_box" style={{marginBottom : "1em", marginToxp : "2em", display : "flex"}}>
                        <Col xs={1}> 
                            <img style={{width : "33px", marginTop : "17px"}} src={mydoctor} alt="image"/>
                        </Col>
                        <Col xs={11}>
                            <SearchBar_Home/>
                        </Col>
                    </Row>
                    <div style={{height : "120px", zIndex : "999", display : "relative", marginTop :"10px", fontSize : "22px", borderRadius : "10px", position : "relative", backgroundColor : "#eee", padding : "0px"}}>                        
                       <Row style={{marginLeft : "0px", borderRadius : "10px"}}>
                            <Col xs={7}>
                            {
                            /* ------- */
                            // p태그 안의 p태그 , p태그안의 div태그 수정 01/09 15:18 
                            }
                            <div style={{ fontSize : "20px", marginTop : "30px", marginLeft : "20px"}}>
                            <b>{name} </b> 님, <br/>
                            <p style={{fontSize : "18px"}}>건강한 하루 되세요! </p> </div>
                            {
                            /* -------- */
                            }
                            </Col>
                            <Col xs={3}>
                            {/* <img src={medical} width= "100px" height="110px" alt="" /> */}
                            <img style={{zIndex :"2000", rotate : "0deg", marginTop : "10px", marginLeft : "-10px"}} src={medical3} width= "100px" height="110px" alt="" />
                            </Col>
                            <Col xs={2}>
                            {/* <img style={{rotate : "0deg", marginTop : "20px", marginLeft : "-60px"}} src={medical2} width= "80px" height="100px" alt="" /> */}
                            </Col>
                        </Row>
                    </div>
                    <Row style={{display : "flex", marginLeft : "3px", marginTop : "20px"}}>
                        <div onClick={() => (navigate('/main'))} style={{display : "relative",backgroundColor : "#eee", borderRadius : "10px", width : "80px", height : "70px", margin : "5px 5px 5px 5px"}}>
                        <IconContext.Provider value={{ size : "2em" }}>
                            <div style={{margin : "0.5em 0 0 0.7em"}}><FcPuzzle/></div>
                        </IconContext.Provider>
                            <p style={{ fontSize :"13px", marginLeft : "3px"}}>건강내역</p>    
                        </div>
                        
                        <div onClick={() => (navigate('/medicine'))} style={{display : "relative",backgroundColor : "#eee", borderRadius : "10px", width : "80px", height : "70px", margin : "5px 5px 5px 5px"}}>
                        <IconContext.Provider value={{ size : "2em" }}>
                            <div style={{margin : "0.5em 0 0 0.7em"}}><FcBiomass/></div>
                        </IconContext.Provider>
                            <p style={{ fontSize :"13px", marginLeft : "3px"}}>복약관리 </p>    

                        </div>
                        
                        <div onClick={() => (navigate('/history'))} style={{display : "relative",backgroundColor : "#eee", borderRadius : "10px", width : "80px", height : "70px", margin : "5px 5px 5px 5px"}}>
                            <IconContext.Provider value={{ size : "2em" }}>
                            <div style={{margin : "0.5em 0 0 0.7em"}}><FcApproval/></div>
                        </IconContext.Provider>
                            <p style={{ fontSize :"13px", marginLeft : "3px"}}>예약내역 </p>    
                        </div>
                        
                        <a href="https://health.kdca.go.kr/healthinfo/index.jsp" style={{display : "relative",backgroundColor : "#eee", borderRadius : "10px", width : "80px", height : "70px", margin : "5px 5px 5px 5px"}}>
                            <IconContext.Provider value={{ size : "2em" }}>
                            <div style={{margin : "0.5em 0 0 0.7em"}}><FcPlus/></div>
                        </IconContext.Provider>
                            <p style={{ fontSize :"13px", marginLeft : "3px", color : "black"}}>건강정보 </p>    
                        </a>
                    </Row>
                    <hr/>
                    <Row className="Temperature">
                        <h6 style={{marginLeft : "0.5em", fontSize : "1.3em", marginTop : "0px", fontSize : "17px"}}>
                            오늘 날씨
                        </h6>
                        <Weather/>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={4} >
                        <h6 style={{marginLeft : "0.5em", fontSize : "1.3em",  fontSize : "17px"}}> 건강 정보</h6>
                        </Col>
                        <Col xs={4} style={{padding : "0", marginLeft : "-40px"}}>
                           <p style={{marginLeft :"-50px", display : "inline-block", marginLeft : "1em", borderRadius : "10px", padding : "4px 8px", fontSize : "0.6em", 
                        backgroundColor : "#1b4542", color : "white"}}>{date.getFullYear()}. {date.getMonth()+1}. {date.getDate()}</p>
                        </Col>
                        <Col xs={4}></Col>
                        <HealthInfo/>
                    </Row>
                        <button 
                        style={{width : "100%",  marginRight: "12px", 
                                display : "inline-block", color : "black", backgroundColor : "#1b4542", color : "white",
                                borderRadius : "10px", padding: "10px 0"}}
                        onClick={() => (navigate('/filter'))}>
                        <p style={{textAlign : "center", fontSize : "15px"}}>  병원 찾기</p> </button>
        </Container>
        </motion.div>
    );
}
export default Home;