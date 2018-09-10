import React from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap';

export default function Navs () {
  return(
    <div>
      <Nav tabs className='border-bottom-4 border-success'>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">New Question</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Leaderboard</NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}
