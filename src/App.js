import React from 'react'

import isEmail from 'validator/lib/isEmail'

import FullPageLoader from './components/FullPageLoader'
import FullPageMessage from './components/FullPageMessage'

import FullPageLayout from './components/FullPageLayout'
import Message from './components/Message'

import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import Logo from './components/Logo'
import UserDropdown from './components/UserDropdown'
import ListItem from './components/ListItem'

import CoursesList from './components/CoursesList'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'
import { getAll as getAllCourses } from './api/courses'

import classes from './styles.module.css'
import List from './components/List/List'
import MainLayout from './components/MainLayout/MainLayout'
import TextField from './components/TextField'

const EMAIL_VALIDATION_ERROR = 'Please type a valid e-mail!'
const PASSWORD_VALIDATION_ERROR = 'Password must have at least 6 chars!'
const REPEAT_PASSWORD_VALIDATION_ERROR = 'Passwords must be the same!'

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

    // user dropdown
    isUserDropdownOpen: false,

    // router state
    notLoginUserRoute: 'LOGIN', // 'LOGIN, 'CREATE-ACCOUNT', 'FORGOT-PASSWORD'

    // login page state
    loginEmail: '',
    loginEmailError: EMAIL_VALIDATION_ERROR,
    loginPassword: '',
    loginPasswordError: PASSWORD_VALIDATION_ERROR,
    loginSubmitted: false,

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

    // course list page
    courses: null,
    searchPhrase: ''
  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    if (userIsLoggedIn) this.onUserLogged()
    this.setState(() => ({ isLoading: false }))
  }

  // Login
  onClickLogin = async () => {
    this.setState(() => ({ loginSubmitted: true }))

    if (this.state.loginEmailError) return
    if (this.state.loginPasswordError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(this.state.loginEmail, this.state.loginPassword)
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

  onClickLoginCreateAccountHandler = () => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))

  onClickLoginForgotPasswordHandler = () => this.setState(() => ({ notLoginUserRoute: 'FORGOT-PASSWORD' }))

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

  // User dropdown
  onUserDropdownClick = () => {
    this.setState((prevState) => ({
      isUserDropdownOpen: !prevState.isUserDropdownOpen
    }))
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

  onChangeSearchPhraseHandler = (e) => {
    this.setState(() => ({
      searchPhrase: e.target.value
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
      loginEmail,
      loginEmailError,
      loginPassword,
      loginPasswordError,
      loginSubmitted,
      notLoginUserRoute,
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted,
      searchPhrase,
      userDisplayName,
      userEmail,
      userAvatar,
      isUserDropdownOpen
    } = this.state

    const filteredCourses = courses && courses.filter((course) => {
      return (course.category).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.description).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.title).toLowerCase().includes(searchPhrase.toLowerCase())
    })

    return (
      <div>
        {
          isUserLoggedIn
            ?
              <div>
                <MainLayout
                  contentAppBar={
                    <>
                      <Logo className={classes.logo}/>
                      <UserDropdown
                        userDisplayName={userDisplayName}
                        userEmail={userEmail}
                        userAvatar={userAvatar}
                        className={classes.userDropdown}
                        contentList={isUserDropdownOpen ?
                          <List>
                            <ListItem
                              icon={'profile'}
                              text={'Profile'}
                              disabled={true}
                              onClick={this.onUserDropdownProfileClick}
                            />
                            <ListItem
                              icon={'log-out'}
                              text={'Log out'}
                              onClick={this.onUserDropdownLogOutClick}
                            />
                          </List>
                          : null}
                        onClick={this.onUserDropdownClick}
                      />
                    </>
                  }

                  contentSearch={
                    <TextField
                      value={searchPhrase}
                      onChange={this.onChangeSearchPhraseHandler}
                      className={classes.searchTextField}
                      placeholder={'Type to search'}
                    />
                  }

                  contentMain={
                    <CoursesList courses={filteredCourses}/>
                  }
                />
              </div>
            :
            notLoginUserRoute === 'LOGIN' ?
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
