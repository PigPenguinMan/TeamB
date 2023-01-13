import { NavLink, useNavigate } from "react-router-dom";
import "../css/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faList, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

const NavbarComp = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([false, true, false]);

    return (
        <div className="footer">
        <Container>
        <Row className="menu" style={{backgroundColor : "#1b4542", padding : "1em"}}>
            <Col>
            <button className={menu[0] ? "menu-active" : null} onClick={()=>{navigate('/history'); setMenu([true, false, false])}} >
                 <p>

                 <FontAwesomeIcon 
                className="menuicon" 
                icon={faList} 
                style={{color : "#fff", width : "0.8em"}} size="2x" value=""/>
                </p>
            </button>
            </Col>
            <Col>
            <button className={menu[1] ? "menu-active" : null} onClick={()=>{navigate('/home');  setMenu([false, true, false])}}>
                <FontAwesomeIcon className="menuicon" 
                     icon={faHouse} 
                     style={{color : "#fff", width : "0.8em"}} size="2x"  value=""/> 
            </button>
            </Col>
            <Col>
            <button className={menu[2] ? "menu-active" : null} onClick={()=>{navigate('/mypage');  setMenu([false, false, true])}}>
                <FontAwesomeIcon className="menuicon" 
                    icon={faUser} style={{color : "#fff", width : "0.7em"}}
                    size="2x"  value=""/>
            </button>
            </Col>
        </Row>
        </Container>
        </div>
    );
}

export default NavbarComp;