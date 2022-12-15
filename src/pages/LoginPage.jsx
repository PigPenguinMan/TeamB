/** LoginPage에 들어갈 정보
 */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../data/DataContext";

const LoginPage = () => {
  const [InputId, setInputId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const data = useContext(DataContext);

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleId = (e) => {
    setInputId(e.target.value);
  };
  const handlePw = (e) => {
    setPassword(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    // 내장함수 인덱스순서로 훑어 조건에 맞는 객체를 찾으면 return함
    for (let i = 0; i < data.state.user.length; i++) {
      console.log("등록된 유저 수: "+data.state.user.length);
      if (
        data.state.user[i].userId === InputId &&
        data.state.user[i].userPw === password
      ) {
        data.action.setLoginUser(data.state.user[i]);
        return alert("로그인 성공"),navigate("/mypage");
      }
    }
    return alert("등록된 정보가 없습니다. 회원가입해주세요."),navigate("/signup");
  };
  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {}, []);

  return (
    <div>
      <h1>로그인</h1>
      <div>
        <label>id : </label>
        <input
          type="text"
          name="input_id"
          value={InputId}
          onChange={handleId}
        />
      </div>
      <div>
        <label>password : </label>
        <input
          type="password"
          name="input_pw"
          value={password}
          onChange={handlePw}
        />
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
