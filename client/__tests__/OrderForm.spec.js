import React from 'react'
import {shallow} from 'enzyme'
import orderFormData from '../../coverage/orderForm.json'
import OrderForm from '../components/OrderForm'

describe('OrderForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <OrderForm order={orderFormData} />
    )
  })

  it('should render', () => {
    expect(wrapper.find('#filterSocks').exists()).toBe(true)
  })
})
