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
        ...sx
      }}
      {...otherProps}
    >
      PageCourse
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
    </Box>
  )
}

PageCourse.propTypes = {
  sx: PropTypes.object
}

export default PageCourse
