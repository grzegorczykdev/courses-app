import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import CourseCard, {CoursePropType} from '../CourseCard'

export const CoursesList = (props) => {
  const {
    className,
    courses,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      {courses && courses.map((course) => {
                    return (
                      <div
                        className={classes.courseCardWrapper}
                        key={course.id}
                      >
                        <CourseCard
                          course={course}
                        />
                      </div>
                    )
                  })}
    </div>
  )
}

CoursesList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.arrayOf(CoursePropType)
}

export default CoursesList
