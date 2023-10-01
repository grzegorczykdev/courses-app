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
    onClickLogin,
    onClickCreateAccount,
    onClickForgotPassword,
    email,
    password,
    onChangePassword,
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
      >Log in 👋
      </Typography>
      <TextField
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
  onClickLogin: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired
}

export default LoginForm
