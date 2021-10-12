const getCookieLoggedName = () => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'DSV':
      return {name: 'DSV_cookie', domain: "localhost"}
    case 'HML':
      return {name: 'HML_cookie', domain: "spotify-player-three.vercel.app"}
    case 'PRD':
      return {name: 'PRD_cookie', domain: "spotify-player-three.vercel.app"}
    default:
      return {name: 'DSV_cookie', domain: "localhost"}
  }
}

const getToken = () => {
  const r = document.cookie.match(`\\b${getCookieLoggedName()?.name}=([^;]*)\\b`)
  return r ? r[1] : undefined
}

const setToken = token => {
  const sharedCookieName = getCookieLoggedName()
  document.cookie = `${sharedCookieName?.name}=${token};path=/;domain=${sharedCookieName?.domain}`
}

const clearToken = () => {
  const cookies = document.cookie.split(';')
  const sharedCookieName = getCookieLoggedName()

  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${sharedCookieName?.domain}`
  })
}

const handleNotAuthenticated = () => {
  clearToken()
  localStorage.clear()
  window.location.href = '/'
  return null
}

export { clearToken, getToken, handleNotAuthenticated, setToken }
