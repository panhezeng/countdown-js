import React from 'react'
import ReactDOM from 'react-dom'

import Countdown from '../src/index'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {cd: ''}
  }

  initCountdown () {
    if (!this.cdInstance) {
      this.cdInstance = new Countdown({
        nowTime: new Date().getTime(), endTime: new Date().getTime() + 1000000, onUpdate: (data) => {
          this.setState({
            cd: `${data.hours}:${data.minutes}:${data.seconds}`,
          })
        },
        onComplete: () => {
          this.setState({
            cd: 'cd complete',
          })
        },
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
        <button onClick={() => this.destroyCountdown()}>
          manual complete
        </button>
        <button onClick={() => this.cdInstance.updateTime({
          nowTime: new Date().getTime(),
          endTime: new Date().getTime() + 20000,
        })}>
          update time
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app'),
)
