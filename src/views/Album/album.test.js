import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Album } from 'views'
import { mount } from 'enzyme'
import UserContext, { UserStore } from 'stores/UserStore'

describe('<Album />', () => {
  describe('without album info', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div')
      ReactDOM.render(<Album />, div)
      ReactDOM.unmountComponentAtNode(div)
    })
  })

  describe('loading album info', () => {
    const match = { params: { id: '1FOJ5IXGXe8dl0cXvCU6wK' } }
    const data = {
      album_type: 'single',
      artists: [
        {
          external_urls: { spotify: 'https://open.spotify.com/artist/60d24wfXkVzDSfLS6hyCjZ' },
          href: 'https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ',
          id: '60d24wfXkVzDSfLS6hyCjZ',
          name: 'Martin Garrix',
          type: 'artist',
          uri: 'spotify:artist:60d24wfXkVzDSfLS6hyCjZ',
        },
        {
          external_urls: { spotify: 'https://open.spotify.com/artist/64M6ah0SkkRsnPGtGiRAbb' },
          href: 'https://api.spotify.com/v1/artists/64M6ah0SkkRsnPGtGiRAbb',
          id: '64M6ah0SkkRsnPGtGiRAbb',
          name: 'Bebe Rexha',
          type: 'artist',
          uri: 'spotify:artist:64M6ah0SkkRsnPGtGiRAbb',
        },
      ],
      available_markets: ['AD', 'AE'],
      copyrights: [
        {
          text:
            '(P) 2016 STMPD RCRDS B.V. exclusively licensed to Epic Amsterdam, a divison of Sony Music Entertainment Netherlands B.V.',
          type: 'P',
        },
      ],
      external_ids: { upc: '886446028088' },
      external_urls: { spotify: 'https://open.spotify.com/album/1FOJ5IXGXe8dl0cXvCU6wK' },
      genres: [],
      href: 'https://api.spotify.com/v1/albums/1FOJ5IXGXe8dl0cXvCU6wK',
      id: '1FOJ5IXGXe8dl0cXvCU6wK',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2738c77bcf5f5a227d270d23370',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e028c77bcf5f5a227d270d23370',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048518c77bcf5f5a227d270d23370',
          width: 64,
        },
      ],
      label: 'Epic Amsterdam',
      name: 'In the Name of Love',
      popularity: 70,
      release_date: '2016-07-29',
      release_date_precision: 'day',
      total_tracks: 1,
      tracks: {
        href: 'https://api.spotify.com/v1/albums/1FOJ5IXGXe8dl0cXvCU6wK/tracks?offset=0&limit=50',
        items: [
          {
            artists: [
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/60d24wfXkVzDSfLS6hyCjZ',
                },
                href: 'https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ',
                id: '60d24wfXkVzDSfLS6hyCjZ',
                name: 'Martin Garrix',
                type: 'artist',
                uri: 'spotify:artist:60d24wfXkVzDSfLS6hyCjZ',
              },
              {
                external_urls: {
                  spotify: 'https://open.spotify.com/artist/64M6ah0SkkRsnPGtGiRAbb',
                },
                href: 'https://api.spotify.com/v1/artists/64M6ah0SkkRsnPGtGiRAbb',
                id: '64M6ah0SkkRsnPGtGiRAbb',
                name: 'Bebe Rexha',
                type: 'artist',
                uri: 'spotify:artist:64M6ah0SkkRsnPGtGiRAbb',
              },
            ],
            available_markets: ['AD'],
            disc_number: 1,
            duration_ms: 195706,
            explicit: false,
            external_urls: { spotify: 'https://open.spotify.com/track/23L5CiUhw2jV1OIMwthR3S' },
            href: 'https://api.spotify.com/v1/tracks/23L5CiUhw2jV1OIMwthR3S',
            id: '23L5CiUhw2jV1OIMwthR3S',
            is_local: false,
            name: 'In the Name of Love',
            preview_url:
              'https://p.scdn.co/mp3-preview/cbd166d86a2d5a52930dd5fe509c1f2806aeab11?cid=bdd3b5055bb44a3f9a7cfaca8ff73f4f',
            track_number: 1,
            type: 'track',
            uri: 'spotify:track:23L5CiUhw2jV1OIMwthR3S',
          },
        ],
        limit: 50,
        next: null,
        offset: 0,
        previous: null,
        total: 1,
      },
      type: 'album',
      uri: 'spotify:album:1FOJ5IXGXe8dl0cXvCU6wK',
    }

    const mockUserStore = () => {
      const userStore = new UserStore()
      userStore.getLastAlbum = () => data
      return userStore
    }

    const userStore = mockUserStore()

    it('renders without crashing', async () => {
      const component = mount(
        <Router>
          <UserContext.Provider value={userStore}>
            <Album match={match} />
          </UserContext.Provider>
        </Router>,
      )

      expect(component.find('#albumImage')).toHaveLength(1)
      expect(component.find('#albumName')).toHaveLength(1)
      expect(component.find('#albumName').text()).toBe('In the Name of Love')
      expect(component.find('#albumTrack')).toHaveLength(1)
    })

    it('play/pause button', () => {
      const component = mount(
        <Router>
          <UserContext.Provider value={userStore}>
            <Album match={match} />
          </UserContext.Provider>
        </Router>,
      )
      expect(component.find('#albumTrack')).toHaveLength(1)
      expect(component.find('#playerIcon').text()).toBe('▷')
      component.find('#albumTrack').simulate('click')
      expect(component.find('#playerIcon').text()).toBe('♫')
      component.find('#albumTrack').simulate('click')
      expect(component.find('#playerIcon').text()).toBe('▷')
    })

    it('back button', () => {
      const component = mount(
        <Router>
          <UserContext.Provider value={userStore}>
            <Album match={match} />
          </UserContext.Provider>
        </Router>,
      )
      expect(component.find('#backButton')).toHaveLength(1)
      component.find('#backButton').simulate('click')
      expect(component.find(Redirect).props().to).toBe('/search')
    })
  })
})
