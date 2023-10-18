import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import FullPageLayout from '../../components/FullPageLayout'
import CreateAccountForm from '../../components/CreateAccountForm'
import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

import isEmail from 'validator/lib/isEmail'

export class PageCreateAccount extends React.Component {
  state = {
    createAccountEmail: '',
    createAccountEmailError: EMAIL_VALIDATION_ERROR,
    createAccountPassword: '',
    createAccountPasswordError: PASSWORD_VALIDATION_ERROR,
    createAccountRepeatPassword: '',
    createAccountRepeatPasswordError: REPEAT_PASSWORD_VALIDATION_ERROR,
    createAccountSubmitted: false
  }

  onChangeCAEmailHandler = (e) => this.setState(() => ({
    createAccountEmail: e.target.value,
    createAccountEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
  }))

  onChangeCACreateAccountPasswordHandler = (e) => this.setState(() => ({
    createAccountPassword: e.target.value,
    createAccountPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR
  }))

  onChangeCARepeatPasswordHandler = (e) => {
    this.setState(() => ({
      createAccountRepeatPassword: e.target.value,
      createAccountRepeatPasswordError: e.target.value === this.state.createAccountPassword ? '' : REPEAT_PASSWORD_VALIDATION_ERROR
    }))
  }

  onClickCACreateAccountHandler = async () => {
    this.setState(() => ({ createAccountSubmitted: true }))

    if (this.state.createAccountEmailError) return
    if (this.state.createAccountPasswordError) return
    if (this.state.createAccountRepeatPasswordError) return

    this.props.onClickCACreateAccountHandler(
      this.state.createAccountEmail,
      this.state.createAccountPassword)
  }

  render () {
    const {
      className,
      onClickCACreateAccountHandler,
      onClickCABackToLoginHandler,
      ...otherProps
    } = this.props

    const {
      createAccountEmail,
      createAccountEmailError,
      createAccountPassword,
      createAccountPasswordError,
      createAccountRepeatPassword,
      createAccountRepeatPasswordError,
      createAccountSubmitted
    } = this.state

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
            onChangeEmail={this.onChangeCAEmailHandler}
            onChangePassword={this.onChangeCACreateAccountPasswordHandler}
            onChangeRepeatPassword={this.onChangeCARepeatPasswordHandler}
            onClickCreateAccount={this.onClickCACreateAccountHandler}
            onClickBackToLogin={onClickCABackToLoginHandler}
          />
        </FullPageLayout>
      </div>
    )
  }
}

PageCreateAccount.propTypes = {
  className: PropTypes.string,
  onClickCACreateAccountHandler: PropTypes.func,
  onClickCABackToLoginHandler: PropTypes.func
}

export default PageCreateAccount
