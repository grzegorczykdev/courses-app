import React from 'react'
import PropTypes from 'prop-types'

import CourseLayout from '../../layouts/CourseLayout/CourseLayout'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { CoursePropType } from '../../components/CourseCard'
import {Videocam} from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Tooltip } from '@mui/material'



export const PageCourse = (props) => {
  const {
    sx,
    courses,
    lessons,
    fetchLessonsByIds,
    ...otherProps
  } = props

  const navigate = useNavigate()

  const {courseId} = useParams()

  const currentCourse = courses && courses.find((course)=>{
    return course.id === courseId
  })

  const {lessons: lessonsIds} = currentCourse

  React.useEffect(()=>{
    console.log(lessonsIds)
    if(!lessonsIds) return
    fetchLessonsByIds(lessonsIds)
  }, [fetchLessonsByIds, lessonsIds])

console.log(lessons)

  return (
    <CourseLayout
      contentSlot={
        <Box
          sx={{ 
            width: '100%',
            height: '100%',
            bgcolor:'#000',
            color: 'white'
          }}
        >
          <Outlet/>
        </Box>}
      sidebarSlot={

        <List>
          {
        lessons && lessons.map((lesson, i)=>(
          <ListItem
            key={lesson.id}
            disablePadding
          >
            <Tooltip 
              title={lesson.title}
              enterDelay={500}
            >
              <ListItemButton
                onClick={()=>navigate(lesson.id)}
              >
                <ListItemIcon>
                  <Videocam/>
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                noWrap:true
              }}
                >
                  {`${i+1} . ${lesson.title}`}
                </ListItemText>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        )
        )
        }
        </List>

      }
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

const LessonsPropType = PropTypes.shape({
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired

PageCourse.propTypes = {
  sx: PropTypes.object,
  fetchLessonsByIds: PropTypes.func,
  lessons: PropTypes.arrayOf(LessonsPropType),
  courses: PropTypes.arrayOf(CoursePropType),
}

export default PageCourse
