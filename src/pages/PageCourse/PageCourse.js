import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import Ratio16x9 from '../../components/Ratio16x9'

export const PageCourse = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        '@media (max-width: 599.95px)':{
          overflow: 'auto',
        },
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        '@media (max-width: 599.95px)':{
          height: 'auto',
          flexDirection: 'column',
          minHeight: '100vh'
        },
      }}
      >
        <Box
          sx={{
          flexGrow: 1,
          display:'flex',
          flexDirection: 'column',
          '@media (max-width: 599.95px)':{
            flexGrow: 0,
          },
        }}
        >
          <Ratio16x9>
            <Box
              sx={{ 
            width: '100%',
            height: '100%',
            bgcolor:'#000'
          }}
            >
              <Outlet/>
            </Box>
          </Ratio16x9>
          <Box
            sx={{
            bgcolor:'pink',
            flexGrow: 1,
            overflowX:'hidden',
            overflowY:'scroll',
            '@media (max-width: 599.95px)':{
              overflow:'hidden'
            },
          }}
          >
            TITLE
          </Box>
        </Box>
        <Box
          sx={{
          width: '320px',
          height: '100%',
          bgcolor: 'red',
          overflowX:'hidden',
          overflowY:'scroll',
          '@media (max-width: 599.95px)':{
            height: 'auto',
            width: '100%',
            overflow: 'hidden',
            flexGrow: 1,
          },
        }}
        >
          SIDEBAR
        </Box>
      </Box>
    </Box>
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
