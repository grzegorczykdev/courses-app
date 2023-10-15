import React from 'react'

import isEmail from 'validator/lib/isEmail'

import FullPageLoader from './components/FullPageLoader'
import FullPageMessage from './components/FullPageMessage'

import FullPageLayout from './components/FullPageLayout'
import Message from './components/Message'

import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'
import { REPEAT_PASSWORD_VALIDATION_ERROR, EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from './consts'
import { getAll as getAllCourses } from './api/courses'
import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'

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

    // create account page
    createAccountEmail: '',
    createAccountEmailError: EMAIL_VALIDATION_ERROR,
    createAccountPassword: '',
    createAccountPasswordError: PASSWORD_VALIDATION_ERROR,
    createAccountRepeatPassword: '',
    createAccountRepeatPasswordError: REPEAT_PASSWORD_VALIDATION_ERROR,
    createAccountSubmitted: false,

    // recover password page
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false,

    // courses
    courses: null

  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    if (userIsLoggedIn) this.onUserLogged()
    this.setState(() => ({ isLoading: false }))
  }

  // Create account
  onChangeCAEmailHandler = (e) => this.setState(() => ({
    createAccountEmail: e.target.value,
    createAccountEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
  }))

  onChangeCACreateAccountPasswordHandler = (e) => this.setState(() => ({
    createAccountPassword: e.target.value,
    createAccountPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR
  }))

  onChangeCARepeatPasswordHandler = (e) => {
    console.log(this.state.createAccountPassword)
    console.log(e.target.value)
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

    this.setState(() => ({ isLoading: true }))
    try {
      await signUp(this.state.createAccountEmail, this.state.createAccountPassword)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'User account created. User is logged in!'
      }))
      this.onUserLogged()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickCABackToLoginHandler = () => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))

  // Forgot password
  onChangeResetEmailHandler = (e) => this.setState(() => ({
    recoverPasswordEmail: e.target.value,
    recoverPasswordEmailError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR
  }))

  onClickResetBackToLoginHandler = () => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))

  onClickResetRecoverPasswordHandler = async () => {
    this.setState(() => ({ recoverPasswordSubmitted: true }))

    if (this.state.recoverPasswordEmailError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await sendPasswordResetEmail(this.state.recoverPasswordEmail)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'Check your inbox'
      }))
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onUserDropdownProfileClick = () => {
    console.log('2')
  }

  onUserDropdownLogOutClick = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      await logOut()
      this.setState(() => ({
        isUserLoggedIn: false,
        isUserDropdownOpen: false,
        userDisplayName: '',
        userEmail: '',
        userAvatar: ''
      }))
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  fetchCourses = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      const courses = await getAllCourses()
      this.setState(() => ({
        courses,
        allCourses: courses
      }))
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
      console.log(this.state.courses)
    }
  }

  // Other
  onUserLogged = () => {
    const token = getIdToken()
    if (!token) return
    const user = decodeToken(token)
    // @TODO replace this token decoding with request for user data
    this.setState(() => ({
      isUserLoggedIn: true,
      userDisplayName: '',
      userEmail: user.email,
      userAvatar: '',
      loginEmail: '',
      loginPassword: ''
    }))

    this.fetchCourses()
  }

  onClickLogin = async (email, password) => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(email, password)
      this.onUserLogged()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
  }

  dismissInfo = () => {
    this.setState(() => ({
      isInfoDisplayed: false,
      infoMessage: ''
    }))
  }

  render () {
    const {
      courses,
      createAccountEmail,
      createAccountEmailError,
      createAccountPassword,
      createAccountPasswordError,
      createAccountRepeatPassword,
      createAccountRepeatPasswordError,
      createAccountSubmitted,
      errorMessage,
      hasError,
      infoMessage,
      isInfoDisplayed,
      isLoading,
      isUserLoggedIn,
      notLoginUserRoute,
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted,
      userDisplayName,
      userEmail,
      userAvatar
    } = this.state

    return (
      <div>
        {
          isUserLoggedIn
            ?
              <PageCoursesList
                courses={courses}
                userDisplayName={userDisplayName}
                userEmail={userEmail}
                userAvatar={userAvatar}
                onUserDropdownProfileClick={this.onUserDropdownProfileClick}
                onUserDropdownLogOutClick={this.onUserDropdownLogOutClick}
              />
            :
            notLoginUserRoute === 'LOGIN' ?
              <PageLogin
                onClickLogin={this.onClickLogin}
              />
              : notLoginUserRoute === 'CREATE-ACCOUNT' ?
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
                    onClickBackToLogin={this.onClickCABackToLoginHandler}
                  />
                </FullPageLayout>
                : notLoginUserRoute === 'FORGOT-PASSWORD' ?
                  <FullPageLayout>
                    <RecoverPasswordForm
                      recoverPasswordEmail={recoverPasswordEmail}
                      recoverPasswordEmailError={recoverPasswordSubmitted ? recoverPasswordEmailError : undefined}
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
                buttonLabel={'OK'}
                iconVariant={'error'}
                message={errorMessage}
                onButtonClick={this.dismissError}
                wrapperProps={{
                  className: 'wrapper-class'
                }}
              />
            :
            isInfoDisplayed
              ?
                <FullPageLayout
                  className= {'wrapper-class'}
                >
                  <Message
                    buttonLabel={'OK'}
                    iconVariant={'info'}
                    message={infoMessage}
                    onButtonClick={this.dismissInfo}
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
