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
    const btn_0 = () => {
        setMenu([true, false, false])
    }
    const btn_1 = () => {
        setMenu([false, true, false])
    }
    const btn_2 = () => {
        setMenu([false, false, true])
    }


    return (
        <div className="footer">
            <Container>
                <Row className="menu" style={{ backgroundColor: "#1b4542", padding: "1em" }}>
                    <Col>
                        <NavLink to='/history' className={({isActive}) => isActive ? 'menu-active' : null}>
                            <FontAwesomeIcon
                                className="menuicon"
                                icon={faList}
                                style={{ color: "#fff", width: "0.8em" }}
                                size="2x" value="" />
                        </NavLink>
                    </Col>
                    <Col>
                        <NavLink to="/home" className={({isActive}) => isActive ? 'menu-active' : null}>
                            <FontAwesomeIcon
                                className="menuicon"
                                icon={faHouse}
                                style={{ color: "#fff", width: "0.8em" }}
                                size="2x" value="" />
                        </NavLink>
                    </Col>
                    <Col>
                        <NavLink to="/mypage" className={({isActive}) => isActive ? 'menu-active' : null} >
                            <FontAwesomeIcon
                                className="menuicon"
                                icon={faUser}
                                style={{ color: "#fff", width: "0.7em" }}
                                size="2x" value="" />
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    );


}
export default NavbarComp; 