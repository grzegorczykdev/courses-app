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
        errorMessage={emailError}
        value={email}
        onChange={onChangeEmail}
        className={classes.textField}
        placeholder={'E-mail'}
      />
      <TextField
        type={'password'}
        value={password}
        onChange={onChangePassword}
        className={classes.textField}
        placeholder={'Password'}
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
  password: PropTypes.string.isRequired
}

export default LoginForm
