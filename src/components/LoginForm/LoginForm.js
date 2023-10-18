import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const LoginForm = (props) => {
  const {
    className,
    email,
    emailError,
    onChangeEmail,
    onChangePassword,
    onClickCreateAccount,
    onClickForgotPassword,
    onClickLogin,
    password,
    passwordError,
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
      >Log in 👋
      </Typography>
      <TextField
        className={classes.textField}
        errorMessage={emailError}
        onChange={onChangeEmail}
        placeholder={'E-mail'}
        value={email}
      />
      <TextField
        className={classes.textField}
        errorMessage={passwordError}
        onChange={onChangePassword}
        placeholder={'Password'}
        type={'password'}
        value={password}
      />
      <Button
        onClick={onClickLogin}
        className={classes.button}
        variant={'contained'}
        color={'primary'}
      >LOGIN
      </Button>
      <Button
        onClick={onClickCreateAccount}
        className={classes.button}
        variant={'contained'}
        color={'secondary'}
      >CREATE ACCOUNT
      </Button>
      <Button
        onClick={onClickForgotPassword}
        className={classes.button}
        variant={'text'}
        color={'primary'}
      >FORGOT PASSWORD
      </Button>
    </div>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string
}

export default LoginForm
