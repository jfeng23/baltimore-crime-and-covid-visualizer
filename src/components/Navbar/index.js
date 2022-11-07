import React from "react";
import { Nav, NavLink, NavMenu, NavHeader } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <NavHeader>Group 3 Project, Fall 2022</NavHeader>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/maps" activeStyle>
            Maps
          </NavLink>
          <NavLink to="/charts" activeStyle>
            Charts
          </NavLink>
          <NavLink to="/data" activeStyle>
            Data
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;