import React from 'react'
import PropTypes from 'prop-types'

import classes from './styles.module.css'
import AppBar from '../AppBar'
import Container from '../Container'

export const MainLayout = (props) => {
  const {
    className,
    contentAppBar,
    contentSearch,
    contentMain,
    ...otherProps
  } = props

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <AppBar>
        <Container>
          {contentAppBar}
        </Container>
      </AppBar>
      <div className={classes.wrapper}>
        <div className={classes.contentSearchWrapper}>
          <Container>
            {contentSearch}
          </Container>
        </div>
        <div className={classes.contentMainWrapper}>
          <Container>
            {contentMain}
          </Container>
        </div>
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  className: PropTypes.string,
  contentAppBar: PropTypes.node,
  contentSearch: PropTypes.node,
  contentMain: PropTypes.node
}

export default MainLayout
