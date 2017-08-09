const PdfPrinter = require('pdfmake/src/printer')
const path = require('path')

function createPdfBinary (order, user, totalAmt, agent) {
  const fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
  }
  const printer = new PdfPrinter(fontDescriptors)
  let doc = printer.createPdfKitDocument(generatePdfText(order, user, totalAmt, agent))

  let chunks = []
  let result

  return new Promise((resolve, reject) => {
    doc.on('data', chunk => {
      chunks.push(chunk)
    })
    doc.on('end', () => {
      result = Buffer.concat(chunks)
      resolve(result.toString('base64'))
    })
    doc.end()
  })
}

function generatePdfText (order, user, totalAmt, agent) {
  const padToFive = number => number <= 99999 ? ('0000' + number).slice(-5) : number
  let webOrderNumber = 'A' + padToFive(order.id)
  let content = []
  agent
    ? content.push(`Agent ${agent.customerid} has made an order on behalf of ${user.customerid}.`)
    : content.push(`${user.customerid} has made a new order.`)
  content.push(`Humphrey Law order number: ${webOrderNumber}.`)
  content.push({text: `Total Price: $${(order.totalprice / 100).toFixed(2)}`, bold: true})
  content.push({text: `Total Qty: ${order.totalamt}`, bold: true})

  content.push({text: `\nShipping to:`, bold: true})
  order.addinfo.deliveryAddress.split(/[,\n]/g)
    .map(line => `${line}`)
    .forEach(line => content.push(line))

  content.push({text: `Customer Details:`, bold: true})
  content.push(`ID: ${user.customerid}`)
  content.push(`Customer: ${user.name}`)
  content.push(`Email: ${user.email}`)

  if (Object.keys(order.addinfo).length) {
    content.push(`\nAdditional Information provided by customer:`)
    for (let info in order.addinfo) {
      content.push({text: [
        {text: `${info}:`, bold: true},
        ` ${order.addinfo[info]}`]
      })
    }
  }
  content.push(`\nThe order is:`)

  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
      content.push(`${sock.styleID} - ${sock.desc}`)
      let body = []
      let header = ['Colour', 'Pattern']
      sock.sizes.forEach(size => {
        header.push(size)
      })
      header.push('Unit Price exGST')
      header.push('Total exGST')
      body.push(header)
      sock.colours
        .filter(colour => {
          return sock.sizes.some(size => {
            if (colour.hasOwnProperty(size)) {
              return colour[size] > 0
            }
            return false
          })
        })
        .forEach(colour => {
          let row = []
          row.push(`${colour.colourID}: ${colour.colourName}`)
          colour.patternID > 0
            ? row.push(`${colour.patternID}: ${colour.patternName}`)
            : row.push(` `)

          sock.sizes.forEach(size => {
            if (colour.hasOwnProperty(size) && colour[size] > 0) {
              row.push(`${colour[size]}`)
            } else {
              row.push(`0`)
            }
          })

          row.push(`$${sock.price.toFixed(2)}`)
          row.push(`$${(
            sock.sizes.reduce((memo, size) => {
              if (colour.hasOwnProperty(size)) memo += colour[size]
              return memo
            }, 0) * sock.price).toFixed(2)}`)
          body.push(row)
        })
      let subTotal = []
      subTotal.push('Subtotal:', ' ')
      sock.sizes.forEach(size => (
        subTotal.push(sock.colours.reduce((memo, colour) => {
          if (colour.hasOwnProperty(size)) memo += colour[size]
          return memo
        }, 0).toString())
      ))
      subTotal.push(` `, `$${(sock.totalAmt * sock.price).toFixed(2)}`)
      body.push(subTotal)
      content.push({
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          body
        }
      })
    })

  return {
    content,
    defaultStyle: {
      fontSize: 9
    }
  }
}

module.exports.createPdfBinary = createPdfBinary
