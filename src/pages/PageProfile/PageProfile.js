import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import Logo from '../../components/Logo'

import MainLayout from '../../components/MainLayout/'

import Button from '../../components/Button'
import ProfileForm from '../../components/ProfileForm/'
import Typography from '../../components/Typography'
import FileInput from '../../components/FileInput/'
import Avatar from '../../components/Avatar/'

import { useAuthUser } from '../../contexts/UserContext'
import classes from './styles.module.css'

export const PageProfile = (props) => {
  const {
    className,
    onSaveChanges,
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

  const { reset, handleSubmit } = methods

  React.useEffect(() => {
    reset({
      email: userEmail,
      displayName: userDisplayName,
      avatar: userAvatar
    })
  }, [reset, userAvatar, userDisplayName, userEmail])

  const navigate = useNavigate()

  const onClickGoBack = React.useCallback(() => {
    navigate('/')
  }, [navigate])

  const onAvatarChange = React.useCallback((file)=>{
    console.log(file)
  },[])

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
          <div className={classes.contentMainWrapper}>
            <Typography
              className={classes.header}
              variant={'h1'}
            >User profile
            </Typography>
            <Avatar
              className={classes.avatar}
              src={userAvatar}
            >
            </Avatar>
            <FileInput
              onChange={(e)=>onAvatarChange(e.target.files[0])}
              className={classes.fileInput}
            >Change avatar
            </FileInput>
            <FormProvider {...methods}>
              <ProfileForm
                onSubmit={handleSubmit(async (data) => {
                await onSaveChanges(data.displayName)
                onClickGoBack()
              })}
              />
            </FormProvider>
          </div>
        }
      />
    </div>
  )
}

PageProfile.propTypes = {
  className: PropTypes.string,
  onSaveChanges: PropTypes.func.isRequired
}

export default PageProfile
