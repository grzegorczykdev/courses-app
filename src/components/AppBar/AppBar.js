import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const AppBar = (props) => {
  const {
    className,
    children,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      {children}
    </div>
  )
}

AppBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default AppBar
