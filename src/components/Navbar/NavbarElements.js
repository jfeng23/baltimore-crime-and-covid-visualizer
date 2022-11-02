import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const NavHeader = styled.div`
background: #0D99ED;
height: 50px;
text-align: center;
border: 3px solid #0909FF;
border-radius: 10px;
margin: 10px;
color: white;
font-family: Comic Sans MS;
font-size: 2em;
`

export const Nav = styled.nav`
background: #8989FF;
height: 85px;
display: flex;
justify-content: space-between;
z-index: 12;
border-radius: 10px;
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
