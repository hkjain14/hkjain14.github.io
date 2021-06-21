import React, { Component } from "react";

//Stateless functional component returning react element. (sfc TAB shortcut)
//React will pass props parameter at runtime
const NavBar = props => {
  console.log("Navbar rendered");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        No. of non zero items ={" "}
        <span className="badge badge-pill badge-secondary">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
