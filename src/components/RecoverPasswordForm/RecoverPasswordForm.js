import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const RecoverPasswordForm = (props) => {
  const {
    className,
    onClickRecoverPassword,
    onClickBackToLogin,
    email,
    emailError,
    onChangeEmail,

    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <Logo className={classes.logo}/>
      <Typography
        className={classes.header}
        variant={'h1'}
      >Recover password
      </Typography>
      <TextField
        errorMessage={emailError}
        value={email}
        onChange={onChangeEmail}
        className={classes.textField}
        placeholder={'E-mail'}
      />
      <Button
        onClick={onClickRecoverPassword}
        className={classes.button}
        variant={'contained'}
        color={'primary'}
      >RECOVER
      </Button>
      <Button
        onClick={onClickBackToLogin}
        className={classes.button}
        variant={'text'}
        color={'primary'}
      >BACK TO LOGIN
      </Button>
    </div>
  )
}

RecoverPasswordForm.propTypes = {
  className: PropTypes.string,
  onClickRecoverPassword: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  emailError: PropTypes.string
}

export default RecoverPasswordForm
