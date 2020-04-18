import React from 'react'
import { convertMusicTime } from 'utils'
import styles from './album.module.scss'

const AlbumTrackList = ({ currentAlbum, players, handlePlay }) => (
  <div className={styles.containerRight}>
    <section className={styles.tracklistContainer}>
      <ol className={styles.tracklist}>
        {currentAlbum?.tracks?.items.map((track, index) => (
          <div key={track.id} className={styles.menuWrapper}>
            <li
              tabIndex='0'
              id='albumTrack'
              className={styles.tracklistRow}
              role='button'
              onClick={() => handlePlay(index)}
              onKeyDown={e => handlePlay(index, e)}
            >
              <div className={styles.tracklistCol}>
                <div className={styles.tracklistTopAlignCol}>
                  <svg className='icon-play' viewBox='0 0 85 100'>
                    <path
                      fill='currentColor'
                      d='M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z'
                    >
                      <title>PLAY</title>
                    </path>
                  </svg>
                </div>
                <div className={styles.tracklistTopAlign}>
                  <span
                    id='playerIcon'
                    className={styles.spotIconTrack}
                    style={players[index]?.playing ? { color: '#1ed760' } : {}}
                  >
                    {players[index]?.playing ? '♫' : '▷'}
                  </span>
                </div>
              </div>
              <div className={styles.tracklistColName}>
                <div className={styles.tracklistTopAlign}>
                  <div
                    className={styles.tracklistName}
                    style={players[index]?.playing ? { color: '#1ed760' } : {}}
                  >
                    {track.name}
                  </div>
                  <div className={styles.secondLine}>
                    {track.explicit && <span className={styles.explicitLabel}>Explicit</span>}
                    <span className={styles.ellipsisOneLine}>
                      <span className={styles.menuWrapper}>
                        <span>
                          <button className={styles.artistNameLink}>
                            {track?.artists.map((artist, index) =>
                              index === 0 ? artist.name : ', ' + artist.name,
                            )}
                          </button>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.tracklistColDuration}>
                <div className={styles.tracklistDuration}>
                  <span style={players[index]?.playing ? { color: '#1ed760' } : {}}>
                    {convertMusicTime(track.duration_ms)}
                  </span>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ol>
    </section>
  </div>
)

export default AlbumTrackList
