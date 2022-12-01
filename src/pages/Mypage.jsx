import { useContext } from "react";
import DataContext from "../data/DataContext";

const Mypage = () => {

    const data = useContext(DataContext);

    return ( 
        <div>
            <h1>mypage</h1>
            <div>
                {/* 현재 로그인 된 state값을 가져온다 */}
                <p> 로그인한 유저 이름: {data.state.loginUser.username} </p>
                <p> 로그인한 유저의 기본 정보: {data.state.loginUser.userId} </p>
            </div>
        </div>
    );
}

export default Mypage;