export const parseOrderForm = (csv) => {
  let socks = csv.split(/\n/).map(item => item.split(','))
  socks.shift()
  let orderObj = {}
  socks.forEach(item => {
    item[1] = fixTrademark(item[1])
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
    orderObj[style].price = Number(item[6])
    orderObj[style].totalAmt = 0

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

const fixTrademark = (s) => {
  if (s) {
    const re = /�/g
    return s.replace(re, '\xAE')
  }
  return s
}

export const parseStoreGeo = (csv) => {
  let rows = csv.split(/\r\n/).map(item => item.split(','))
  rows.shift()
  return rows.map(store => {
    let storeObj = {
      custCode: store[0],
      name: store[1],
      street: store[2],
      suburb: store[3],
      state: store[4],
      postcode: store[5].slice(0, 4)
    }
    return storeObj
  })
}

export const parseCustomers = (csv) => {
  let rows = csv.split(/\r\n/)
  rows.shift()
  return rows.filter(c => c.customerid !== '').map(c => {
    return {
      name: c.substring(c.indexOf(',') + 1, c.lastIndexOf(',')),
      password: c.substring(0, 6),
      customerid: c.substring(0, 6),
      email: c.substring(c.lastIndexOf(',') + 1)
    }
  })
}
