const parseOrderForm = (csv) => {
  let socks = csv.split(/\n/).map(item => item.split(','))
  socks.shift()
  let orderObj = {}
  socks.forEach(item => {
    let style = item[0].slice(0, 3)
    if (!orderObj[style]) {
      orderObj[style] = {}
    } else if (orderObj[style].desc !== item[1]) {
      if (/.*[Ll]adies/.test(item[1])) {
        style = item[0]
        if (!orderObj[style]) {
          orderObj[style] = {}
        }
      } else if (/.*[Ll]adies/.test(orderObj[style].desc)) {
        orderObj[item[0]] = orderObj[style]
        orderObj[style] = {}
      }
    }
    orderObj[style].styleID = item[0].charAt(4) === '5' ? item[0] : style
    orderObj[style].desc = item[1]
    orderObj[style].price = item[6]

    if (!orderObj[style].colours) orderObj[style].colours = []

    let ind = orderObj[style].colours.reduce((memo, val, index) => {
      return val.colourID === item[2] ? index : memo
    }, -1)

    if (ind === -1) {
      let colourObj = {
        colourID: item[2],
        colourName: item[3],
        patternID: item[4],
        patternName: item[5],
        small: false,
        regular: false,
        king: false,
        smallAmt: 0,
        regularAmt: 0,
        kingAmt: 0
      }
      if (item[0].charAt(4) === '5') colourObj.small = true
      if (item[0].charAt(4) === '7') colourObj.regular = true
      if (item[0].charAt(4) === '0') colourObj.king = true
      orderObj[style].colours.push(colourObj)
    } else {
      let colour = orderObj[style].colours[ind]
      if (item[0].charAt(4) === '5') colour.small = true
      if (item[0].charAt(4) === '7') colour.regular = true
      if (item[0].charAt(4) === '0') colour.king = true
    }
  })

  let orderForm = []
  for (let sock in orderObj) {
    orderForm.push(orderObj[sock])
  }

  orderForm = orderForm.sort((a, b) => {
    return a.styleID.slice(0, 3) > b.styleID.slice(0, 3) ? 1 : -1
  })
  orderForm.shift() // ? Get rid of empty result
  return orderForm
}

export default parseOrderForm

// StyleID 0
// ShortDesc 1
// ColourID 2
// ColourName 3
// PatternID 4
// PatternName 5
// WholesaleA 6
