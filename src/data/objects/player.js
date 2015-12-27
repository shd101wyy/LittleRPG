import GameObject from '../game_object.js'

export default class Player extends GameObject {
  constructor() {
    super({name: 'player', ascii:'@', info: '玩家', color: '#FFF92B'})

    this.skills = []
  }

  /*
    mode 有三种
    1. 对自己释放的技能
    2. 对敌人释放的技能
    3. 对友军释放的技能 (友军包括自己)
   */
  addSkill(skillName, func, info, mode="enemy", targetNum = 1) {
    let found = false
    for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i].skillName === skillName) {
          found = true
          this.skills[i] = {skillName, func, info, mode, targetNum}  // upgrade existed skill
          break
        }
    }

    if (!found) {
      this.skills.push({skillName, func, info, mode, targetNum})  // learn new skill
    }
  }
}
