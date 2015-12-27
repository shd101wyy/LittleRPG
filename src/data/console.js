import React from 'react'

import Map from './map.js'
import Battle from './battle.js'

import Swordman from './careers/swordman.js'
import LittleGreenMonster from './enemies/little_green_monster.js'

export default class Console extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      texts: ["你进入了暮色森林"],
      battle: null
    }
    /*
    this.battle = <Battle console={this}
            enemies={[new LittleGreenMonster(), new LittleGreenMonster()]}
            me={new Swordman(2)}> </Battle>*/
    this.map = <Map console={this}> </Map>
    this.player = new Swordman(5)

    console.addHistory = this.addHistory.bind(this)
  }

  addHistory(text) {
    let texts = this.state.texts
    texts.push(text)
    this.setState({texts})
  }

  enterBattle(enemies) {
    enemies.forEach(enemy => enemy.revive())
    this.battle =  <Battle console={this}
            enemies={enemies}
            me={this.player}> </Battle>
    this.setState({inBattle: true})
  }

  leaveBattle() {
    this.battle = null
    this.setState({inBattle: false})
  }

  render() {
    let historys = []
    for (let i = this.state.texts.length - 1; i >=0; i--) {
      historys.push(
        <p key={i} className="history"> {this.state.texts[i]} </p>
      )
    }
    return  <div>
              {this.state.inBattle ? this.battle : null}
              <div style={{display: (this.state.inBattle ? 'none' : 'block')}}> {this.map} </div>
              <div className="console">
                {historys}
              </div>
            </div>
  }
}
