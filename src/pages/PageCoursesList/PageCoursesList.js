import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../../components/Logo'
import UserDropdown from '../../components/UserDropdown'
import ListItem from '../../components/ListItem'

import CoursesList from '../../components/CoursesList'
import List from '../../components/List/List'
import MainLayout from '../../components/MainLayout/MainLayout'
import TextField from '../../components/TextField'

import classes from './styles.module.css'
import { CoursePropType } from '../../components/CourseCard'

export const PageCoursesList = (props) => {
  const {
    className,
    courses,
    userDisplayName,
    userEmail,
    userAvatar,
    onClickProfile,
    onClickLogOut,
    ...otherProps
  } = props

  const [searchPhrase, setSearchPhrase] = React.useState('')
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState('')

  const filteredCourses = React.useMemo(() =>
    courses && courses.filter((course) => {
      return (course.category).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.description).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.title).toLowerCase().includes(searchPhrase.toLowerCase())
    })
  , [courses, searchPhrase])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
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
                    onClick={onClickProfile}
                  />
                  <ListItem
                    icon={'log-out'}
                    text={'Log out'}
                    onClick={onClickLogOut}
                  />
                </List>
                : null}
              onOpenRequested={() => {
                setIsUserDropdownOpen(() => true)
              }}
              onCloseRequested={() => {
                setIsUserDropdownOpen(() => false)
              }}
            />
          </>
                  }

        contentSearch={
          <TextField
            value={searchPhrase}
            onChange={(e) => {
              setSearchPhrase(() => e.target.value)
            }}
            className={classes.searchTextField}
            placeholder={'Type to search'}
          />
                  }

        contentMain={
          <CoursesList courses={filteredCourses}/>
                  }
      />
    </div>
  )
}

PageCoursesList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.arrayOf(CoursePropType),
  onClickProfile: PropTypes.func,
  onClickLogOut: PropTypes.func,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string
}

export default PageCoursesList
