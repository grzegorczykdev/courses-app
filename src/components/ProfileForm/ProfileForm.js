import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { FIELD_IS_REQUIRED_VALIDATION_ERROR } from '../../consts'
import TextField from '../TextField'
import Button from '../Button'
import Typography from '../Typography'

import classes from './styles.module.css'

export const ProfileForm = (props) => {
  const {
    className,
    onSubmit,
    ...otherProps
  } = props

  const methods = useFormContext()

  const { register, formState: { errors } } = methods

  const registeredEmailProps = register('email')

  const registeredDisplayNameProps = register('displayName', {
    required: {
      value: true,
      message: FIELD_IS_REQUIRED_VALIDATION_ERROR
    }
  })

  return (
    <form
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      onSubmit={onSubmit}
      {...otherProps}
    >
      <Typography
        className={classes.header}
        variant={'h1'}
      >User profile
      </Typography>
      <TextField
        disabled={true}
        className={classes.textField}
        placeholder={'E-mail'}
        {...registeredEmailProps}
      />
      <TextField
        className={classes.textField}
        errorMessage={errors.displayName && errors.displayName.message}
        placeholder={'First name and last name'}
        {...registeredDisplayNameProps}
      />
      <Button
        className={classes.button}
        variant={'contained'}
        color={'secondary'}
        type={'submit'}
      >SAVE CHANGES
      </Button>
    </form>
  )
}

ProfileForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func
}

export default ProfileForm
