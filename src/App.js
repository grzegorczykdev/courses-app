import React from 'react'

import isEmail from 'validator/lib/isEmail'

import FullPageLoader from './components/FullPageLoader'
import FullPageMessage from './components/FullPageMessage'

import FullPageLayout from './components/FullPageLayout'
import Message from './components/Message'

import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import { signIn } from './auth'

export class App extends React.Component {
  state = {
    // global state
    isLoading: false,
    hasError: false,
    errorMessage: '',
    isInfoDisplayed: false,
    infoMessage: '',

    // user state
    isUserLoggedIn: false,
    userDisplayName: '',
    userEmail: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'LOGIN, 'CREATE-ACCOUNT', 'FORGOT-PASSWORD'

    // login page state
    loginEmail: '',
    loginEmailError: '',
    loginPassword: '',
    loginSubmitted: false,

    // create account page
    createAccountEmail: '',
    createAccountPassword: '',
    createAccountRepeatPassword: '',

    // recover password page
    recoverPasswordEmail: '',

    // course list page
    courses: null,
    searchPhrase: ''
  }

  // Login
  onClickLogin = async () => {
    this.setState(() => ({ loginSubmitted: true }))

    if (this.state.loginEmailError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(this.state.loginEmail, this.state.loginPassword)
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onChangeLoginEmailHandler = (e) => {
    console.log(isEmail(e.target.value))
    this.setState(() => ({
      loginEmail: e.target.value,
      loginEmailError: isEmail(e.target.value) ? '' : 'Please enter a valid email address'
    }))
  }

  onChangeLoginPasswordHandler = (e) => this.setState(() => ({ loginPassword: e.target.value }))

  onClickLoginCreateAccountHandler = () => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))

  onClickLoginForgotPasswordHandler = () => this.setState(() => ({ notLoginUserRoute: 'FORGOT-PASSWORD' }))

  // Create account
  onChangeCAEmailHandler = (e) => this.setState(() => ({ createAccountEmail: e.target.value }))

  onChangeCACreateAccountPasswordHandler = (e) => this.setState(() => ({ createAccountPassword: e.target.value }))

  onChangeCARepeatPasswordHandler = (e) => this.setState(() => ({ createAccountRepeatPassword: e.target.value }))

  onClickCACreateAccountHandler = () => { console.log('onClickCreateAccount') }

  onClickCABackToLoginHandler = () => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))

  // Forgot password
  onChangeResetEmailHandler = (e) => this.setState(() => ({ recoverPasswordEmail: e.target.value }))

  onClickResetBackToLoginHandler = () => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))

  onClickResetRecoverPasswordHandler = () => { console.log('onClickRecoverPassword') }

  // Other
  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
  }

  render () {
    const {
      createAccountEmail,
      createAccountPassword,
      createAccountRepeatPassword,
      errorMessage,
      hasError,
      infoMessage,
      isInfoDisplayed,
      isLoading,
      loginEmail,
      loginEmailError,
      loginPassword,
      loginSubmitted,
      notLoginUserRoute,
      recoverPasswordEmail
    } = this.state
    return (
      <div>
        {
          notLoginUserRoute === 'LOGIN' ?
            <FullPageLayout>
              <LoginForm
                email={loginEmail}
                emailError={loginSubmitted ? loginEmailError : undefined}
                password={loginPassword}
                onClickLogin={this.onClickLogin}
                onClickCreateAccount={this.onClickLoginCreateAccountHandler}
                onClickForgotPassword={this.onClickLoginForgotPasswordHandler}
                onChangeEmail={this.onChangeLoginEmailHandler}
                onChangePassword={this.onChangeLoginPasswordHandler}
              />
            </FullPageLayout>
            : notLoginUserRoute === 'CREATE-ACCOUNT' ?
              <FullPageLayout>
                <CreateAccountForm
                  createAccountEmail={createAccountEmail}
                  createAccountPassword={createAccountPassword}
                  createAccountRepeatPassword={createAccountRepeatPassword}
                  onChangeEmail={this.onChangeCAEmailHandler}
                  onChangePassword={this.onChangeCACreateAccountPasswordHandler}
                  onChangeRepeatPassword={this.onChangeCARepeatPasswordHandler}
                  onClickCreateAccount={this.onClickCACreateAccountHandler}
                  onClickBackToLogin={this.onClickCABackToLoginHandler}
                />
              </FullPageLayout>
              : notLoginUserRoute === 'FORGOT-PASSWORD' ?
                <FullPageLayout>
                  <RecoverPasswordForm
                    recoverPasswordEmail={recoverPasswordEmail}
                    onChangeEmail={this.onChangeResetEmailHandler}
                    onClickBackToLogin={this.onClickResetBackToLoginHandler}
                    onClickRecoverPassword={this.onClickResetRecoverPasswordHandler}
                  />
                </FullPageLayout> :
                null}
        {
          /*
          Dwa podejścia w wyświetlaniu komponentów
          Error - Komponent spomponowany w FullPageMessage - koniecznosć tworzenia nowego obiektu z propsami dla wrappera
          Info - Komponent tworzony w tym miejscu - przekazywane osobne propsy
          */
        }
        {
          hasError
            ? <FullPageMessage
                wrapperProps={{
                  className: 'wrapper-class'
                }}
                iconVariant={'error'}
                message={errorMessage}
                onButtonClick={this.dismissError}
              />
            :
            isInfoDisplayed
              ?
                <FullPageLayout
                  className= {'wrapper-class'}
                >
                  <Message
                    iconVariant={'info'}
                    message={infoMessage}
                    onButtonClick={this.dismissError}
                  />
                </FullPageLayout> :
              isLoading ?
                <FullPageLoader/>
                : null
        }
      </div>
    )
  }
}

export default App
