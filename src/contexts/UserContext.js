import React from 'react'
import PropTypes from 'prop-types'

const errorProviderNotFount = () => {
  console.error('UserContext.Provider not founf!')
}

const initialContextState = {
  isUserLoggedIn: false,
  userDisplayName: '',
  userEmail: '',
  userAvatar: '',
  setIsUserLoggedIn: errorProviderNotFount,
  setUserDisplayName: errorProviderNotFount,
  setUserEmail: errorProviderNotFount,
  setUserAvatar: errorProviderNotFount
}

// 'LOGIN, 'CREATE-ACCOUNT', 'FORGOT-PASSWORD'
export const UserContext = React.createContext(initialContextState)

export const useAuthUser = () => {
  const authUserContextValue = React.useContext(UserContext)
  return authUserContextValue
}

export const UserContextProvider = (props) => {
  const { children } = props

  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(initialContextState.isUserLoggedIn)
  const [userDisplayName, setUserDisplayName] = React.useState(initialContextState.userDisplayName)
  const [userEmail, setUserEmail] = React.useState(initialContextState.userEmail)
  const [userAvatar, setUserAvatar] = React.useState(initialContextState.userAvatar)

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        userDisplayName,
        userEmail,
        userAvatar,
        setIsUserLoggedIn,
        setUserDisplayName,
        setUserEmail,
        setUserAvatar
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node
}

export default UserContextProvider
