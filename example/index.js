import React from 'react'
import ReactDOM from 'react-dom'

import Countdown from '../dist/countdown.min'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {cd: ''}
  }

  initCountdown () {
    if (!this.cdInstance) {
      this.cdInstance = new Countdown({
        endTime: new Date().getTime() + 1081000,
        onUpdate: (data) => {
          this.setState({
            cd: `${data.hours}:${data.minutes}:${data.seconds}`
          })
        },
        onComplete: () => {
          this.setState({
            cd: 'cd complete'
          })
        }
      })
    }
  }

  destroyCountdown () {
    if (this.cdInstance) {
      this.cdInstance.clear()
    }
    this.cdInstance = null
  }

  componentDidMount () {
    this.initCountdown()
  }

  componentWillUnmount () {
    this.destroyCountdown()
  }

  render () {
    return (
      <div>
        <h1>
          cd: {this.state.cd}
        </h1>
        <button onClick={() => {
          if (this.cdInstance) {
            this.cdInstance.init({
              endTime: new Date().getTime() + 120000
            })
          }
        }}>
          update time 00:02:00
        </button>
        <button onClick={() => {
          if (this.cdInstance) {
            this.cdInstance.clear(false)
          }
        }}>
          pause
        </button>
        <button onClick={() => {
          if (this.cdInstance) {
            this.cdInstance.start()
          }
        }}>
          continue
        </button>
        <button onClick={() => {
          if (this.cdInstance) {
            this.cdInstance.clear()
            this.cdInstance.init({
              endTime: new Date().getTime() + 60000
            })
            this.cdInstance.start()
          }
        }}>
          manual restart 00:01:00
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
