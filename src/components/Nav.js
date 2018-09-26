import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserDisplay from './UserDisplay'

export default function Navs () {
  return(
    <div className='row w-100'>
      <Nav  className='col-8' tabs >
        <NavItem>
          <NavLink className='d-inline-block' tag={Link} to="/home">Home</NavLink>
        </NavItem>
        <NavItem className='d-inline-block'>
          <NavLink tag={Link} to="/add">New Question</NavLink>
        </NavItem>
        <NavItem className='d-inline-block'>
          <NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
        </NavItem>
        <UserDisplay/>
      </Nav>

    </div>
  )
}
