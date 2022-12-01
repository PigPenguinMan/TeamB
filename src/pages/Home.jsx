import Weather from '../components/Weather';
import HealthInfo from '../components/HealthInfo';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate();

    return ( 
        <div className="Home"> 
            <br />
            <button onClick={()=>{navigate('/login')}}>로그인</button>

            <div className="Search_box">검색창 </div>
            <br/>

            <div>
            <HealthInfo />
            </div>
            
            <div className="Temperature">기온 날씨
            <Weather />
            </div>
            <br/>

            <div className="Questionnaire">문진표 작성버튼</div>    
            <br/>
            <div className="Reserve">예약 버튼</div>    
            <br/>
            <div className="Search_near">주변 병원 찾기 </div>    
        </div>
    );
}

export default Home;