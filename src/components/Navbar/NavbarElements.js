import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const NavHeader = styled.div`
background: #0D99ED;
text-align: left;
padding-left: 20px;
background-color: #666699;
color: white;
font-family: Verdana;
font-size: 1em;
padding: 10px;
`

export const Nav = styled.nav`
background: #7575a3;
height: 85px;
display: flex;
justify-content: space-between;
`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 3rem;
height: 100%;
cursor: pointer;
font-family: Verdana;
font-size: 2em;
`;

export const NavMenu = styled.div`
display: flex;
width: 100vw;
@media screen and (max-width: 768px) {
	display: none;
}
`;
