import React from 'react'
import {shallow} from 'enzyme'
import orderFormData from '../../coverage/orderForm.json'
import OrderForm from '../components/OrderForm'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockState = {
  addinfo: {},
  form: [],
  totalAmt: 0,
  totalPrice: 0,
  processing: false,
  complete: false,
  display: [],
  history: [],
  msg: '',
  searchTerm: ''
}

describe('OrderForm', () => {
  let wrapper

  beforeEach(() => {
    const store = mockStore({order: mockState})

    wrapper = shallow(
      <OrderForm store={store} />
    )
  })

  it('should render', () => {
    console.log(wrapper.html())
    expect(wrapper.find('#filterSocks').exists()).toBe(true)
  })
})
