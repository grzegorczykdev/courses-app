import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { useFormContext } from 'react-hook-form'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

import isEmail from 'validator/lib/isEmail'

import classes from './styles.module.css'

export const LoginForm = (props) => {
  const {
    className,
    onClickCreateAccount,
    onClickForgotPassword,
    onSubmit,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  const registeredPasswordProps = register('password', {
    minLength: {
      value: 6,
      message: PASSWORD_VALIDATION_ERROR
    }
  })

  return (
    <form
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      onSubmit={onSubmit}
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
        errorMessage={errors.email && errors.email.message}
        placeholder={'E-mail'}
        {...registeredEmailProps}
      />
      <TextField
        className={classes.textField}
        errorMessage={errors.password && errors.password.message}
        placeholder={'Password'}
        type={'password'}
        {...registeredPasswordProps}
      />
      <Button
        type={'submit'}
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
    </form>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired
}

export default LoginForm
