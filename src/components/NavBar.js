import React from 'react'
import Navs  from './Nav'
import UserDisplay from './UserDisplay'
import { connect } from 'react-redux'


function NavBar () {
  return(
    <div className='border-bottom-4 border-success'>
      <Navs />
    </div>
  )
}
 export default NavBar
