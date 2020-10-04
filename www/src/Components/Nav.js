import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'
export const Nav = () => {
  return (
    <div className='nav'>
      <div className='nav__profil'>
        <Avatar infos={{ pseudo: 'Gabriel' }} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
