import React from 'react'

import Map from './map.js'
import Battle from './battle.js'

import Swordman from './careers/swordman.js'
import LittleGreenMonster from './enemies/little_green_monster.js'

export default class Console extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      texts: ["你进入了暮色森林"]
    }

    this.battle = <Battle console={this}
            enemies={[new LittleGreenMonster(), new LittleGreenMonster()]}
            me={new Swordman(2)}> </Battle>

    console.addHistory = this.addHistory.bind(this)
  }

  addHistory(text) {
    let texts = this.state.texts
    texts.push(text)
    this.setState({texts})
  }

  render() {
    let historys = []
    for (let i = this.state.texts.length - 1; i >=0; i--) {
      historys.push(
        <p key={i} className="history"> {this.state.texts[i]} </p>
      )
    }
    return  <div>

              {/* <Map console={this}> </Map> */}
              {this.battle}
              <div className="console">
                {historys}
              </div>
            </div>
  }
}
