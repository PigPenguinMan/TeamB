import { useNavigate } from "react-router-dom";
/**
 * SPA구현을 위해, 새로고침되는 Link태그 대신
 *  router의 기능인 useNavigate로 모든 페이지, 컴포넌트 간 이동해야 함
 *  로그인한 유저 데이터 유지를 위함!
 */

const NavbarComp = () => {

    const navigate = useNavigate();
    return (
        <div className="nav" style={{border:'2px solid black'}}>
        <span onClick={()=>{navigate('/home')}}>홈 | </span>　
        <span onClick={()=>{navigate('/history')}}>진료내역 | </span>　
        <span onClick={()=>{navigate('/mypage')}}>마이페이지 </span>　
        </div>
    );
}

export default NavbarComp;