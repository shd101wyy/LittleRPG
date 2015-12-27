import Empty from './objects/empty.js'
import Tree from './objects/tree.js'
import Player from './objects/player.js'
import StoneWall from './objects/stone_wall.js'
import EvilKnight from './enemies/evil_knight.js'
import LittleGreenMonster from './enemies/little_green_monster.js'

import React from 'react'

let _empty = new Empty(),
    _tree = new Tree(),
    _stoneWall = new StoneWall(),
    _player = new Player(),
    _evilKnight = new EvilKnight(),
    _littleGreenMonster = new LittleGreenMonster()

let mapData = [
  [ _empty, _empty, _empty, _empty, ],
  [ _empty, _empty, _tree, _empty, ],
  [ _empty, _empty, _littleGreenMonster, _empty, ],
  [ _empty, _empty, _empty,  _tree],
  [ _empty, _player, _empty, _empty, ]
]

export default class Map extends React.Component{
  constructor(props) {
    super(props)

    console.log("创建地图")

    let playerCoord = this.getPlayerCoordinate(),
        player = mapData[playerCoord[0]][playerCoord[1]]
    this.state = {
      playerCoord,
      player
    }
  }

  getPlayerCoordinate() {
    for(let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (mapData[i][j].name === 'player') {
          return [i, j]
        }
      }
    }
  }

  /*
    玩家可以移动三个方向
    i = 1   => 左上
    i = 2   => 上
    i = 3   => 右上
   */
  playerMove(i, mapItem) {
    if (i === 1) {
      let playerCoord = [this.state.playerCoord[0] - 1, this.state.playerCoord[1] - 1]
      if (playerCoord[0] < 0) {
        playerCoord[0] = mapData.length - 1
      }
      this.setState({playerCoord: playerCoord})
      console.addHistory('你往 左前方 走了。 ' + mapItem.meetText[Math.floor(Math.random() * mapItem.meetText.length)] )

      if (mapItem.isEnemy) {
        this.props.console.enterBattle([mapItem])
      }

    } else if (i === 2) {
      let playerCoord = [this.state.playerCoord[0] - 1, this.state.playerCoord[1]]
      if (playerCoord[0] < 0) {
        playerCoord[0] = mapData.length - 1
      }
      this.setState({playerCoord: playerCoord})
      console.addHistory('你往 前 走了。 ' + mapItem.meetText[Math.floor(Math.random() * mapItem.meetText.length)])

      if (mapItem.isEnemy) {
        this.props.console.enterBattle([mapItem])
      }

    } else if (i === 3) {
      let playerCoord = [this.state.playerCoord[0] - 1, this.state.playerCoord[1] + 1]
      if (playerCoord[0] < 0) {
        playerCoord[0] = mapData.length - 1
      }
      this.setState({playerCoord: playerCoord})
      console.addHistory('你往 右前方 走了。 ' + mapItem.meetText[Math.floor(Math.random() * mapItem.meetText.length)])

      if (mapItem.isEnemy) {
        this.props.console.enterBattle([mapItem])
      }

    } else {
      console.addHistory('你不能往那里走')
    }
  }

  playerCannotMove(mapItem) {
    if (mapItem.meetText) {
      console.addHistory(mapItem.meetText[Math.floor(Math.random() * mapItem.meetText.length)])
    } else {
      console.addHistory('你不能往那里走')
    }
  }

  drawHp(num) {
    let output = ''
    for (let i = 0; i < num; i++) {
      output += '♥'
    }
    return output
  }

  drawQi(num) {
    let output = ''
    for (let i = 0; i < num; i++) {
      output += '♦︎'
    }
    return output
  }

  render() {
    // visible map => 3 row 5 columns
    // put player in the [3, 2]
    // . . . . .
    // . . . . .
    // . . . . .
    //     @
    let map = [[],
               [],
               []]
    let info = []
    let infoGot = {}
    for (let i = 0; i < 3; i++) {
      for(let j = 0; j < 5; j++) {
        let y = this.state.playerCoord[1] - 2 + j,   // column
            x = this.state.playerCoord[0] - 1 - i    // row

        if (x < 0) {
          x = mapData.length + x
        }

        if (y < 0 || y >= mapData[x].length) {
          map[2 - i].push(null)
        } else {
          let mapItem = mapData[x][y]
          if (mapItem.name === "player") {
            mapItem = _empty
          }

          map[2 - i].push(mapItem)
          if (!infoGot[ mapItem.name ]) {
            infoGot[mapItem.name] = true
            info.push([mapItem.ascii, mapItem.info, mapItem.color])
          }
        }
      }
    }

    info = info.sort((a, b)=>parseInt(a[2].slice(1), 16) - parseInt(b[2].slice(1), 16))

    return (  <div className="map-panel">
                <div className="map-instruction">
                  <p className="hp"> {this.drawHp(this.props.console.player.hp)} </p>
                  <p className="energy">{this.drawQi(this.props.console.player.qi)}</p>
                  <p>  </p>
                </div>
                <div className="map">
                  <div className="fourth map-row"> {map[0].map((mapItem, i) => {
                    if (mapItem === null) {
                      return <div key={i} className="map-item">&nbsp;</div>
                    } else {
                      return <div className="map-item" key={i} style={{color: mapItem.color}}> {mapItem.ascii} </div>
                    }
                  })}
                  </div>
                  <div className="third map-row" > {map[1].map((mapItem, i) => {
                    if (mapItem === null) {
                      return <div key={i} className="map-item">&nbsp;</div>
                    } else {
                      return <div className="map-item" key={i} style={{color: mapItem.color}}> {mapItem.ascii} </div>
                    }
                  })}
                  </div>
                  <div className="second map-row"> {map[2].map((mapItem, i) => {
                    if (mapItem === null) {
                      return <div key={i} className="map-item">&nbsp;</div>
                    } else {
                      return <div className={"map-item " + ((i>0 && i < 4) ? 'movable' : ' not-movable') } key={i} style={{color: mapItem.color}} onClick={mapItem.movable ? this.playerMove.bind(this, i, mapItem) : this.playerCannotMove.bind(this, mapItem)}> {mapItem.ascii} </div>
                    }
                  })}
                  </div>
                  <div className="first map-row" >
                    <div className="map-item">&nbsp;</div>
                    <div className="map-item">&nbsp;</div>
                    <div className="map-item" style={{color: this.state.player.color}}>{this.state.player.ascii}</div>
                    <div className="map-item">&nbsp;</div>
                    <div className="map-item">&nbsp;</div>
                  </div>
                </div>
                <div className="map-info">
                  {info.map( (elem, i) => <p key={i}> <span style={{color: elem[2]}}> {elem[0]} </span> &nbsp;&nbsp;&nbsp; {elem[1]} </p> )}
                </div>
              </div>)
  }
}
