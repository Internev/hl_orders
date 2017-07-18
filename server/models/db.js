const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')

const dbUrl = config.db

const db = new Sequelize(dbUrl)

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: {type: Sequelize.BOOLEAN, defaultValue: false},
  customerid: {type: Sequelize.STRING, unique: true}
})

const Order = db.define('order', {
  order: Sequelize.JSON,
  totalprice: Sequelize.INTEGER,
  totalamt: Sequelize.INTEGER,
  shipping: {type: Sequelize.INTEGER, defaultValue: 0},
  addinfo: Sequelize.JSON
})

const Storedorder = db.define('storedorder', {
  storedorder: Sequelize.JSON
})

const Storegeo = db.define('storegeo', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  lat: {type: Sequelize.FLOAT, allowNull: false},
  lng: {type: Sequelize.FLOAT, allowNull: false}
})

Order.belongsTo(User, {
  onDelete: 'cascade',
  foreignKey: {
    field: 'userId',
    allowNull: false
  }
})

User.sync()
Order.sync()
Storedorder.sync()
Storegeo.sync()

const genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const genHashAsync = (password, cb) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8), null, cb)
}

const validPass = (password, storedPassword) => {
  return bcrypt.compareSync(password, storedPassword)
}

module.exports.User = User
module.exports.Order = Order
module.exports.Storedorder = Storedorder
module.exports.Storegeo = Storegeo
module.exports.genHash = genHash
module.exports.genHashAsync = genHashAsync
module.exports.validPass = validPass
