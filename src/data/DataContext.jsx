// 전역 Context 사용, value값도 이 파일에서 지정 후 내보내기
import { createContext, useState } from "react";


const DataContext = createContext();

// DataProvider를 여기서 작성 후 value값을 이미 가진 컴포넌트 내보내기
const DataProvider = ( {children} )=> {

    // 전체 유저 데이터
    //로그인 후 계속 사용될 유저정보 
    // >> id/name/age/gender/questionnaire{}/medicine{}/
    const [user, setUser] = useState( [
        {
            id : 1,
            userId : "seo",
            userPw: "123",
            username : "서",
            age : 20,
            gender : "F",
            questionnaire : {
                weight:50,
                height:160,
            },
            medicine : {
                cough:true,
                fever:false,
            },
        },
        {
            id : 2,
            userId : "lee",
            userPw: "456",
            username : "리",
            age : 25,
            gender : "M",
            questionnaire :{
                weight:60,
                height:180,
            },
            medicine : {
                cough:true,
                fever:false,
            }
        },
        {
            id : 3,
            userId : "kim",
            userPw: "789",
            username : "김",
            age : 25,
            gender : "M",
            questionnaire :{
                weight:60,
                height:180,
            },
            medicine : {
                cough:true,
                fever:false,
            }
        },
    ] );


    // 로그인한 유저의 상태 state
    const [loginUser, setLoginUser] = useState(
    {
        id : 1,
        userId : "seo",
        userPw: "123",
        username : "서",
        age : 20,
        gender : "F",
        questionnaire : {
            weight:50,
            height:160,
        },
        medicine : {
            cough:true,
            fever:false,
        },
    }
    );
    
    // 사용할 value값들을 state(초기값)과 action(변경값) 분리해서 넣기
    const value = 
        {
            state: {user, loginUser},
            action: {setUser, setLoginUser}
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
const { Consumer : DataConsumer } = DataContext;

// // 컴포넌트로 사용하기 위해 export > .Provider대신 사용할 컴포넌트임
// // 원래 Provider는 App 전체를 감싸서 사용했음
export { DataProvider, DataConsumer }

// 값을 사용하기 위해 가져오는 컨텍스트를 export
export default DataContext;