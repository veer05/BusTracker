import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav(props) {
  return (
    <nav className="navbar navbar-dark bg-secondary navbar-expand">
      <span className="navbar-brand">
        BusTracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Track</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">Search History</NavLink>
        </NavItem>
      </ul>
      <span className="navbar-text">
        {props.token.user_name}
      </span>
    </nav>
  );
}