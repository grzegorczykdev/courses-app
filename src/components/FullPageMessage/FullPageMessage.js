import React from 'react'
import PropTypes from 'prop-types'
// import Error from './Icon'
import Button from '../Button'

import classes from './styles.module.css'
import Typography from '../Typography'

export const FullPageLoader = (props) => {
  const {
    message,
    buttonLabel = 'GO BACK',
    className,
    ...otherProps
  } = props
  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <div className={classes.wrapper}>
        <Typography
          variant={'h3'}
          className={classes.message}
        >
          {message}
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
        >
          {buttonLabel}
        </Button>
        {/* <Error /> */}
      </div>
    </div>
  )
}

FullPageLoader.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string
}

export default FullPageLoader
