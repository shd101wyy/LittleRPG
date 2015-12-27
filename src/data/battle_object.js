import GameObject from './game_object.js'

export default class BattleObject extends GameObject {
  constructor(gameObjectProps) {
    super(gameObjectProps)

    this.skills = []
    this.hp = gameObjectProps.hp
    this.qi = gameObjectProps.qi

    this.default_hp = this.hp 
    this.default_qi = this.qi
  }

  /*
    mode 有三种
    1. self      对自己释放的技能
    2. enemy     对敌人释放的技能
    3. friend    对友军释放的技能 (友军包括自己)
   */
  addSkill({skillName, func, info, mode="enemy", targetNum = 1, qi = 0}) {
    let found = false
    for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i].skillName === skillName) {
          found = true
          this.skills[i] = {skillName, func, info, mode, targetNum, qi}  // upgrade existed skill
          break
        }
    }

    if (!found) {
      this.skills.push({skillName, func: func.bind(this), info, mode, targetNum, qi})  // learn new skill
    }
  }

  findSkill(skillName) {
    for(let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].skillName === skillName) {
        return this.skills[i]
      }
    }
    return null
  }

  /**
   * AI: auto action
   */
  autoAction(targets) {
    let skillNum = this.skills.length
    let validSkills = []
    this.skills.forEach((skill) => {
      if (skill.qi <= this.qi) {
        validSkills.push(skill)
      }
    })

    let autoAc = ()=> {
      if (this.qi <= 0 || validSkills.length === 0 || Math.random() < 0.1) {
        this.findSkill("聚气").func()
      } else if (Math.random() < 0.5) { // enemies
        for(let i = 0; i < validSkills.length; i++) {
          if (validSkills[i].mode === 'enemy' && Math.random() > 0.5) {
            return validSkills[i].func(targets)
          }
        }
        return autoAc()
      } else if (Math.random() < 0.5) { // self
        for(let i = 0; i < validSkills.length; i++) {
          if (validSkills[i].mode === 'self' && Math.random() > 0.5) {
            return validSkills[i].func(targets)
          }
        }
        return autoAc()
      } /*else if (Math.random() < 0.5){ // friends

      }*/
       else { // enemies
      for(let i = 0; i < validSkills.length; i++) {
        if (validSkills[i].mode === 'enemy' && Math.random() > 0.5) {
          return validSkills[i].func(targets)
        }
      }
      return autoAc()
      }
    }

    return autoAc()
  }

  // restore default hp and qi
  revive() {
    this.hp = this.default_hp
    this.qi = this.default_qi
  }
}
