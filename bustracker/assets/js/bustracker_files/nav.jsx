import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Button } from 'reactstrap';

export default function Nav(props) {
  
  function logout(){
    sessionStorage.clear();
    window.location.reload();
  }  

  return (
    <nav className="navbar navbar-expand navcustom">
      <span className="navbar-brand">
        BusTracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Track</NavLink>
        </NavItem>
      </ul>
      <span className="navbar-text">
        {props.token.user_name}
      </span>
      <div className="btn btn-primary">
         <Button onClick={logout} className="btnleft">Log Out</Button>
      </div>
    </nav>
  );
}