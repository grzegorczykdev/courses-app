import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import Typography from '../Typography'
import Button from '../Button'

export const CourseCard = (props) => {
  const {
    className,
    onClick,
    course,
    ...otherProps
  } = props

  const {
    category,
    description,
    image,
    title
  } = props.course

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div
        className={classes.imageWrapper}
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${image})`
          }}
        >
        </div>
      </div>
      <div className={classes.textWrapper}>
        <div className={classes.titleWrapper}>
          <Typography
            className={classes.category}
            variant={'body1'}
          >
            {category}
          </Typography>
          <Typography
            className={classes.title}
            variant={'body2'}
          >
            {title}
          </Typography>
        </div>
        <div className={classes.descriptionWrapper}>
          <Typography
            className={classes.description}
            variant={'body2'}
          >
            {description}
          </Typography>
        </div>
      </div>
      <div className={classes.actionsWrapper}>
        <Button
          onClick={onClick}
          color={'primary'}
          variant={'contained'}
          icon={'eye'}
          disabled={!onClick}
        >
          VIEW COURSE
        </Button>
      </div>
    </div>
  )
}

export const CoursePropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}).isRequired

CourseCard.propTypes = {
  className: PropTypes.string,
  course: CoursePropType,
  onClick: PropTypes.func
}

export default CourseCard
