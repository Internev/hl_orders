test('makes the test runner shut up about this file', () => {
  expect(1).toBe(1)
})

class LocalStorageMock {
  constructor () {
    this.store = {}
  }

  clear () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key] || null
  }

  setItem (key, value) {
    this.store[key] = value
  }

  removeItem (key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock
