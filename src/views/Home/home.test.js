import React from 'react'
import { Home } from 'views'
import { mount } from 'enzyme'

describe('<Home />', () => {
  it('renders without crashing', () => {
    const component = mount(<Home />)
    expect(component.find('#buttonLogin')).toHaveLength(1)
  })

  it('change input value without crashing', () => {
    const component = mount(<Home />)
    expect(component.find('#buttonLogin')).toHaveLength(1)
    expect(component.find('#buttonLogin').text()).toBe('Login')
  })
})
