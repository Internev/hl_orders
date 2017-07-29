import React from 'react'
import {shallow} from 'enzyme'
import Sock from '../components/Sock'

describe('Sock Display Component', () => {
  const colour1 = {colourID: '74', colourName: 'ANTELOPE', patternID: '0', patternName: 'NONE', '01C05': 0, '01C07': 0, '01C10': 0}
  const colour2 = {colourID: '66', colourName: 'DENIM', patternID: '0', patternName: 'NONE', '01C05': 0, '01C07': 0, '01C10': 0}
  const socky = {styleID: '01C', desc: 'Alpaca Health Sock®', price: 13.75, totalAmt: 0, colours: [colour1, colour2], sizes: ['01C05', '01C07', '01C10']}
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Sock sock={socky} handleFormSubmit={()=>{}} />
    )
  })

  it('should render', () => {
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('should have 2 colours (and header row)', () => {
    expect(wrapper.find('tbody > tr').map(i => i.html())).toMatchSnapshot()
  })

  it('should render the colour names', () => {
    socky.colours.forEach(colour => {
      expect(
        wrapper.containsMatchingElement(
          <td>{colour.colourName}</td>
        )
      ).toBe(true)
    })
  })
})
