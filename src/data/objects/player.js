import GameObject from '../game_object.js'

export default class Player extends GameObject {
  constructor() {
    super({name: 'player', ascii:'@', info: '玩家', color: '#FFF92B'})

    this.skills = []
  }

  addSkill(skillName, func, info) {
    let found = false
    for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i].skillName === skillName) {
          found = true
          this.skills[i] = {skillName, func, info}  // upgrade existed skill
          break
        }
    }

    if (!found) {
      this.skills.push({skillName, func, info})  // learn new skill
    }
  }
}
