import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Card, CardText } from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const Dashboard = React.createClass({
  handleFormSubmit () {
    console.log('form submitted')
  },
  render () {
    return (
      <Card className='container'>
        <h2 className='card-heading'>Dashboard</h2>
        <GridList>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
          <GridTile>Hi I'm a gridtile</GridTile>
        </GridList>
      </Card>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    activeFeed: state.activeFeed
  }
}

export default connect(mapStateToProps)(Dashboard)
