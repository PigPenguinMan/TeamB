import { Context } from "../App";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import PlaceDetailInfo from "./PlaceDetailInfo";



const Reservation = () => {
    const {category,hospitalData} = useContext(Context);
    
    const {bookid} = useParams();
    
    const location = useLocation();
    

    const [startDate, setStartDate] = useState(new Date());
    const [login,setLogin] = useState(false);

    let navigate = useNavigate();
    


    

    const ReservationBtn =() => { 
        if (login) {
            alert('예약이 완료되었습니다');
            alert('마이페이지에서 확인해주세요');
            navigate('/');
        } else {
            alert('로그인이 필요합니다'); 
            // navigate('로그인 화면주소')
        }
    }  

    return ( 
        <div>    
            <div>   
                <h2>예약하기</h2>

                <h4>병원이름 :{location.state.사업장}</h4>
                <h5>병원주소 :{location.state.주소}</h5>

                <div>
                <h4>예약하실 날짜를 선택해주세요</h4>
                <DatePicker 
    	selected={startDate} 
	    onChange={(date) => setStartDate(date)}
        locale={ko}                   // 한글로 변경
        dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
        showPopperArrow={false}       // 화살표 변경
        minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
            />
            
                </div>       

                <button onClick={ReservationBtn}>예약</button>
            </div>
            


        </div>
    ); 
}

export default Reservation; 