import React from 'react'

import { Routes, Route } from 'react-router-dom'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import Message from './components/Message'

import PageCoursesList from './pages/PageCoursesList/PageCoursesList'
import PageLogin from './pages/PageLogin/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword/PageRecoverPassword'
import PageProfile from './pages/PageProfile/PageProfile'

import { useAuthUser } from './contexts/UserContext'

import { signIn, signUp, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut, updateUser, getUserData as getUserDataAPICall } from './auth'

import { getAll as getAllCourses } from './api/courses'

export const App = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isInfoDisplayed, setIsInfoDisplayed] = React.useState(false)
  const [infoMessage, setInfoMessage] = React.useState('')

  const [courses, setCourses] = React.useState(null)

  const {
    isUserLoggedIn,
    clearUser,
    setUser
  } = useAuthUser()

  const handleAsyncAction = React.useCallback(async (asyncAction) => {
    setIsLoading(() => true)
    try {
      await asyncAction()
    } catch (error) {
      setHasError(() => true)
      setErrorMessage(() => error.data.error.message)
    } finally {
      setIsLoading(() => false)
    }
  }, [])

  const fetchCourses = React.useCallback(async () => {
    const courses = await getAllCourses()
    setCourses(() => courses)
  }, [])

  const getUserData = React.useCallback(async () => {
    const data = await getUserDataAPICall()
    setUser({
      userDisplayName: data.displayName,
      userEmail: data.email,
      userAvatar: data.avatar
    })
  }, [setUser])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        getUserData(),
        fetchCourses()
      ])
    })
  }, [fetchCourses, getUserData, handleAsyncAction])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'User account created. User is logged in!')
      await Promise.all([
        getUserData(),
        fetchCourses()
      ])
    })
  }, [fetchCourses, getUserData, handleAsyncAction])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'Go to your mailbox to change the password!')
      await Promise.all([
        getUserData(),
        fetchCourses()
      ])
    })
  }, [fetchCourses, getUserData, handleAsyncAction])

  const onClickLogOut = React.useCallback(async () => {
    await logOut()
    clearUser()
  }, [clearUser])

  const onClickSaveChangesProfile = React.useCallback(async (displayName, photoUrl) => {
    handleAsyncAction(async () => {
      await updateUser(displayName, photoUrl)
      await getUserData()
    })
  }, [getUserData, handleAsyncAction])

  const dismissError = React.useCallback(() => {
    setHasError(() => false)
    setErrorMessage(() => '')
  }, [])

  const dismissInfo = React.useCallback(() => {
    setIsInfoDisplayed(() => false)
    setInfoMessage(() => '')
  }, [])

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await Promise.all([
          getUserData(),
          fetchCourses()
        ])
      }
    })
    // mount only
  }, [fetchCourses, getUserData, handleAsyncAction])

  return (
    <div>
      {
          isUserLoggedIn
            ?
              <Routes>
                <Route
                  path={'/profile'}
                  element={
                    <PageProfile
                      onSaveChanges={onClickSaveChangesProfile}
                    />}
                />
                <Route
                  path={'*'}
                  element={
                    <PageCoursesList
                      courses={courses}
                      onClickLogOut={onClickLogOut}
                    />}
                />
              </Routes>
            :
            null
            }
      {
              !isUserLoggedIn
                ?
                  <Routes>
                    <Route
                      path={'*'}
                      element={
                        <PageLogin
                          onClickLogin={onClickLogin}
                        />
                  }
                    />
                    <Route
                      path={'/create-account'}
                      element={
                        <PageCreateAccount
                          onClickCreateAccount={onClickCreateAccount}
                        />
                    }
                    />
                    <Route
                      path={'/recover-password'}
                      element={
                        <PageRecoverPassword
                          onClickRecover={onClickRecover}
                        />
                    }
                    />
                  </Routes>
                :
                null
            }
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
                onButtonClick={dismissError}
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
                    onButtonClick={dismissInfo}
                  />
                </FullPageLayout> :
              isLoading ?
                <FullPageLoader/>
                : null
        }
    </div>
  )
}

export default App
