import React from 'react'
import FullPageLoader from './components/FullPageLoader'
import Typography from './components/Typography'
import Button from './components/Button'
import FullPageMessage from './components/FullPageMessage'

export class App extends React.Component {
  state = {
    // global state
    isLoading: false,
    hasError: false,
    errorMessage: 'Jest błąd',
    isInfoDisplayed: true,
    infoMessage: 'Jakieś info',

    // user state
    isUserLoggedIn: false,
    userDisplayName: '',
    userEmail: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'NEW-ACCOUNT', 'FORGOT PASSWORD'

    // login page state
    loginEmail: '',
    loginPassword: '',

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
    const { hasError, errorMessage, infoMessage, isInfoDisplayed, isLoading } = this.state
    return (
      <div>
        <h1>APP</h1>
        {hasError
          ? <FullPageMessage
              iconVariant={'error'}
              message={errorMessage}
              onButtonClick={() => console.log('a')}
            /> :
          isInfoDisplayed
            ? <FullPageMessage
                iconVariant={'info'}
                message={infoMessage}
                onButtonClick={() => console.log('a')}
              /> :
            isLoading ?
              <FullPageLoader/>
              : null
        }
        <Typography
          variant={'h1'}
        >
          Header 1
        </Typography>
        <br/>
        <Typography
          variant={'h3'}
        >
          Header 3
        </Typography>
        <br/>
        <Typography
          variant={'button'}
        >
        </Typography>

        <Button
          variant={'contained'}
          color={'primary'}
        >CONTAINED PRIMARY
        </Button>
        <br/>

        <Button
          variant={'contained'}
          color={'secondary'}
        >CONTAINED SECONDARY
        </Button>
        <br/>

        <Button
          variant={'text'}
          color={'primary'}
        >TEXT
        </Button>
      </div>
    )
  }
}

export default App
