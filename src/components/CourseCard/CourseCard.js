import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const CourseCard = (props) => {
  const {
    className,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >

    </div>
  )
}

CourseCard.propTypes = {
  className: PropTypes.string
}

export default CourseCard
