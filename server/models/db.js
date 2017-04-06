const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const dbUrl = process.env.RDS_CONNECTION_URL || 'postgres://n:hush@localhost/hl_orders'

const db = new Sequelize(dbUrl)

const User = db.define('user', {
  name: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  admin: {type: Sequelize.BOOLEAN, defaultValue: false}
})

const Order = db.define('order', {
  order: Sequelize.JSON
})

Order.belongsTo(User)

User.sync()
Order.sync({force: true})

const genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const validPass = (password, storedPassword) => {
  return bcrypt.compareSync(password, storedPassword)
}

module.exports.User = User
module.exports.Order = Order
module.exports.genHash = genHash
module.exports.validPass = validPass
