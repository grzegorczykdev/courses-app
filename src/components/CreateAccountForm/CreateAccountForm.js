import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { useFormContext } from 'react-hook-form'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

import isEmail from 'validator/lib/isEmail'

import classes from './styles.module.css'

export const CreateAccountForm = (props) => {
  const {
    className,
    onClickBackToLogin,
    onSubmit,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { watch, register, formState: { errors } } = methods

  const password = watch('password')

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  const registeredPasswordProps = register('password', {
    required: {
      value: true,
      message: PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: PASSWORD_VALIDATION_ERROR
    }
  })

  const registeredRepeatPasswordProps = register('repeatPassword', {
    required: {
      value: true,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    validate: (repeatPassword) => repeatPassword === password || REPEAT_PASSWORD_VALIDATION_ERROR
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
      >Create new account
      </Typography>
      <TextField
        errorMessage={errors.email && errors.email.message}
        className={classes.textField}
        placeholder={'E-mail'}
        {...registeredEmailProps}
      />
      <TextField
        errorMessage={errors.password && errors.password.message}
        type={'password'}
        className={classes.textField}
        placeholder={'Password'}
        {...registeredPasswordProps}
      />
      <TextField
        errorMessage={errors.repeatPassword && errors.repeatPassword.message}
        type={'password'}
        className={classes.textField}
        placeholder={'Repeat password'}
        {...registeredRepeatPasswordProps}
      />
      <Button
        type={'submit'}
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
    </form>
  )
}

CreateAccountForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default CreateAccountForm
