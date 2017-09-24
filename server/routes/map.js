const express = require('express')
const { Order, Storedorder, User, Storegeo, genHash } = require('../models/db')
const path = require('path')
const axios = require('axios')
const PromiseThrottle = require('promise-throttle')
const config = require('../../config')

const router = new express.Router()

router.get('/', (req, res) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.headers.search}&components=country:AU&region=au&key=${config.GMAPS_API}`
  let searchPoint = {
  }
  axios.request(url)
    .then(geo => {
      console.log('\n***\nGeo Received from Google for address centering:\n', geo.data, 'latlng:', geo.data.results[0].geometry.location)
      searchPoint = geo.data.results[0].geometry.location
      const query = `SELECT
      "name", "address", "location", ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") AS distance
      FROM "storegeos"
      WHERE
      ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") < :maxDistance
      ORDER BY distance ASC
      LIMIT 25`
      Storegeo.sequelize.query(query, {
        replacements: {
          latitude: searchPoint.lat,
          longitude: searchPoint.lng,
          maxDistance: 50 * 1000
        },
        type: Storegeo.sequelize.QueryTypes.SELECT
      })
      .then(geo => {
        // console.log('\n\nWe got a response from store geo!\n', geo)
        res.status(200).json({geo, searchPoint})
      })
      .catch(err => {
        console.log('\n\nerror from store geo:\n', err)
      })
    })
})

module.exports = router
