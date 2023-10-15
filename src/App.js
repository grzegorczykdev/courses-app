import React from 'react'

import FullPageLoader from './components/FullPageLoader'
import FullPageMessage from './components/FullPageMessage'

import FullPageLayout from './components/FullPageLayout'
import Message from './components/Message'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'
import { getAll as getAllCourses } from './api/courses'
import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword/PageRecoverPassword'

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

    // courses
    courses: null
  }

  onClickLoginCreateAccountHandler = () => {
    this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))
  }

  onClickLoginForgotPasswordHandler = () => {
    this.setState(() => ({ notLoginUserRoute: 'FORGOT-PASSWORD' }))
  }

  onClickBackToLoginHandler = () => {
    this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))
  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    if (userIsLoggedIn) this.onUserLogged()
    this.setState(() => ({ isLoading: false }))
  }

  handleAsyncAction = async (asyncAction) => {
    this.setState(() => ({ isLoading: true }))
    try {
      await asyncAction()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickCACreateAccountHandler = async (email, password) => {
    this.handleAsyncAction(async () => {
      await signUp(email, password)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'User account created. User is logged in!'
      }))
      this.onUserLogged()
    })
  }

  onClickResetRecoverPasswordHandler = async (email) => {
    this.handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'Check your inbox'
      }))
    })
  }

  onUserDropdownProfileClick = () => {
    console.log('2')
  }

  onUserDropdownLogOutClick = async () => {
    this.handleAsyncAction(async () => {
      await logOut()
      this.setState(() => ({
        isUserLoggedIn: false,
        isUserDropdownOpen: false,
        userDisplayName: '',
        userEmail: '',
        userAvatar: ''
      }))
    })
  }

  fetchCourses = async () => {
    this.handleAsyncAction(async () => {
      const courses = await getAllCourses()
      this.setState(() => ({
        courses,
        allCourses: courses
      }))
    })
  }

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
    this.handleAsyncAction(async () => {
      await signIn(email, password)
      this.onUserLogged()
    })
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
      errorMessage,
      hasError,
      infoMessage,
      isInfoDisplayed,
      isLoading,
      isUserLoggedIn,
      notLoginUserRoute,
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
                onClickLoginCreateAccountHandler={this.onClickLoginCreateAccountHandler}
                onClickLoginForgotPasswordHandler={this.onClickLoginForgotPasswordHandler}
              />
              : notLoginUserRoute === 'CREATE-ACCOUNT' ?
                <PageCreateAccount
                  onClickCACreateAccountHandler={this.onClickCACreateAccountHandler}
                  onClickCABackToLoginHandler={this.onClickBackToLoginHandler}
                />
                : notLoginUserRoute === 'FORGOT-PASSWORD' ?
                  <PageRecoverPassword
                    onClickResetRecoverPasswordHandler={this.onClickResetRecoverPasswordHandler}
                    onClickResetBackToLoginHandler={this.onClickBackToLoginHandler}
                  />
                  :
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
