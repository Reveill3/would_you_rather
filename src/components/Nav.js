import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserDisplay from './UserDisplay'

export default function Navs () {
  return(
    <div className='row'>
      <Nav tabs className='col-10'>
        <NavItem>
          <NavLink tag={Link} to="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/add">New Question</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/leaders">Leaderboard</NavLink>
        </NavItem>
      </Nav>
      <UserDisplay className='col-2'/>
    </div>
  )
}
