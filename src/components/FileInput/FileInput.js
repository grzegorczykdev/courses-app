import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'

export const FileInput = (props) => {
  const {
    className,
    children,
    onChange,
    ...otherProps
  } = props

  return (
    <label
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      {children}
      <input
        onChange={onChange}
        className={classes.input}
        type={"file"}
        {...otherProps}
      />
    </label>
  )
}

FileInput.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  onChange: PropTypes.func
}

export default FileInput
