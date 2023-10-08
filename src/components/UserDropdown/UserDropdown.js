import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import Placeholder from './Placeholder'
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
        <Typography>
          {userDisplayName || '- -'}
        </Typography>
        <Typography>
          {userEmail}
        </Typography>
      </div>
      <div className={classes.avatarWrapper}>
        <Placeholder/>
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
