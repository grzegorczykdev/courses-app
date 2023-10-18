import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import { EMAIL_VALIDATION_ERROR } from '../../consts'
import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import isEmail from 'validator/lib/isEmail'

export const PageRecoverPassword = (props) => {
  const {
    className,
    onClickResetBackToLoginHandler,
    onClickResetRecoverPasswordHandler: onClickRecoverFromProps,
    ...otherProps
  } = props

  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const onChangeResetEmailHandler = React.useCallback((e) => {
    setEmail(() => e.target.value)
  }, [])

  const onClickResetRecoverPasswordHandler = React.useCallback(async () => {
    setIsSubmitted(() => true)

    if (emailError) return

    onClickRecoverFromProps(email)
  }, [email, emailError, onClickRecoverFromProps])

  React.useEffect(() => {
    setEmailError(() => isEmail(email) ? '' : EMAIL_VALIDATION_ERROR)
  }, [email])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <RecoverPasswordForm
          email={email}
          emailError={isSubmitted ? emailError : undefined}
          onChangeEmail={onChangeResetEmailHandler}
          onClickBackToLogin={onClickResetBackToLoginHandler}
          onClickRecoverPassword={onClickResetRecoverPasswordHandler}
        />
      </FullPageLayout>
    </div>
  )
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string,
  onClickResetBackToLoginHandler: PropTypes.func,
  onClickResetRecoverPasswordHandler: PropTypes.func
}

export default PageRecoverPassword
