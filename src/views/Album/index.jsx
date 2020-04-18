/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import UserContext from 'stores/UserStore'
import { loadAlbumByID, tooglePlayer, resetPlayerState } from 'utils'
import RenderAlbumInfo from './albumInfo'
import RenderTracklist from './albumTrackList'
import RenderBreadcrumb from './albumBreadcrumb'

const createPlayers = (albumStorage, setPlayers) => {
  albumStorage?.tracks?.items.map(track =>
    setPlayers(currentSongs => [
      ...currentSongs,
      {
        url: track.preview_url,
        playing: false,
      },
    ]),
  )
}

const createSource = (albumStorage, setSources) => {
  albumStorage?.tracks?.items.map(track =>
    setSources(currentSongs => [
      ...currentSongs,
      {
        url: track.preview_url,
        audio: new Audio(track.preview_url),
      },
    ]),
  )
}

const Album = props => {
  const userStore = useContext(UserContext)
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [linkRedirect, setLinkRedirect] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [sources, setSources] = useState([])
  const [players, setPlayers] = useState([])

  const lastAlbum = userStore.getLastAlbum()

  const albumID = props?.match?.params?.id

  useEffect(() => {
    const handleDatas = data => {
      userStore.setLastAlbum(data)
      createPlayers(data, setPlayers)
      createSource(data, setSources)
      setCurrentAlbum(data)
    }

    const loadAlbum = async () => {
      const loadedAlbum = await loadAlbumByID(albumID)
      handleDatas(loadedAlbum)
    }

    if (firstLoad) {
      lastAlbum?.id === albumID ? handleDatas(lastAlbum) : loadAlbum()
      setFirstLoad(false)
    }
  }, [firstLoad, albumID, currentAlbum, lastAlbum, userStore])

  useEffect(() => {
    tooglePlayer(sources, players)
  }, [sources, players])

  useEffect(() => {
    resetPlayerState(sources, setPlayers, players)
    return () => {
      resetPlayerState(sources, setPlayers, players)
    }
  }, [sources, setPlayers, players])

  const handlePlay = (targetIndex, event = null) => {
    event?.preventDefault()

    if (!event || event.keyCode === 32) {
      const newPlayers = [...players]
      const currentIndex = players.findIndex(p => p.playing === true)
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        newPlayers[currentIndex].playing = false
        newPlayers[targetIndex].playing = true
      } else if (currentIndex !== -1) {
        newPlayers[targetIndex].playing = false
      } else {
        newPlayers[targetIndex].playing = true
      }
      setPlayers(newPlayers)
    }
  }

  const stopAll = targetIndex => {
    const newPlayers = [...players]
    newPlayers[targetIndex].playing = false
    setPlayers(newPlayers)
  }

  const renderRedirect = () => {
    if (linkRedirect) {
      if (players.filter(player => player.playing === true).length > 0) {
        players.map((player, index) => stopAll(index))
      } else {
        return <Redirect to={linkRedirect} />
      }
    }
  }

  if (!currentAlbum) {
    return null
  }

  return (
    <div>
      {renderRedirect()}
      {<RenderBreadcrumb setLinkRedirect={setLinkRedirect} />}
      {<RenderAlbumInfo currentAlbum={currentAlbum} />}
      {<RenderTracklist currentAlbum={currentAlbum} players={players} handlePlay={handlePlay} />}
    </div>
  )
}

export default Album
