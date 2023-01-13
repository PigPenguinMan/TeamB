// 전역 Context 사용, value값도 이 파일에서 지정 후 내보내기
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Hospital from '../json/Hospital.json'
const DataContext = createContext();

// DataProvider를 여기서 작성 후 value값을 이미 가진 컴포넌트 내보내기
const DataProvider = ({ children }) => {
    
    //창욱
    const [mesureToggle,setMesureToggle]= useState(true);
    // 마이페이지 예약 내역 숫자

    const [h_name,setH_name] = useState("");
    const [h_num,setH_num] = useState("");
    const [h_address,setH_address] = useState("");
    const [h_major,setH_major] = useState("");

    const [infant, setInfant] = useState({ name: "홍길동", age: "2021-01-24", gender: "남" })
    const [measures, setMesures] = useState({
        height: 0,
        weight: 0, temperature: 0, medicine: ""
    })
    
    //로그인 확인
    const [isLoginned, setIsLoginned] = useState(false)
    const [ismeasures, setIsMeasures] = useState(false)
    const [login, setLogin] = useState(false)
    const [hcheck, setHcheck] = useState(0); 
    const [icheck, setIcheck] = useState(0);
    const age = String(infant.age)
    const date1 = new Date(infant.age);
    const date2 = new Date();
    const diffDate = date1.getTime() - date2.getTime();
    const date = Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
    const month = Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24 * 30)));
    
    // 종헌 
    const [category, setCategory] = useState();
    const [hospitalData, setHospitalData] = useState(Hospital);
    const [mypageData,setMypageData] = useState(); 
    const [mypageData2,setMypageData2] =useState();
    const [startDate, setStartDate] = useState(new Date());
    const location = useLocation(); 
    const [isbook, setIsbook] = useState(false); 
    const [userpro, setUserpro] = useState();

    // 지현
    // 리뷰작성
    const [comments, setComments] = useState([
        {
            Id: 1,
            name: "user",
            countStar: 3,
            btn1: "효과좋아요",
            btn2: "친절해요",
            btn3: "신규장비에요",
            review: "방문 후기를 20글자 이내로 작성해주세요",
            yesNo: "재방문할래요",
        },
         {
            Id: 2,
            name: "user",
            countStar: 1,
            btn1: "보통이에요",
            btn2: "친절해요",
            btn3: "노후되었어요",
            review: "선생님이 친절하셨어요",
            yesNo: "재방문할래요",
        },
        {
            Id: 3,
            name: "user",
            countStar: 5,
            btn1: "효과좋아요",
            btn2: "친절해요",
            btn3: "노후되었어요",
            review: "꼼꼼하게 진단해주셨어요",
            yesNo: "",
        }
    ]);

    const [treatmentDetail, setTreatmentDetail] = useState(); 

    // 사용할 value값들을 state(초기값)과 action(변경값) 분리해서 넣기
    const value =
    { 


        state: {mesureToggle,userpro,treatmentDetail, isbook,mypageData2,mypageData,location,startDate,h_major, h_name, h_num, h_address, comments,infant, login, hcheck, icheck, date, month, age, measures, ismeasures,category,hospitalData, isLoginned },


        
        action: {setMesureToggle,setUserpro,setTreatmentDetail, setIsbook,setMypageData2,setMypageData,setStartDate,setH_major,setH_name, setH_num,setH_address,setInfant, setLogin, setHcheck, setIcheck, setMesures, setIsMeasures ,setCategory,setHospitalData, setIsLoginned,setComments}


    };

    // DataProvider를 사용할 때, DataContext.Provider를 불러 사용하게끔
    // 이때, {children}은 Provider데이터를 공용으로 쓰는 컴포넌트들
    return ( 
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};


// // consumer 작성
// // DataContext 의 값을 가져와, DataConsumer로 사용하겠다
const { Consumer: DataConsumer } = DataContext;

// // 컴포넌트로 사용하기 위해 export > .Provider대신 사용할 컴포넌트임
// // 원래 Provider는 App 전체를 감싸서 사용했음
export { DataProvider, DataConsumer }

// 값을 사용하기 위해 가져오는 컨텍스트를 export
export default DataContext;