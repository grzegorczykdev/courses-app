import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import { EMAIL_VALIDATION_ERROR } from '../../consts'
import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import isEmail from 'validator/lib/isEmail'

export class PageRecoverPassword extends React.Component {
  state = {
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false
  }

  onChangeResetEmailHandler = (e) => this.setState(() => ({
    recoverPasswordEmail: e.target.value,
    recoverPasswordEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
  }))

  onClickResetRecoverPasswordHandler = async () => {
    this.setState(() => ({ recoverPasswordSubmitted: true }))

    if (this.state.recoverPasswordEmailError) return

    this.props.onClickResetRecoverPasswordHandler(this.state.recoverPasswordEmail)
  }

  render () {
    const {
      className,
      onClickResetBackToLoginHandler,
      onClickResetRecoverPasswordHandler,
      ...otherProps
    } = this.props

    const {
      recoverPasswordSubmitted,
      recoverPasswordEmailError,
      recoverPasswordEmail
    } = this.state

    return (
      <div
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <FullPageLayout>
          <RecoverPasswordForm
            recoverPasswordEmail={recoverPasswordEmail}
            recoverPasswordEmailError={recoverPasswordSubmitted ? recoverPasswordEmailError : undefined}
            onChangeEmail={this.onChangeResetEmailHandler}
            onClickBackToLogin={onClickResetBackToLoginHandler}
            onClickRecoverPassword={this.onClickResetRecoverPasswordHandler}
          />
        </FullPageLayout>
      </div>
    )
  }
}

PageRecoverPassword.propTypes = {
  className: PropTypes.string,
  onClickResetBackToLoginHandler: PropTypes.func,
  onClickResetRecoverPasswordHandler: PropTypes.func
}

export default PageRecoverPassword
