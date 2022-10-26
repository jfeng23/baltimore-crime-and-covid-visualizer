import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #F9991D;
height: 85px;
display: flex;
justify-content: space-between;
z-index: 12;
<<<<<<< Updated upstream
border-radius: 15px;
=======
border: 3px solid #0909FF;
border-radius: 10px;
>>>>>>> Stashed changes
margin: 10px;
`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 3rem;
height: 100%;
cursor: pointer;
font-family: Comic Sans MS;
font-size: 2em;
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
margin-right: 24px;
/* Third Nav */
width: 100vw;
white-space: nowrap;
@media screen and (max-width: 768px) {
	display: none;
}
`;
