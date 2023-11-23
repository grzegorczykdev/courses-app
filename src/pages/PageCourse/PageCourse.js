import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../layouts/CourseLayout/CourseLayout'
import { Outlet, useParams } from 'react-router-dom'
import { CoursePropType } from '../../components/CourseCard'
import { Box, Typography } from '@mui/material'



export const PageCourse = (props) => {
  const {
    sx,
    courses,
    ...otherProps
  } = props

  const {courseId} = useParams()

  const currentCourse = courses && courses.find((course)=>{
    return course.id === courseId
  })

  return (
    <CourseLayout
      contentSlot={<Outlet/>}
      sidebarSlot={'SIDEBAR'}
      titleSlot={
        <Box
          sx={{
          m:2
        }}
        >
          <Typography variant={'h4'}>{currentCourse.title}</Typography>
          <Typography variant={'body'}>{currentCourse.description}</Typography>
        </Box>
      }
      {...otherProps}
    />
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object,
  courses: PropTypes.arrayOf(CoursePropType),
}

export default PageCourse
