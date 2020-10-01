import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'
export const Nav = () => {
  return (
    <div class='nav'>
      <div class='nav__profil'>
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
