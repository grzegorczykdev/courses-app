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

export class PageCoursesList extends React.Component {
  state = {
    searchPhrase: '',
    isUserDropdownOpen: false
  }

  onChangeSearchPhraseHandler = (e) => {
    this.setState(() => ({
      searchPhrase: e.target.value
    }))
  }

  userDropdownCloseRequestHandler = () => {
    this.setState(() => ({
      isUserDropdownOpen: false
    }))
  }

  // User dropdown
  userDropdownOpenRequestHandler = () => {
    console.log('open')
    this.setState(() => ({
      isUserDropdownOpen: true
    }))
  }

  render () {
    const {
      className,
      courses,
      userDisplayName,
      userEmail,
      userAvatar,
      onUserDropdownProfileClick,
      onUserDropdownLogOutClick,
      ...otherProps
    } = this.props

    const {
      searchPhrase,
      isUserDropdownOpen

    } = this.state

    const filteredCourses = courses && courses.filter((course) => {
      return (course.category).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.description).toLowerCase().includes(searchPhrase.toLowerCase()) ||
        (course.title).toLowerCase().includes(searchPhrase.toLowerCase())
    })

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
                      onClick={onUserDropdownProfileClick}
                    />
                    <ListItem
                      icon={'log-out'}
                      text={'Log out'}
                      onClick={onUserDropdownLogOutClick}
                    />
                  </List>
                  : null}
                onOpenRequested={this.userDropdownOpenRequestHandler}
                onCloseRequested={this.userDropdownCloseRequestHandler}
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
    )
  }
}

PageCoursesList.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.arrayOf(CoursePropType),
  onUserDropdownProfileClick: PropTypes.func,
  onUserDropdownLogOutClick: PropTypes.func,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string
}

export default PageCoursesList
