import React from 'react'

const ConfirmSock = ({sock}) => (
  <div>
    <h3>{sock.styleID} - {sock.desc}</h3>

    <table width='100%' key={sock.styleID}>
      <tbody>
        <tr>
          <th width='20%'>Colour</th>
          <th width='20%'>Pattern</th>
          <th width='10%'>{sock.styleID + '05'}</th>
          <th width='10%'>{sock.styleID + '07'}</th>
          <th width='10%'>{sock.styleID + '10'}</th>
          <th width='15%'>Price</th>
          <th width='15%'>Total</th>
        </tr>
        {sock.colours
          .filter(colour => {
            if (colour.smallAmt) return true
            if (colour.regularAmt) return true
            if (colour.kingAmt) return true
            return false
          })
          .map(colour => (
            <tr key={colour.colourID}>
              <td>{colour.colourID}: {colour.colourName}</td>
              <td>{colour.patternID > 0
                  ? colour.patternID + ': ' + colour.patternName
                  : ''}</td>
              <td>{colour.smallAmt}</td>
              <td>{colour.regularAmt}</td>
              <td>{colour.kingAmt}</td>
              <td>${sock.price.toFixed(2)}</td>
              <td>${((colour.smallAmt + colour.regularAmt + colour.kingAmt) * sock.price).toFixed(2)}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default ConfirmSock
