import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Search } from 'views'
import { mount } from 'enzyme'

describe('<Search />', () => {
  describe('before search', () => {
    it('renders without crashing', () => {
      const component = mount(<Search />)
      expect(component.find('#searchInput')).toHaveLength(1)
    })

    it('change input value without crashing', () => {
      const value = 'Martin Garrix'
      const component = mount(<Search />)
      expect(component.find('#searchInput')).toHaveLength(1)
      component.find('#searchInput').simulate('change', { target: { value: value } })
      expect(component.find('#searchInput').props().value).toBe('Martin Garrix')
    })
  })

  describe('search history', () => {
    const data = [
      {
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
        external_urls: { spotify: 'https://open.spotify.com/album/1FOJ5IXGXe8dl0cXvCU6wK' },
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
        name: 'In the Name of Love',
        release_date: '2016-07-29',
        release_date_precision: 'day',
        total_tracks: 1,
        type: 'album',
        uri: 'spotify:album:1FOJ5IXGXe8dl0cXvCU6wK',
      },
      {
        album_type: 'single',
        artists: [
          {
            external_urls: { spotify: 'https://open.spotify.com/artist/28uJnu5EsrGml2tBd7y8ts' },
            href: 'https://api.spotify.com/v1/artists/28uJnu5EsrGml2tBd7y8ts',
            id: '28uJnu5EsrGml2tBd7y8ts',
            name: 'Vintage Culture',
            type: 'artist',
            uri: 'spotify:artist:28uJnu5EsrGml2tBd7y8ts',
          },
          {
            external_urls: { spotify: 'https://open.spotify.com/artist/4Eoddnw0pOewmCHQYofuwh' },
            href: 'https://api.spotify.com/v1/artists/4Eoddnw0pOewmCHQYofuwh',
            id: '4Eoddnw0pOewmCHQYofuwh',
            name: 'Fancy Inc',
            type: 'artist',
            uri: 'spotify:artist:4Eoddnw0pOewmCHQYofuwh',
          },
        ],
        available_markets: ['AD', 'AE'],
        external_urls: { spotify: 'https://open.spotify.com/album/5Tm0ogxcLsBu8h17tyvFB1' },
        href: 'https://api.spotify.com/v1/albums/5Tm0ogxcLsBu8h17tyvFB1',
        id: '5Tm0ogxcLsBu8h17tyvFB1',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b27309490d9da9807383e5582c77',
            width: 640,
          },
          {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e0209490d9da9807383e5582c77',
            width: 300,
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d0000485109490d9da9807383e5582c77',
            width: 64,
          },
        ],
        name: 'In The Dark',
        release_date: '2019-10-25',
        release_date_precision: 'day',
        total_tracks: 1,
        type: 'album',
        uri: 'spotify:album:5Tm0ogxcLsBu8h17tyvFB1',
      },
    ]
    beforeAll(() => {
      localStorage.setItem('fusionSearchHistory', JSON.stringify(data))
    })

    it('load recent searches', () => {
      const component = mount(<Search />)
      expect(component.find('#searchInput')).toHaveLength(1)
      expect(component.find('h2')).toHaveLength(1)
      expect(component.find('h2').text()).toBe('Buscados recentemente')
      expect(component.find('#album')).toHaveLength(data.length)
    })

    it('reopen a searched album', () => {
      const component = mount(
        <Router>
          <Search />
        </Router>,
      )
      expect(component.find('#searchInput')).toHaveLength(1)
      expect(component.find('h2')).toHaveLength(1)
      expect(component.find('h2').text()).toBe('Buscados recentemente')
      expect(component.find('#album')).toHaveLength(data.length)
      component.find('#album').at(1).simulate('click')
      expect(component.find(Redirect).props().to).toBe('album/1FOJ5IXGXe8dl0cXvCU6wK')
    })
  })
})
