import React from 'react'
import PropTypes from 'prop-types'

import defaultAvatarSrc from './default.svg'

import classes from './styles.module.css'

export const Avatar = (props) => {
  const {
    className,
    src,
    ...otherProps
  } = props

  return (
    <img
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      alt={'avatar'}
      src={src || defaultAvatarSrc}
      {...otherProps}
    >
    </img>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired
}

export default Avatar
