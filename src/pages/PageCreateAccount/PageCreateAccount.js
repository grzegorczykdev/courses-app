import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import FullPageLayout from '../../components/FullPageLayout'
import CreateAccountForm from '../../components/CreateAccountForm'
import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

import isEmail from 'validator/lib/isEmail'

export const PageCreateAccount = (props) => {
  const {
    className,
    onClickCreateAccount: onClickCreateAccountFromProps,
    onClickBackToLogin,
    ...otherProps
  } = props

  const [createAccountEmail, setCreateAccountEmail] = React.useState('')
  const [createAccountEmailError, setCreateAccountEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [createAccountPassword, setCreateAccountPassword] = React.useState('')
  const [createAccountPasswordError, setCreateAccountPasswordError] = React.useState(PASSWORD_VALIDATION_ERROR)
  const [createAccountRepeatPassword, setCreateAccountRepeatPassword] = React.useState('')
  const [createAccountRepeatPasswordError, setCreateAccountRepeatPasswordError] = React.useState(REPEAT_PASSWORD_VALIDATION_ERROR)
  const [createAccountSubmitted, setCreateAccountSubmitted] = React.useState(false)

  const onClickCreateAccount = React.useCallback(async () => {
    setCreateAccountSubmitted(true)

    if (createAccountEmailError) return
    if (createAccountPasswordError) return
    if (createAccountRepeatPasswordError) return

    onClickCreateAccountFromProps(
      createAccountEmail,
      createAccountPassword)
  }, [createAccountEmail, createAccountEmailError, createAccountPassword, createAccountPasswordError, createAccountRepeatPasswordError, onClickCreateAccountFromProps])

  React.useEffect(() => {
    setCreateAccountEmailError(() => isEmail(createAccountEmail) ? '' : EMAIL_VALIDATION_ERROR)
  }, [createAccountEmail])

  React.useEffect(() => {
    setCreateAccountPasswordError(createAccountPassword.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR)
    setCreateAccountRepeatPasswordError(createAccountRepeatPassword === createAccountPassword ? '' : REPEAT_PASSWORD_VALIDATION_ERROR)
  }, [createAccountPassword, createAccountRepeatPassword])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <FullPageLayout>
        <CreateAccountForm
          createAccountEmail={createAccountEmail}
          createAccountEmailError={createAccountSubmitted ? createAccountEmailError : undefined}
          createAccountPassword={createAccountPassword}
          createAccountPasswordError={createAccountSubmitted ? createAccountPasswordError : undefined}
          createAccountRepeatPassword={createAccountRepeatPassword}
          createAccountRepeatPasswordError={createAccountSubmitted ? createAccountRepeatPasswordError : undefined}
          onChangeEmail={(e) => setCreateAccountEmail(() => e.target.value)}
          onChangePassword={(e) => setCreateAccountPassword(() => e.target.value)}
          onChangeRepeatPassword={(e) => setCreateAccountRepeatPassword(() => e.target.value)}
          onClickCreateAccount={onClickCreateAccount}
          onClickBackToLogin={onClickBackToLogin}
        />
      </FullPageLayout>
    </div>
  )
}

PageCreateAccount.propTypes = {
  className: PropTypes.string,
  onClickCreateAccount: PropTypes.func,
  onClickBackToLogin: PropTypes.func
}

export default PageCreateAccount
