/** 복약관리 페이지입니다 (서아)
*로그인한 유저 > 직접 약 이름과 투여량, 횟수를 입력받아 출력하는 페이지
*상태관리 리덕스(medicine.js)/firebase db에는 저장 안 함
*/
import { useContext, useEffect, useState } from "react";
import { FloatingLabel, Form, Card, ListGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMedicine, toggleCheck } from "../modules/medicine";
import DataContext from "../data/DataContext";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
// 뒤로가기 버튼 & 복약확인
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../css/Medicine.css";

const Medicine = () => {
    const data = useContext(DataContext);
    const user = localStorage.getItem("currentUser");
    const [name, setName] = useState();
    const [pillsName, setPillsName] = useState("");
    const [pillsCount, setpillsCount] = useState(0);
    const [pillsDose, setPillsDose] = useState(0);
    // 추가 01/04 희성
    const [isChecked, setIsChecked] = useState(false);
    // +리덕스로 medicine.js 값 가져와서 map으로 출력
    const medicine = useSelector((state) => (state.medicine));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 복약확인 (check) 토글 관리 state
    // isChecked -> allCheck로 수정 01/04 희성
    const [allChecked, setAllChecked] = useState();
    // 복약정보 입력 모달창 관리 state
    const [modalOpen, setModalOpen] = useState();
    // 날짜 출력을 위한 date객체
    const date = new Date();


    // 복약정보 입력하기 버튼에 연결된 함수
    function openMedModal() {
        return (
            setModalOpen(!modalOpen)
        )
    }

    // firestore db에서 로그인된 유저 정보를 들고온다
    const getSingleData = async () => {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().name);
        }
    }
    useEffect(() => {
        if (user) {
            data.action.setIsLoginned(true)
            getSingleData();
        } else {
            data.action.setIsLoginned(false)
        }
    }, [user]);

    let checkFilter = medicine.filter(check => check.isChecked == true)
    useEffect(()=>{
        if (medicine.length == checkFilter.length){
            setAllChecked(true)
        }else{
            setAllChecked(false)
        }
    },[checkFilter])
    
    
    // 복약확인 체크 > 날짜 변경 때마다 false로 초기화
    useEffect(() => {
        setAllChecked(false);
    }, [date.getDate()])
    const checkedBtn = (a)=>{
        dispatch(toggleCheck(a))
    }
    
    return (
        <>
            <span className="goback" onClick={() => { navigate("/mypage") }}><FontAwesomeIcon icon={faArrowLeft} /></span>
            <div className="med-form">
                <h3>복약 관리</h3>
                <p>버튼을 클릭하여 복약정보를 등록하고 관리하세요!</p>
                <br />
                <div className="alarm">
                    {/* setIsChecked -> setAllChecked로 수정  */}
                    <h6 className="confirm"> 오늘의 복약 완료 기록 :
                        {
                            // siChecked -> allChecked로 수정
                            allChecked ? <span style={{ fontSize: "2em" }}>　👌</span>
                                : <p>오늘 약 복용을 잊지 마세요</p>
                        }
                    </h6>
                </div>
            </div>
            <button className="addMed-btn med-form" onClick={openMedModal}>복약정보 추가</button>
            {modalOpen ? (
                <MedicineModal
                    name={name} pillsCount={pillsCount} setpillsCount={setpillsCount}
                    pillsDose={pillsDose} setPillsDose={setPillsDose}
                    pillsName={pillsName} setPillsName={setPillsName}
                    modalOpen={modalOpen} setModalOpen={setModalOpen}
                    // isChecked 추가 
                    isChecked={isChecked} />
            ) : (null)
            }
            <br />
            <div className="med-form">
            <div>
                <b className="date">
                {date.getMonth() + 1}월 {date.getDate()}일 {" "}복약 정보
                </b>
                
            </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th><p>no.</p></th>
                            <th><p>이름</p></th>
                            <th><p>투여량/횟수</p></th>
                            <th><p style={{ color: "#1b4542" }}>복약확인</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicine.map((med) => (    
                            <tr key={med.pillId}>
                                <td>{med.pillId}</td>
                                <td>{med.pillsName}</td>
                                <td>{med.pillsCount}{" "}/{" "}{med.pillsDose}</td>
                                <td onClick={() => {checkedBtn(med.pillId)}}>
                                    {
                                        // isChecked -> med.isChecked로 수정
                                        med.isChecked
                                            ? 　<FontAwesomeIcon icon={faCheck} />
                                            : null
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Medicine;




// 복약 정보 등록전, 약 이름, 투여 수량과 횟수를 입력받는 모달창입니다
// 부모 컴포넌트로(Medicine)으로부터 props로 값을 넘겨받아 사용
const MedicineModal = (props) => {
    const { name, pillsName, setPillsName, pillsCount, setpillsCount, pillsDose, setPillsDose, isChecked } = props;
    const { modalOpen, setModalOpen } = props;
    //리덕스에서 값 가져오기 위함
    const dispatch = useDispatch();

    return (
        <div>
            <div className="mx-5 mt-2">
                <div>
                    <FloatingLabel controlId="floatingInput"
                        label="복용하는 약의 이름" className="mb-3">
                        <Form.Control type="text"
                            style={{ border: "none", borderBottom: "1px solid lightgray" }}
                            onChange={(e) => { setPillsName(e.target.value) }} />
                    </FloatingLabel>
                    투여량: <input className="med-input" type="number" min='10' max='30' onChange={(e) => { setpillsCount(e.target.value) }} />
                    횟수: <input className="med-input" type="number" min='10' max='30' onChange={(e) => { setPillsDose(e.target.value) }} />
                </div>
                <br />
                <button className="addMed-btn"
                    onClick={
                        pillsName == ""
                            ? null
                            : (
                                () => {
                                    dispatch(addMedicine(
                                        { pillsName: pillsName, pillsCount: pillsCount, pillsDose: pillsDose, isChecked: isChecked }
                                    )); setModalOpen(!modalOpen); alert("등록 완료");
                                    setPillsName(""); setpillsCount(0); setPillsDose(0);
                                }
                            )
                    }>등록하기</button>
            </div>
        </div>
    )
}
