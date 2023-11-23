import React from 'react'
import PropTypes from 'prop-types'
import { useTheme, Box } from '@mui/material'

import Ratio16x9 from '../../components/Ratio16x9'

export const CourseLayout = (props) => {
  const {
    sx,
    contentSlot,
    sidebarSlot,
    titleSlot,
    ...otherProps
  } = props

  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]:{
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
        [theme.breakpoints.down('sm')]:{
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
          [theme.breakpoints.down('sm')]:{
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
              {contentSlot}
            </Box>
          </Ratio16x9>
          <Box
            sx={{
            bgcolor:'pink',
            flexGrow: 1,
            overflowX:'hidden',
            overflowY:'auto',
            [theme.breakpoints.down('sm')]:{
              overflow:'hidden'
            },
          }}
          >
            {titleSlot}
          </Box>
        </Box>
        <Box
          sx={{
          width: '320px',
          height: '100%',
          overflowX:'hidden',
          overflowY:'auto',
          [theme.breakpoints.down('sm')]:{
            height: 'auto',
            width: '100%',
            overflow: 'hidden',
            flexGrow: 1,
          },
        }}
        >
          <Box
            sx={{
          width:'100%',
          bgcolor: 'gray'
        }}
          >
            {sidebarSlot}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

CourseLayout.propTypes = {
  sx: PropTypes.object,
  contentSlot: PropTypes.node,
  sidebarSlot: PropTypes.node,
  titleSlot: PropTypes.node,
}

export default CourseLayout
