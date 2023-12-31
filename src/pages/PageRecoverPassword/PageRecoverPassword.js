import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import classes from './styles.module.css'
import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

export const PageRecoverPassword = (props) => {
  const {
    className,
    onClickRecover,
    ...otherProps
  } = props

  const methods = useForm()
  const { handleSubmit } = methods

  const navigate = useNavigate()

  const onClickBackToLogin = React.useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <FormProvider {...methods}>
          <RecoverPasswordForm
            onSubmit={handleSubmit((data) => onClickRecover(data.email))}
            onClickBackToLogin={onClickBackToLogin}
          />
        </FormProvider>
      </FullPageLayout>
    </div>
  )
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string,
  // onClickBackToLogin: PropTypes.func,
  onClickRecover: PropTypes.func
}

export default PageRecoverPassword
