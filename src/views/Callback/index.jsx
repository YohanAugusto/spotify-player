import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { setToken } from 'utils'

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
    if (item) {
      const parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial
  }, {})

window.location.hash = ''

const Home = () => {
  const [linkToRedirect, setLinkToRedirect] = useState(null)

  useEffect(() => {
    let _token = hash.access_token
    if (_token) {
      setToken(_token)
      localStorage.clear()
      setLinkToRedirect('/search')
    } else {
      setLinkToRedirect('/')
    }
  }, [])

  if (linkToRedirect) {
    return <Redirect to={linkToRedirect} />
  }

  return null
}

export default Home
