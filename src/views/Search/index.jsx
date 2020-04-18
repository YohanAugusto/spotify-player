/* eslint-disable no-unused-expressions */
import React, { useState, useContext } from 'react'
import { doSearch } from 'utils'
import { Redirect } from 'react-router-dom'
import RenderContent from './Content'
import UserContext from 'stores/UserStore'
import styles from './search.module.scss'

const MAX_RECENT_SEARCHES_ITEMS = 15

const submitSearch = async (value, setAlbums, event) => {
  event?.preventDefault()
  const albums = await doSearch(value)
  setAlbums(albums)
}

const renderInput = (search, setSearch, setAlbums) => (
  <>
    <form onSubmit={e => submitSearch(search, setAlbums, e)}>
      <label className={styles.inputBox}>
        <input
          autoComplete='off'
          type='search'
          value={search || ''}
          id='searchInput'
          name='search'
          maxLength='80'
          placeholder='Busque por álbums, artistas ou músicas'
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <div className={styles.searchIcon}>
        <span>
          <svg height='24' role='img' width='24' viewBox='0 0 512 512' aria-hidden='true'>
            <path
              d='M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z'
              fill='currentColor'
            ></path>
          </svg>
        </span>
      </div>
    </form>
  </>
)

const Dashboard = () => {
  const userStore = useContext(UserContext)
  const [search, setSearch] = useState(null)
  const [albums, setAlbums] = useState(null)
  const [linkRedirect, setLinkRedirect] = useState(false)

  const searchHistory = userStore.getSearchHistory()

  const renderRedirect = () => {
    if (linkRedirect) {
      return <Redirect to={linkRedirect} />
    }
  }

  return (
    <>
      {renderRedirect()}

      {renderInput(search, setSearch, setAlbums)}
      {!albums ? (
        searchHistory?.length > 0 && (
          <RenderContent
            albums={searchHistory.slice(0, MAX_RECENT_SEARCHES_ITEMS)}
            userStore={userStore}
            setLinkRedirect={setLinkRedirect}
            text='Buscados recentemente'
          />
        )
      ) : (
        <RenderContent
          albums={albums}
          userStore={userStore}
          setLinkRedirect={setLinkRedirect}
          text={`Resultados para ${search}`}
        />
      )}
    </>
  )
}

export default Dashboard
