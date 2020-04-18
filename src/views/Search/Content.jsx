import React from 'react'
import styles from './search.module.scss'

const openAlbum = (album, userStore, setLinkRedirect) => {
  const searchHistory = userStore.getSearchHistory()
  searchHistory.filter(item => item.id === album.id).length === 0 && searchHistory.push(album)
  userStore.setSearchHistory(searchHistory)
  setLinkRedirect(`album/${album.id}`)
}

const renderResultsSections = (albums, userStore, setLinkRedirect) => (
  <section className={styles.sectionArtists} aria-label='Busca'>
    <div className={styles.searchList}>
      {albums?.map(album => (
        <div id='album' key={album.id} onClick={() => openAlbum(album, userStore, setLinkRedirect)}>
          <div className={styles.searchItem}>
            <div className={styles.itemGrid}>
              <div className={styles.itemIMG}>
                <div className={styles.itemIMGLayer}>
                  <img className={styles.searchIMG} src={album?.images[0]?.url} alt={album.name} />
                </div>
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{album.name}</span>
                <div className={styles.itemType}>
                  <span>
                    {album.artists.map((artist, index) =>
                      index === 0 ? artist.name : ', ' + artist.name,
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.playButton}>
                <button className='_11f5fc88e3dec7bfec55f7f49d581d78-scss'>
                  <svg height='16' role='img' width='16' viewBox='0 0 24 24'>
                    <polygon
                      points='21.57 12 5.98 3 5.98 21 21.57 12'
                      fill='currentColor'
                    ></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const Content = ({ albums, userStore, setLinkRedirect, text }) => (
  <div className={styles.searchResult}>
    <div className={styles.searchTitle}>
      <h2 className={styles.resultTitleText}>{text}</h2>
    </div>

    {renderResultsSections(albums, userStore, setLinkRedirect)}
  </div>
)

export default Content
