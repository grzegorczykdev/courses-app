import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import CourseCard, { CoursePropType } from '../CourseCard'
import Typography from '../Typography'

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
      {
        !courses || courses.length === 0 ?
          <Typography className={classes.typographyNoCourses}>
            No courses found
          </Typography>
          :
          courses.map((course, i) => {
            const isThirdLeft = i === 0 || i % 3 === 0
            const isThirdRight = (i + 1) % 3 === 0
            return (
              <div
                className={
                          [
                            classes.courseCardWrapper,
                            isThirdLeft ? classes.thirdLeft : null,
                            isThirdRight ? classes.thirdRight : null
                          ]
                            .filter((className) => className)
                            .join(' ')
                        }
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
