import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import Logo from '../../components/Logo'

import MainLayout from '../../components/MainLayout/MainLayout'

// import { useAuthUser } from '../../contexts/UserContext'

import classes from './styles.module.css'
import Button from '../../components/Button'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import { useAuthUser } from '../../contexts/UserContext'

export const PageProfile = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  const methods = useForm({
    defaultValues: {
      email: userEmail,
      displayName: userDisplayName,
      avatar: userAvatar
    }
  })
  const { handleSubmit } = methods

  const navigate = useNavigate()

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
            >GO BACK
            </Button>
          </>
        }

        contentMain={
          <FormProvider {...methods}>
            <ProfileForm
              onSubmit={handleSubmit((data) => {
                console.log(data)
              })}
            />
          </FormProvider>
        }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string
}

export default PageProfile
