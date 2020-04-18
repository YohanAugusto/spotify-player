/* eslint-disable no-unused-expressions */
const convertMusicTime = millis => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

const resetPlayerState = (sources, setPlayers, players) =>
  sources.forEach((source, i) => {
    source.audio.addEventListener('ended', () => {
      const newPlayers = [...players]
      if (newPlayers[i]) {
        newPlayers[i].playing = false
      }
      setPlayers(newPlayers)
    })
  })

const tooglePlayer = (sources, players) =>
  sources.forEach((source, i) => {
    players[i]?.playing ? source?.audio?.play() : source?.audio?.pause()
  })

export { convertMusicTime, resetPlayerState, tooglePlayer }
