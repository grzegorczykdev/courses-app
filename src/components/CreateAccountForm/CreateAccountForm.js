import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import classes from './styles.module.css'

export const CreateAccountForm = (props) => {
  const {
    className,
    createAccountEmailError,
    createAccountPasswordError,
    createAccountRepeatPasswordError,
    onClickCreateAccount,
    onClickBackToLogin,
    createAccountEmail,
    createAccountPassword,
    createAccountRepeatPassword,
    onChangePassword,
    onChangeEmail,
    onChangeRepeatPassword,
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
      >Create new account
      </Typography>
      <TextField
        errorMessage={createAccountEmailError}
        value={createAccountEmail}
        onChange={onChangeEmail}
        className={classes.textField}
        placeholder={'E-mail'}
      />
      <TextField
        errorMessage={createAccountPasswordError}
        type={'password'}
        value={createAccountPassword}
        onChange={onChangePassword}
        className={classes.textField}
        placeholder={'Password'}
      />
      <TextField
        errorMessage={createAccountRepeatPasswordError}
        type={'password'}
        value={createAccountRepeatPassword}
        onChange={onChangeRepeatPassword}
        className={classes.textField}
        placeholder={'Repeat password'}
      />
      <Button
        onClick={onClickCreateAccount}
        className={classes.button}
        variant={'contained'}
        color={'primary'}
      >CREATE ACCOUNT
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

CreateAccountForm.propTypes = {
  className: PropTypes.string,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired,
  createAccountEmail: PropTypes.string.isRequired,
  createAccountPassword: PropTypes.string.isRequired,
  createAccountRepeatPassword: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeRepeatPassword: PropTypes.func.isRequired,
  createAccountEmailError: PropTypes.string,
  createAccountPasswordError: PropTypes.string,
  createAccountRepeatPasswordError: PropTypes.string
}

export default CreateAccountForm
