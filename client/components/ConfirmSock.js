import React from 'react'

const ConfirmSock = ({sock}) => (
  <div key={sock.styleID}>
    <h3>{sock.styleID} - {sock.desc}</h3>

    <table width='100%' key={sock.styleID}>
      <tbody>
        <tr>
          <th width='15%'>Colour</th>
          <th width='15%'>Pattern</th>
          {sock.sizes.map(size => (
            <th key={size}>{size}</th>
          ))}
          <th width='15%'>Price</th>
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
          .map(colour => {
            console.log('mapped colour here:', colour)
            return (
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
        )})}
      </tbody>
    </table>
  </div>
)

export default ConfirmSock
