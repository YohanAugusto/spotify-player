import PropTypes from 'prop-types'
import React from 'react'

import mainLogo from 'images/logo.png'

import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <img className={styles.logo} src={mainLogo} alt='logo' />
      <div className={styles.content}>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
