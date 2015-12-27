import React from 'react'

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      skillInfo: null
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

  showSkillInfo(skillName, info) {
    this.setState({skillInfo: info, skillName})
  }

  hideSkillInfo() {
    this.setState({skillInfo: null})
  }

  render() {
    let enemies = this.props.enemies,
        me = this.props.me
    console.log(me)
    return  <div className="battle-panel">
              <div className="battle">
                <div className="enemies">
                  {enemies.map((enemy, i) => {
                    console.log(enemy)
                    return  <div className="enemy" key={i}>
                              <div className="ascii" style={{color: enemy.color}}> {enemy.ascii} </div>
                              <div className="info"> {enemy.info} </div>
                              <div className="hp"> {this.drawHp(enemy.hp)} </div>
                              <div className="qi"> {this.drawQi(enemy.qi)} </div>
                            </div>
                  })}
                </div>
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
                  console.log(skill)
                  return  <div className="skill" key={i} onMouseOver={this.showSkillInfo.bind(this, skill.skillName, skill.info)} onMouseLeave={this.hideSkillInfo.bind(this)}>
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
            </div>
  }
}

/*
  Props:
  enemies: [e1, e2, e3]
  me: [Career]
 */
