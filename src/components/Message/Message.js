import React from 'react'
import PropTypes from 'prop-types'
import IconInfo from './IconInfo'
import IconError from './IconError'
import Button from '../Button'

import classes from './styles.module.css'

import Typography from '../Typography'

export const Message = (props) => {
  const {
    message,
    buttonLabel = 'GO BACK',
    iconVariant = 'info',
    onButtonClick
  } = props
  return (
    <div className={classes.wrapper}>
      {iconVariant === 'info' ? <IconInfo/> : iconVariant === 'error' ? <IconError/> : null}
      <Typography
        variant={'h3'}
        className={classes.message}
      >
        {message}
      </Typography>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  iconVariant: PropTypes.oneOf(['error', 'info']),
  onButtonClick: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string
}

export default Message
