import React from 'react'
import styles from './album.module.scss'

const AlbumInfo = ({ currentAlbum }) => (
  <div className={styles.containerLeft}>
    <header className={styles.TrackListHeader}>
      <div className={styles.mediaObject}>
        <div className={styles.menuWrapper}>
          <div id='albumImage' className={styles.coverArt}>
            <div
              className={styles.coverArtImage}
              style={{ backgroundImage: `url(${currentAlbum?.images[0].url})` }}
            ></div>
          </div>
        </div>
        <div className={styles.moInfo}>
          <div className={styles.menuWrapper}>
            <div id='albumName' className={styles.moInfoName} title={currentAlbum?.name}>
              <span>{currentAlbum?.name}</span>
            </div>
          </div>
        </div>
        <button className={styles.artistNameLink}>
          {currentAlbum?.artists.map((artist, index) =>
            index === 0 ? artist.name : ', ' + artist.name,
          )}
        </button>
        <div className={styles.moInfo}>
          <div className={styles.albumInfo}>
            <span>
              {currentAlbum?.release_date.slice(0, 4)} • {currentAlbum?.total_tracks} MÚSICAS
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>
)

export default AlbumInfo
