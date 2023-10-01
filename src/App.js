import React from 'react'
import FullPageLoader from './components/FullPageLoader'
import FullPageMessage from './components/FullPageMessage'

import FullPageLayout from './components/FullPageLayout'
import Message from './components/Message'

import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

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
    loginPassword: '',
    loginRepeatPassword: '',

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

  render () {
    const {
      notLoginUserRoute,
      hasError,
      errorMessage,
      infoMessage,
      isInfoDisplayed,
      isLoading,
      loginEmail,
      loginPassword,
      createAccountEmail,
      createAccountPassword,
      createAccountRepeatPassword,
      recoverPasswordEmail
    } = this.state
    return (
      <div>
        {
          notLoginUserRoute === 'LOGIN' ?
            <FullPageLayout>
              <LoginForm
                onClickLogin={() => { console.log('onClickLogin') }}
                onClickCreateAccount={() => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))}
                onClickForgotPassword={() => this.setState(() => ({ notLoginUserRoute: 'FORGOT-PASSWORD' }))}
                email={loginEmail}
                password={loginPassword}
                onChangeEmail={(e) => this.setState(() => ({ loginEmail: e.target.value }))}
                onChangePassword={(e) => this.setState(() => ({ loginPassword: e.target.value }))}
              />
            </FullPageLayout>
            : notLoginUserRoute === 'CREATE-ACCOUNT' ?
              <FullPageLayout>
                <CreateAccountForm
                  createAccountEmail={createAccountEmail}
                  createAccountPassword={createAccountPassword}
                  createAccountRepeatPassword={createAccountRepeatPassword}
                  onChangeEmail={(e) => this.setState(() => ({ createAccountEmail: e.target.value }))}
                  onChangePassword={(e) => this.setState(() => ({ createAccountPassword: e.target.value }))}
                  onChangeRepeatPassword={(e) => this.setState(() => ({ createAccountRepeatPassword: e.target.value }))}
                  onClickCreateAccount={() => { console.log('onClickCreateAccount') }}
                  onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                />
              </FullPageLayout>
              : notLoginUserRoute === 'FORGOT-PASSWORD' ?
                <FullPageLayout>
                  <RecoverPasswordForm
                    recoverPasswordEmail={recoverPasswordEmail}
                    onChangeEmail={(e) => this.setState(() => ({ recoverPasswordEmail: e.target.value }))}
                    onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                    onClickRecoverPassword={() => { console.log('onClickRecoverPassword') }}
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
                onButtonClick={() => console.log('a')}
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
                    onButtonClick={() => console.log('a')}
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
