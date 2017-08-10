import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

class CsvDownload extends React.Component {
  constructor (props) {
    super(props)

    const defaultEndDate = new Date()

    this.state = {
      defaultEndDate
    }
  }
  componentDidMount () {
    console.log('CsvDownload Mounted, props:', this.props)
  }
  render () {
    return (
      <div className='csv-download'>
        <div>
          <DatePicker
            floatingLabelText='Start Date'
            autoOk={true}
            container='inline'
            mode='landscape'
          />
          <DatePicker
            floatingLabelText='End Date'
            autoOk={true}
            container='inline'
            mode='landscape'
            defaultDate = {this.state.defaultEndDate}
          />
        </div>
        <div>
          <RaisedButton
            label='Download CSV for these dates'
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
