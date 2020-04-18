import React, { useEffect, useState, useContext } from 'react'
import { validateToken, getToken, isMobile } from 'utils'
import { Redirect } from 'react-router-dom'
import UserContext from 'stores/UserStore'
import styles from './index.module.scss'

const {
  REACT_APP_SPOTIFY_AUTHORIZE,
  REACT_APP_SPOTIFY_CLIENT_ID,
  REACT_APP_SPOTIFY_REDIRECT_URL,
  REACT_APP_SPOTIFY_SCOPES,
} = process.env

const login = () => {
  return `${REACT_APP_SPOTIFY_AUTHORIZE}?response_type=token&client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REACT_APP_SPOTIFY_REDIRECT_URL,
  )}&scope=${encodeURIComponent(REACT_APP_SPOTIFY_SCOPES) || ''}`
}

const Home = () => {
  const userStore = useContext(UserContext)
  const [linkRedirect, setLinkRedirect] = useState(false)

  useEffect(() => {
    userStore.clear()

    const checkToken = async () => {
      const token = await validateToken()

      if (token) {
        userStore.updateUser(token.data)
        setLinkRedirect(true)
      }
    }

    if (getToken()) {
      checkToken()
    }
  }, [userStore])

  if (linkRedirect) {
    return <Redirect to={'/search'} />
  }

  return (
    <>
      <div className={styles.login}>
        <a id='buttonLogin' className={styles.loginButton} href={login()}>
          {isMobile ? 'Login' : 'Acesse sua conta'}
        </a>
      </div>
    </>
  )
}

export default Home
