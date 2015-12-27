import React from 'react'

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      skillInfo: null,  // 选中的技能
      chosenSkillName: null,
      canEnterNextTurn: false,
      attackEnemy: false,
      NPCLoading: false, // 等待 NPC 完成动作
      targets: [],  // 技能释放对象
      win: false,
      defeat: false
    }

    this.turn = 1;
    this.chosenSkill = null
    this.chosenTargets = []
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

  showSkillInfo(skillName, info) {
    this.setState({skillInfo: info, skillName})
  }

  hideSkillInfo() {
    this.setState({skillInfo: null})
  }

  clickSkill(skill) {
    // console.log('click skill ', skill)
    if (skill.qi > this.props.me.qi) {
      // console.log('气不够')
      console.addHistory([`你试图使用技能 ${skill.skillName}，但是发现 气 不够`,
                          `你的 气 不够了，无法使用技能 ${skill.skillName}`,
                         `你感到筋疲力尽，想使用技能 ${skill.skillName}，但是感到心有余而力不足`].randomPick())
      return
    }

    if (this.state.chosenSkillName === skill.skillName) {
      this.setState({chosenSkillName: null, canEnterNextTurn: false, attackEnemy: false})
    } else {
      this.setState({chosenSkillName: skill.skillName})
      this.chosenSkill = skill
      if (skill.mode === 'self') {
        this.setState({canEnterNextTurn: true, attackEnemy: false})
      } else if (skill.mode === "enemy") {
        this.setState({canEnterNextTurn: false, attackEnemy: true})
      }
    }
  }

  chooseTarget(target) {
    if (target.chosen) {
      target.chosen = !target.chosen

      // remove chosen one
      let targets = []
      for (let i = 0; i < this.chosenTargets.length; i++) {
        if (this.chosenTargets[i] !== target) {
          targets.push(target)
        }
      }
      this.chosenTargets = targets

      this.setState({canEnterNextTurn: false})
    } else {
      if (this.state.canEnterNextTurn) {
        return
      }
      target.chosen = true
      this.chosenTargets.push(target)
      if (this.chosenTargets.length === this.chosenSkill.targetNum) {
        this.setState({canEnterNextTurn: true})
      } else {
        this.setState({canEnterNextTurn: false})
      }
    }
  }

  leaveBattle() {
    // console.log('leave battle')
    this.props.console.leaveBattle()
  }

  enterNextTurn() {
    // console.log('enter next turn')
    let skill = this.chosenSkill,
        targets = this.chosenTargets
    // console.log(skill)
    // console.log(targets)

    console.addHistory('-------------------------')

    // player action
    if (skill.mode === 'self') {
      skill.func()
    } else if (skill.mode === 'enemy') {
      skill.func(targets)
    } else { // friends
      skill.func(targets)
    }

    for(let i = 0; i < targets.length; i++) {
      targets[i].chosen = false
    }

    // enemies action
    this.setState({NPCLoading: true})
    let enemies = this.props.enemies
    enemies.forEach((enemy, i)=> {
      if (enemy.hp > 0) {
        setTimeout(()=> {
          enemy.autoAction([this.props.me])
          if (i === enemies.length - 1) {
            // restore defence
            this.props.me.defence = 0

            this.setState({NPCLoading: false})
          }
        }, 800 * (i+1))
      }
    })

    // restore everything
    this.chosenSkill = null
    this.chosenTargets = []
    this.turn++
    this.setState({canEnterNextTurn: false, skillInfo: null, chosenSkillName: null, attackEnemy: false, targets: []})

    // check default
    if (this.props.me.hp <= 0) {
      this.setState({defeat: true})
      return
    }

    // check enemies defeat
    let enemiesLeft = enemies.filter(enemy => enemy.hp > 0).length
    if (enemiesLeft === 0) {
      this.setState({win: true})
    }
  }

  calculateExp() {
    let enemies = this.props.enemies,
        exp = 0
    enemies.forEach(enemy => {
      exp += enemy.exp
    })

    return exp
  }

  // add exp to player
  updatePlayer() {
    let exp = this.calculateExp()
    this.props.me.gainExp(exp)
    return ''
  }

  render() {
    let enemies = this.props.enemies,
        me = this.props.me

    return  <div className="battle-panel">
              <div className="battle">
                {
                  (this.state.win || this.state.defeat) ?
                  <div className="result-panel">
                    <p className="title">{this.state.win ? '战斗胜利！' : '战斗失败。。'}</p>
                    {this.state.win ? <p className="exp"> {`Exp      + ${this.calculateExp()}  => ${me.currentExp + this.calculateExp()}/${me.requiredExpToNextLevel} ${this.updatePlayer()} ` } </p> : null}
                  </div> :
                  <div className="enemies">
                    {enemies.map((enemy, i) => {
                      if (enemy.hp <= 0) {
                        return
                      }

                      return  <div className={"enemy" + (this.state.attackEnemy ? ' attack-target' : '') + (enemy.chosen ? ' chosen' : '')} key={i}
                              onClick={this.state.attackEnemy ? this.chooseTarget.bind(this, enemy) : null}>
                                <div className="ascii" style={{color: enemy.color}}> {enemy.ascii} </div>
                                <div className="info"> {enemy.info} </div>
                                <div className="hp"> {this.drawHp(enemy.hp)} </div>
                                <div className="qi"> {this.drawQi(enemy.qi)} </div>
                              </div>
                    })}
                  </div>
                }
                <div className="friends">
                  <div className="friend">
                    <div className="ascii" style={{color: me.color}}> {me.ascii} </div>
                    <div className="info"> {me.careerInfo + '（你）'} </div>
                    <div className="hp"> {this.drawHp(me.hp)} </div>
                    <div className="qi"> {this.drawQi(me.qi)} </div>
                  </div>
                </div>
              </div>
              <div className="skills">
                <p className="title"> 技能 </p>
                {me.skills.map((skill, i) => {
                  return  <div className={"skill " + (this.state.chosenSkillName === skill.skillName ? 'chosen' : '')} key={i}
                                onMouseOver={this.showSkillInfo.bind(this, skill.skillName, skill.info)}
                                onMouseLeave={this.hideSkillInfo.bind(this)}
                                onClick={this.clickSkill.bind(this, skill)}>
                            <p> {skill.skillName} </p>
                          </div>
                })}
                {this.state.skillInfo ?
                  <div className="skill-info" ref="skillInfo">
                    <p className="skill-name"> {this.state.skillName} </p>
                    {this.state.skillInfo}
                  </div> : null
                }
              </div>
              <div className="turn">
                {this.turn}
              </div>
              {this.state.NPCLoading ?
                <div className={"next-turn-waiting " + (this.state.win ? 'win' : '')} onClick={this.state.win ? this.leaveBattle.bind(this) : null}>
                  {this.state.win ? '离开战场' : '请稍等...'}
                </div> :
                <div className={"next-turn " + (this.state.canEnterNextTurn ? 'available' : '')} onClick={this.state.canEnterNextTurn ? this.enterNextTurn.bind(this) : null}></div>
              }
            </div>
  }
}

/*
  Props:
  enemies: [e1, e2, e3]
  me: [Career]
 */
