import React from 'react'
import styles from './album.module.scss'

const albumBreadcrumb = ({ setLinkRedirect }) => (
  <div className={styles.breadcrumb}>
    <button id='backButton' className={styles.back} onClick={() => setLinkRedirect('/search')}>
      <svg viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16'
        ></path>
      </svg>
    </button>
  </div>
)

export default albumBreadcrumb
