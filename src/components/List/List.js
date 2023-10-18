import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const List = (props) => {
  const {
    className,
    ...otherProps
  } = props

  return (
    <ul
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >

    </ul>
  )
}

List.propTypes = {
  className: PropTypes.string
}

export default List
