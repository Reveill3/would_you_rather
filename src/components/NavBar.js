import React from 'react'
import Navs  from './Nav'
import UserDisplay from './UserDisplay'
import { connect } from 'react-redux'


function NavBar () {
  return(
    <div>
      <Navs/>
      <UserDisplay/>
    </div>
  )
}
 export default NavBar
