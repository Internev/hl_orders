import React from 'react'
import {GridTile} from 'material-ui/GridList'

const Sock = ({sock, handleFormSubmit}) => (
  <GridTile className='sock-tile'>
    <h3>
      {sock.styleID}
    </h3>
    <div>
      {sock.desc}
    </div>
    <form>
      <table>
        <tbody>
          <tr>
            <th>Colour ID</th>
            <th>Colour Name</th>
            <th>Pattern</th>
            <th>Small</th>
            <th>Reg</th>
            <th>King</th>
          </tr>
          {sock.colours.map((colour, index) => (
            <tr key={index}>
              <td>{colour.colourID}</td>
              <td>{colour.colourName}</td>
              {colour.patternName !== 'NONE'
                ? <td>{colour.patternID} - {colour.patternName}</td> : <td />}
              {colour.small
                ? <td><input
                  className='order-input'
                  type='number'
                  min='0'
                  value={colour.smallAmt === 0 ? '' : colour.smallAmt}
                  onChange={(e) => handleFormSubmit(sock, colour, e.target.value, 'smallAmt', index)}
                /></td>
                : <td />}
              {colour.regular
                ? <td><input
                  className='order-input'
                  type='number'
                  min='0'
                  value={colour.regularAmt === 0 ? '' : colour.regularAmt}
                  onChange={(e) => handleFormSubmit(sock, colour, e.target.value, 'regularAmt', index)}
                /></td>
                : <td />}
              {colour.king
                ? <td><input
                  className='order-input'
                  type='number'
                  min='0'
                  value={colour.kingAmt === 0 ? '' : colour.kingAmt}
                  onChange={(e) => handleFormSubmit(sock, colour, e.target.value, 'kingAmt', index)}
                /></td>
                : <td />}
            </tr>
        ))}
        </tbody>
      </table>
    </form>
    <div>{sock.totalAmt ? sock.totalAmt : '0'} Total pairs @ ${sock.price.toFixed(2)}: ${sock.totalAmt
        ? (sock.price * sock.totalAmt).toFixed(2) : '0.00'}</div>
  </GridTile>
)

export default Sock
