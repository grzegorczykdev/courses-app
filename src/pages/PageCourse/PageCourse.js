import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../layouts/CourseLayout/CourseLayout'
import { Outlet } from 'react-router-dom'


export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props


  return (
    <CourseLayout
      contentSlot={<Outlet/>}
      sidebarSlot={'SIDEBAR'}
      titleSlot={'TITLE'}
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
