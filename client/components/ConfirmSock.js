import React from 'react'

const ConfirmSock = ({sock}) => (
  <div key={sock.styleID}>
    <h3>{sock.styleID} - {sock.desc}</h3>

    <table width='100%' key={sock.styleID} style={{ borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <th width='15%'>Colour</th>
          <th width='15%'>Pattern</th>
          {sock.sizes.map(size => (
            <th key={size}>{size}</th>
          ))}
          <th width='15%'>Unit Price</th>
          <th width='15%'>Total</th>
        </tr>
        {sock.colours
          .filter(colour => {
            return sock.sizes.some(size => {
              if (colour.hasOwnProperty(size)) {
                return colour[size] > 0
              }
              return false
            })
          })
          .map(colour => (
            <tr key={colour.colourID}>
              <td style={{ textAlign: 'center' }}>{colour.colourID}: {colour.colourName}</td>
              <td style={{ textAlign: 'center' }}>{colour.patternID > 0
                  ? colour.patternID + ': ' + colour.patternName
                  : ''}</td>
              {sock.sizes.map(size => (
              colour.hasOwnProperty(size)
              ? <td key={size} style={{ textAlign: 'center' }}>{colour[size]}</td>
              : <td key={size} />
              ))}
              <td style={{ textAlign: 'center' }}>${sock.price.toFixed(2)}</td>
              <td style={{ textAlign: 'center' }}>
                ${(
                  sock.sizes.reduce((memo, size) => {
                    if (colour.hasOwnProperty(size)) memo += colour[size]
                    return memo
                  }, 0) * sock.price).toFixed(2)}
              </td>
            </tr>
        ))}
        <tr>
          <td style={{ borderTop: '1px solid grey' }}>Subtotal:</td>
          <td  style={{ borderTop: '1px solid grey' }} />
          {sock.sizes.map(size => (
            <td key={size} style={{ textAlign: 'center', borderTop: '1px solid grey' }}>{sock.colours.reduce((memo, colour) => {
              if (colour.hasOwnProperty(size)) memo += colour[size]
              return memo
            }, 0)}</td>
          ))}
          <td style={{ textAlign: 'center', borderTop: '1px solid grey' }}>${sock.price.toFixed(2)}</td>
          <td style={{ textAlign: 'center', borderTop: '1px solid grey' }}>${(sock.totalAmt * sock.price).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default ConfirmSock
