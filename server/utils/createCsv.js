const assembleCsv = (orders) => {
  let csv = `Date Ordered, Style Number, Pattern, Colour/Pattern, Quantity, Unit Price, Line Total, Order Total, Shipping Costs, Order Grand Total, Total Pair, Store Name, Store Address 1, Store Address 2, Store Address 3, Store Address 4, Customer Name, Delivery Address, Customer Code, Web Order Number, Delivery Instructions, Department, Reference Number, Contact Person, Email Address, Comments, Agent Order\n`
  orders.forEach(order => {
    csv += csvFromOrder(order, order.user, order.totalamt, order.addinfo.agent ? order.addinfo.agent : null)
  })
  return csv
}

const padToFive = number => number <= 99999 ? ('0000' + number).slice(-5) : number

const csvFromOrder = (order, customer, totalAmt, agent) => {
  // Handle no-postcode field uploads.
  if (customer.name.split('').filter(ch => ch === ',').length === 3) {
    customer.name = customer.name + ','
  }

  // filter by sock, then also by size before outputting to csv.
  let csv = ``
  let day = order.updatedAt.getDate() < 10 ? '0' + order.updatedAt.getDate() : '' + order.updatedAt.getDate()
  let month = (order.updatedAt.getMonth() + 1) < 10 ? '0' + (order.updatedAt.getMonth() + 1) : '' + (order.updatedAt.getMonth() + 1)
  let orderDate = `${day}/${month}/${order.updatedAt.getFullYear()}`
  let webOrderNumber = 'A' + padToFive(order.id)
  const clean = (text) => {
    return text ? text.replace(/[,\n]/g, ' ') : ''
  }
  order.order
    .filter(sock => sock.totalAmt)
    .forEach(sock => {
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
        sock.sizes.forEach(size => {
          if (colour.hasOwnProperty(size) && colour[size] > 0) {
            csv += `${orderDate}, ${size}, ${colour.patternID}, ${colour.colourID}, ${colour[size]}, ${sock.price}, ${colour[size] * sock.price}, ${order.totalprice / 100}, ${order.shipping}, ${(order.totalprice / 100) + order.shipping}, ${totalAmt}, ${customer.name}, ${clean(order.addinfo.customerName)}, ${clean(order.addinfo.deliveryAddress)}, ${customer.customerid}, ${webOrderNumber}, ${clean(order.addinfo.deliveryInstructions)}, ${clean(order.addinfo.department)}, ${clean(order.addinfo.customerRef)}, ${clean(order.addinfo.contactPerson)}, ${clean(order.addinfo.email)}, ${clean(order.addinfo.comments)}, ${agent ? agent.customerid : ''}\n`
          }
        })
      })
    })
  return csv
}

module.exports.assembleCsv = assembleCsv
