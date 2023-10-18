import React from 'react'

// 'LOGIN, 'CREATE-ACCOUNT', 'FORGOT-PASSWORD'
export const RouterContext = React.createContext({
  route: 'LOGIN',
  setRoute: () => { console.log('no provider') }
})
