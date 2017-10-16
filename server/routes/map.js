const express = require('express')
const { Storegeo } = require('../models/db')
const axios = require('axios')
const config = require('../../config')

const router = new express.Router()

router.get('/', (req, res) => {
  let searchTerm = req.headers.search.replace(/[ \t]/g, '+')
  // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&components=country:AU|country:NZ&key=${config.GMAPS_API}`
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&region:AU&key=${config.GMAPS_API}`
  if (/^\d{4}$/.test(searchTerm)) {
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}+australia&key=${config.GMAPS_API}`
  }
  console.log('url query is:', url)
  let searchPoint = {
  }
  axios.request(url)
    .then(geo => {
      // console.log('\n***\nGeo Received from Google for address centering:\n', geo.data, 'latlng:', geo.data.results[0].geometry.location)
      console.log('\n***\nGeo Received from Google for address centering:\n', geo.data)
      searchPoint = geo.data.results[0].geometry.location
      const query = `SELECT
      "name", "address", "location", "comment", ST_Distance_Sphere(ST_MakePoint(:longitude, :latitude), "location") AS distance
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
        // console.log('\n\n*****\nWe got a response from store geo!\n', geo)
        res.status(200).json({geo, searchPoint})
      })
      .catch(err => {
        console.log('\n\nerror from store geo:\n', err)
        res.status(500).json({err})
      })
    })
    .catch(err => {
      console.log('geolocation error on search:', err)
      res.status(500).json({err})
    })
})

module.exports = router
