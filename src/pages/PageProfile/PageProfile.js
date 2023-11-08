import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../../components/Logo'

import MainLayout from '../../components/MainLayout/MainLayout'

// import { useAuthUser } from '../../contexts/UserContext'

import classes from './styles.module.css'

export const PageProfile = (props) => {
  const {
    className,
    ...otherProps
  } = props

  // const {
  //   userDisplayName,
  //   userEmail,
  //   userAvatar
  // } = useAuthUser()

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <MainLayout
        contentAppBar={
          <>
            <Logo className={classes.logo}/>
          </>
                  }

        contentMain={
          'ProfilePage'
                  }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string
}

export default PageProfile
