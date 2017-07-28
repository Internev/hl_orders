const utils = require('../utils/utils')

const exampleCSV = `StyleID,ShortDesc,ColourID,ColourName,PatternID,PatternName,WholesaleA
01C05,Alpaca Health Sock®,18,CHOCOLATE,0,NONE,13.75
01C05,Alpaca Health Sock®,66,DENIM,0,NONE,13.75
01C05,Alpaca Health Sock®,74,ANTELOPE,0,NONE,13.75
03C05,Merino Alpaca Blend Health Sock®,9,BLACK,0,NONE,10.95
03C05,Merino Alpaca Blend Health Sock®,19,BLACK BROWN,0,NONE,10.95
`
describe('parseOrderForm', () => {
  test('returns object', () => {
    const result = utils.parseOrderForm(exampleCSV)
    expect(typeof result).toBe('object')
  })


  test('returns correct number of results', () => {
    const result = utils.parseOrderForm(exampleCSV)
    expect(result.length).toBe(2)
  })

  test('correctly nests colors', () => {
    const result = utils.parseOrderForm(exampleCSV)
    expect(result[0].colours.length).toBe(3)
    expect(result[0].colours[0].colourName).toBe('CHOCOLATE')
  })
})
