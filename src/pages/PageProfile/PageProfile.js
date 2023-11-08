import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logo'

import MainLayout from '../../components/MainLayout/MainLayout'

// import { useAuthUser } from '../../contexts/UserContext'

import classes from './styles.module.css'
import Button from '../../components/Button'

export const PageProfile = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const navigate = useNavigate()

  // const {
  //   userDisplayName,
  //   userEmail,
  //   userAvatar
  // } = useAuthUser()

  const onClickGoBack = React.useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <MainLayout
        contentAppBar={
          <>
            <Logo className={classes.logo}/>
            <Button
              onClick={onClickGoBack}
              variant={'contained'}
              color={'primary'}
            >Go back
            </Button>
          </>
        }

        contentMain={
          'ProfilePage'
        }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string
}

export default PageProfile
