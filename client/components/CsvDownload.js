import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import fileDownload from 'react-file-download'
import axios from 'axios'

class CsvDownload extends React.Component {
  constructor (props) {
    super(props)

    const defaultEndDate = new Date()
    this.state = {
      startDate: null,
      endDate: defaultEndDate
    }

    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    console.log('CsvDownload Mounted, props:', this.props)
  }
  handleStartDate (event, date) {
    this.setState({startDate: date})
  }
  handleEndDate (event, date) {
    date.setHours(23, 59)
    this.setState({endDate: date})
  }
  handleSubmit () {
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    const data = {
      start: this.state.startDate,
      end: this.state.endDate
    }
    axios.post('/api/csv', data, config)
      .then(response => {
        fileDownload(response.data, `onlineorders.csv`)
      })
  }
  render () {
    return (
      <div className='csv-download'>
        <h2 className='card-heading'>Order CSV Download</h2>
        <div>
          <DatePicker
            floatingLabelText='Start Date'
            autoOk={true}
            container='inline'
            mode='landscape'
            onChange={this.handleStartDate}
          />
          <DatePicker
            floatingLabelText='End Date'
            autoOk={true}
            container='inline'
            mode='landscape'
            onChange={this.handleEndDate}
            value = {this.state.endDate}
          />
        </div>
        <div>
          <br />
          <RaisedButton
            label='Download CSV for these dates'
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(CsvDownload)
