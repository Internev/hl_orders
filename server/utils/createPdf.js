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
  let doc = printer.createPdfKitDocument({content: generatePdfText(order, user, totalAmt, agent)})

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
  return `<b>Hi am I bold?</b>
          <i>Is this the same line?</i>
          this should be a new line.`
}

module.exports.createPdfBinary = createPdfBinary
