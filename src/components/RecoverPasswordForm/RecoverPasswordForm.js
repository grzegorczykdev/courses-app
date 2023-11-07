import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../Logo'
import Typography from '../Typography'
import TextField from '../TextField'
import Button from '../Button'

import { useFormContext } from 'react-hook-form'

import classes from './styles.module.css'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

import isEmail from 'validator/lib/isEmail'

export const RecoverPasswordForm = (props) => {
  const {
    className,
    onClickBackToLogin,
    ...otherProps
  } = props

  const methods = useFormContext()

  const {register, formState: {errors}} = methods

  const registeredEmailProps = register('email', {
    validate:(email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  return (
    <form
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
        errorMessage={errors.email && errors.email.message}
        className={classes.textField}
        placeholder={'E-mail'}
        {...registeredEmailProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'primary'}
        type={'submit'}
      >RECOVER
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

RecoverPasswordForm.propTypes = {
  className: PropTypes.string,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default RecoverPasswordForm
