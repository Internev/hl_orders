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
  let content = []
  content.push(`Hi, I'm line one.`)
  content.push({text: `This is bold?`, bold: true})
  content.push({text: `Third line, italics!`, italics: true})
  content.push({text: [
    'Regular text',
    {text: 'Background Colour!', background: 'purple'},
    {text: 'Wavy Gravy?', decoration: 'underline', decorationStyle: 'wavy'}
  ]})
  return {content}
}

module.exports.createPdfBinary = createPdfBinary
