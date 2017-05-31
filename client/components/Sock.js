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
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <th>Colour ID</th>
            <th>Colour Name</th>
            <th>Pattern</th>
            {sock.sizes.map(size => (
              <th key={size}>{size}</th>
            ))}
          </tr>
          {sock.colours.map((colour, index) => (
            <tr key={index}>
              <td>{colour.colourID}</td>
              <td>{colour.colourName}</td>
              {colour.patternName !== 'NONE'
                ? <td>{colour.patternID} - {colour.patternName}</td> : <td />}
              {sock.sizes.map(size => (
                colour.hasOwnProperty(size)
                ? <td key={size}>
                  <input
                    className='order-input'
                    type='number'
                    min='0'
                    value={colour[size] === 0 ? '' : colour[size]}
                    onChange={(e) => handleFormSubmit(sock, colour, e.target.value, size, index)}
                    />
                </td>
                : <td key={size} />
            ))}
            </tr>
        ))}
          {sock.totalAmt > 0
          ? <tr>
            <td colSpan={2} style={{ borderTop: '1px solid grey' }}>Subtotal:</td>
            <td style={{ borderTop: '1px solid grey' }} />
            {sock.sizes.map(size => (
              <td key={size} style={{ textAlign: 'center', borderTop: '1px solid grey' }}>{sock.colours.reduce((memo, colour) => {
                if (colour.hasOwnProperty(size)) memo += colour[size]
                return memo
              }, 0)}</td>
            ))}
          </tr>
          : ''
          }
        </tbody>
      </table>
    </form>
    <div>{sock.totalAmt ? sock.totalAmt : '0'} Total pairs @ ${sock.price.toFixed(2)} exGST: ${sock.totalAmt
        ? (sock.price * sock.totalAmt).toFixed(2) : '0.00'}</div>
  </GridTile>
)

export default Sock
