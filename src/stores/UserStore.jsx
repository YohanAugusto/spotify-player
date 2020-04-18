import { createContext } from 'react'

export class UserStore {
  id = null
  name = null
  email = null
  image = null
  searchHistory = null
  lastAlbum = null

  updateUser = userData => {
    this.id = userData.id
    this.name = userData.display_name
    this.email = userData.email
    this.image = userData.images[0].url
  }

  setLastAlbum = data => {
    this.lastAlbum = data
    localStorage.setItem('lastAlbum', JSON.stringify(data))
  }

  getLastAlbum = () => {
    const _lastAlbum = this.lastAlbum || JSON.parse(localStorage.getItem('lastAlbum'))

    const _lastAlbumSorted = []

    if (!_lastAlbum) {
      return null
    }

    for (let index = _lastAlbum.length; index > 0; index--) {
      _lastAlbumSorted.push(_lastAlbum[index - 1])
    }

    return _lastAlbumSorted
  }

  setSearchHistory = data => {
    this.searchHistory = data
    localStorage.setItem('fusionSearchHistory', JSON.stringify(data))
  }

  getSearchHistory = () => {
    const _searchHistory =
      this.searchHistory || JSON.parse(localStorage.getItem('fusionSearchHistory'))
    const _searchHistorySorted = []

    if (!_searchHistory) {
      return []
    }

    for (let index = _searchHistory.length; index > 0; index--) {
      _searchHistorySorted.push(_searchHistory[index - 1])
    }

    return _searchHistorySorted
  }

  checkStorage = (field, key) => {
    if (!field) {
      const storage = sessionStorage.getItem(key)
      if (storage) {
        return JSON.parse(storage)
      }
    }
    return field
  }

  clear = () => {
    localStorage.clear()
    this.name = null
    this.email = null
    this.id = null
    this.image = null
    this.searchHistory = null
    this.lastAlbum = null
  }
}

export default createContext(new UserStore())
