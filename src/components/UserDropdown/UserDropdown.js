import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import Avatar from '../Avatar'
import Typography from '../Typography'

export const UserDropdown = (props) => {
  const {
    className,
    userDisplayName,
    userEmail,
    userAvatar,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div className={classes.textWrapper}>
        <Typography
          variant={'body1'}
          className={classes.userDisplayName}
        >
          {userDisplayName || '- -'}
        </Typography>
        <Typography
          variant={'caption'}
          className={classes.userEmail}
        >
          {userEmail}
        </Typography>
      </div>
      <div className={classes.avatarWrapper}>
        <Avatar
          src={userAvatar}
        />
      </div>
    </div>
  )
}

UserDropdown.propTypes = {
  className: PropTypes.string,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  userAvatar: PropTypes.string
}

export default UserDropdown
