const getCookieLoggedName = () => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'DSV':
      return 'DSV_cookie'
    case 'HML':
      return 'HML_cookie'
    case 'PRD':
      return 'PRD_cookie'
    default:
      return 'DSV_cookie'
  }
}

const getToken = () => {
  const r = document.cookie.match(`\\b${getCookieLoggedName()}=([^;]*)\\b`)
  return r ? r[1] : undefined
}

const setToken = token => {
  const sharedCookieName = getCookieLoggedName()
  document.cookie = `${sharedCookieName}=${token};path=/;domain=localhost`
}

const clearToken = () => {
  const cookies = document.cookie.split(';')

  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=localhost`
  })
}

const handleNotAuthenticated = () => {
  clearToken()
  localStorage.clear()
  window.location.href = '/'
  return null
}

export { clearToken, getToken, handleNotAuthenticated, setToken }
