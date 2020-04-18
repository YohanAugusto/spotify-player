/* eslint-disable no-unused-expressions */
import axios from 'axios'
import { getToken, handleNotAuthenticated } from 'utils'

const { REACT_APP_SPOTIFY_API } = process.env

const API = axios.create({
  baseURL: REACT_APP_SPOTIFY_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

const validateToken = () =>
  API.get(`me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(res => {
      if (res.status !== 200) throw res
      return res
    })
    .catch(error => {
      console.error(error)
      return false
    })

const doSearch = value =>
  API.get(`search?q=${encodeURIComponent(value)}&type=album,track`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(res => {
      if (res.status !== 200) throw res

      const albumList = []
      res.data?.tracks?.items.map(track => {
        albumList.filter(album => album.id === track?.album?.id).length === 0 &&
          albumList.push(track.album)
      })

      return albumList
    })
    .catch(error => {
      console.error(error)
      handleNotAuthenticated()
    })

const loadAlbumByID = id =>
  API.get(`albums/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
    .then(res => {
      if (res.status !== 200) throw res
      return res.data
    })
    .catch(error => {
      console.error(error)
      handleNotAuthenticated()
    })

export { doSearch, loadAlbumByID, validateToken }
