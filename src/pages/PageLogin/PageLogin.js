import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import isEmail from 'validator/lib/isEmail'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

export class PageLogin extends React.Component {
  state = {
    loginEmail: '',
    loginEmailError: EMAIL_VALIDATION_ERROR,
    loginPassword: '',
    loginPasswordError: PASSWORD_VALIDATION_ERROR,
    loginSubmitted: false
  }

  onClickLoginCreateAccountHandler = () => {
    this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))
  }

  onClickLoginForgotPasswordHandler = () => {
    this.setState(() => ({ notLoginUserRoute: 'FORGOT-PASSWORD' }))
  }

  onChangeLoginEmailHandler = (e) => {
    this.setState(() => ({
      loginEmail: e.target.value,
      loginEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
    }))
  }

  onChangeLoginPasswordHandler = (e) => {
    this.setState(() => ({
      loginPassword: e.target.value,
      loginPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR
    }))
  }

  onClickLogin = async () => {
    this.setState(() => ({ loginSubmitted: true }))

    if (this.state.loginEmailError) return
    if (this.state.loginPasswordError) return

    this.props.onClickLogin(this.state.loginEmail, this.state.loginPassword)
  }

  render () {
    const {
      className,
      ...otherProps
    } = this.props

    const {
      loginEmail,
      loginEmailError,
      loginPassword,
      loginPasswordError,
      loginSubmitted
    } = this.state

    return (
      <div
        className={`${classes.root}${className ? ` ${className}` : ''}`}
        {...otherProps}
      >
        <FullPageLayout>
          <LoginForm
            email={loginEmail}
            emailError={loginSubmitted ? loginEmailError : undefined}
            password={loginPassword}
            passwordError={loginSubmitted ? loginPasswordError : undefined}
            onClickLogin={this.onClickLogin}
            onClickCreateAccount={this.onClickLoginCreateAccountHandler}
            onClickForgotPassword={this.onClickLoginForgotPasswordHandler}
            onChangeEmail={this.onChangeLoginEmailHandler}
            onChangePassword={this.onChangeLoginPasswordHandler}
          />
        </FullPageLayout>
      </div>
    )
  }
}

PageLogin.propTypes = {
  className: PropTypes.string,
  onClickLogin: PropTypes.func
}

export default PageLogin
