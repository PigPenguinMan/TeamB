import { useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../Firebase";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../data/DataContext";
import DatePicker from "react-datepicker";
import styles from '../css/mypage.module.css'
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import "../css/Mypage.css";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import {motion} from 'framer-motion'


const MyPage = () => {
  const data = useContext(DataContext);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email,setEmail] = useState();

  const user = localStorage.getItem("currentUser")
  const getSingleData = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
    }
  }
  const logOut = () => {
    localStorage.clear();
    navigate('/mypage')
  }
  useEffect(() => {
    if (user) {
      data.action.setIsLoginned(true)
      getSingleData();
    } else {
      data.action.setIsLoginned(false)
    }
  }, [user])
  
  const [show,setShow] = useState(false);
  
  return (
<motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}

        transition={{delay:0.4, duration:0.4}}
        >
    <div className="Mypage">
      {data.state.isLoginned ? (
        <>
          <div className="Mypage_first">
            <ul>
              <li>
                <div  className="userimg_box">
                { data.state.userpro ? 
                  <div
                  onClick={()=>{setShow(true)}}
                  style={{
                      width:"150px", 
                      height :"150px", 
                      backgroundImage: `url(${data.state.userpro}) `,
                      backgroundPosition:"center",
                      backgroundRepeat:"no-repeat",
                      backgroundSize:"130px",
                      borderRadius:"50%",
                      border: "1px solid #ccc"
                              
                    }}></div>
                  : 
                  <img className="userimg" style={{borderRadius:"50%"}}  onClick={()=>{setShow(true)}} src={`${process.env.PUBLIC_URL}/images/user.png`} alt="유저이미지" />
}     
                </div>
              </li>
              <li>
                <b className="mypage_name">{name}</b>
              </li>
              <li>
                <p className="mypage_email">{email}</p>
              </li>
                </ul>
                <ul className="mypage_desc_box">
                  <li className="mypage_desc">
                      <a style={{fontSize:"24px"}} href="#">0</a>
                      <a href="#" >예약내역</a>
                    </li>
                    <li className="mypage_desc">
                      <a style={{fontSize:"24px"}} href="#">0</a>
                      <a href="#">좋아요</a>
                    </li>
                    <li className="mypage_desc">
                      <a style={{fontSize:"24px"}} href="#">0</a>
                      <a href="#">리뷰</a>
                    </li>
                </ul>
                <div style={{display:"flex",justifyContent: "center"}}>
                  <button className="Btn_L_G_2" onClick={() => { logOut() }}>로그아웃</button>
                </div>
                
          </div>
          <hr />
          <Container>
            <Row>
              <Col><h6>건강피드</h6></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><button onClick={()=>{navigate('/main')}}>건강피드</button></Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <Row>
              <Col><h6>복약관리</h6></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><button onClick={()=>{navigate('/medicine')}}>복약관리</button></Col>
            </Row>
          </Container>
          <hr />
          <div className="Mypage_forth"></div>
          {/* 이부분은 버튼만있고 따로 기능없습니다 */}
          <Container>
            <Row>
              <Col><h6>고객센터</h6></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><p>1:1채팅 상담</p></Col>
              <Col className="Btn_L_G"><p>사용자 설문</p></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><p>약관 보기</p></Col>
              <Col className="Btn_L_G"><p>버전</p></Col>
            </Row>
          </Container>
          {show && <ProfileUpdateModal setShow={setShow}/>}
        </>
      ) : (
        <>
          <div className="Mypage_first">
            {/* 프로필,이름 */}
            <Container>
            <Row>
              <Col className="Btn_L_G" style={{marginTop:"20px"}}><button  onClick={()=>{navigate('/firebaselogin')}}>로그인</button></Col>
            </Row>
          </Container>
          </div>
          <hr />
          <Container>
            <Row>
              <Col><h6>건강피드</h6></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><button onClick={()=>{navigate('/main')}}>건강피드</button></Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <Row>
              <Col><h6>복약관리</h6></Col>
            </Row>
            <Row>
              <Col className="Btn_L_G"><button onClick={()=>{navigate('/medicine')}}>복약관리</button></Col>
            </Row>
          </Container>
          <hr />
          <div className="Mypage_forth">
            {/* 이부분은 버튼만있고 따로 기능없습니다 */}
            <Container>
              <span> 고객센터 </span>
              <br />
              <Row>
                <Col className="Btn_L_G"><p>1:1채팅 상담</p></Col>
                <Col className="Btn_L_G"><p>사용자 설문</p></Col>
              </Row>
              <Row>
                <Col className="Btn_L_G"><p>약관 보기</p></Col>
                <Col className="Btn_L_G"><p>버전</p></Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </div>
    </motion.div>
  );

}


export default MyPage;



