import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import Avatar from '../Avatar'
import Typography from '../Typography'

export const UserDropdown = (props) => {
  const {
    contentList,
    className,
    onOpenRequested,
    onCloseRequested,
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
      <div
        className={classes.wrapper}
        onClick={onOpenRequested}
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
      {
        contentList ?
          <>
            <div
              className={classes.overlay}
              onClick={onCloseRequested}
            >
            </div>
            <div className={classes.listContainer}>
              {contentList}
            </div>
          </>
          : null
        }
      {/* <div className={classes.overlay}></div> */}
    </div>
  )
}

UserDropdown.propTypes = {
  contentList: PropTypes.node,
  className: PropTypes.string,
  onOpenRequested: PropTypes.func,
  onCloseRequested: PropTypes.func,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  userAvatar: PropTypes.string
}

export default UserDropdown
