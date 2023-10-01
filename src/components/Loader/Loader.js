import React from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner'

import classes from './styles.module.css'

export const FullPageLoader = (props) => {
  return (

    <Spinner
      className={classes.spinner}
    />

  )
}

FullPageLoader.propTypes = {
  className: PropTypes.string
}

export default FullPageLoader
