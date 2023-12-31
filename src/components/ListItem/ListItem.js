import React from 'react'
import PropTypes from 'prop-types'

import LogOutIcon from './LogOutIcon'
import ProfileIcon from './ProfileIcon'

import classes from './styles.module.css'
import Typography from '../Typography'

export const ListItem = (props) => {
  const {
    className,
    disabled = false,
    text,
    icon,
    ...otherProps
  } = props

  return (
    <li
      className={`${classes.root}${className ? ` ${className}` : ''}${disabled ? ` ${classes.disabled}` : ''}`}
      {...otherProps}
    >
      <div className={classes.iconWrapper}>
        {icon === 'log-out' ? <LogOutIcon/> : icon === 'profile' ? <ProfileIcon/> : null}
      </div>
      <div className={classes.textWrapper}>
        <Typography variant={'body2'}>
          {text}
        </Typography>
      </div>

    </li>
  )
}

ListItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.oneOf(['log-out', 'profile']),
  disabled: PropTypes.bool
}

export default ListItem
