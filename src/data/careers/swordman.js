import Player from '../objects/player.js'
export default class Swordman extends Player{
  constructor(lv) {
    super()

    this.careerName = "swordman"
    this.careerInfo = "剑客"

    this.hp = 1
    this.qi = 1

    this.skills = []

    this.setLevel(lv)
  }

  setLevel(lv) {
    if (lv >= 30) { // 满级了
      this.hp = 10
      this.qi = 4

      this.addSkill('聚气', ()=> {this.qi += 4}, '增加 4 点气', 'self')
    } else if (lv >= 25) {
      this.hp = 8
      this.qi = 4

      this.addSkill('聚气', ()=> {this.qi += 3}, '增加 3 点气', 'self')
    } else if (lv >= 20) {
      this.hp = 7
      this.qi = 3

      this.addSkill('聚气', ()=> {this.qi += 3}, '增加 3 点气', 'self')
    } else if (lv >= 15) {
      this.hp = 6
      this.qi = 3

      this.addSkill('聚气', ()=> {this.qi += 2}, '增加 2 点气', 'self')
    } else if (lv >= 10) {
      this.hp = 5
      this.qi = 2

      this.addSkill('聚气', ()=> {this.qi += 2}, '增加 2 点气', 'self')
    } else if (lv >= 5) {
      this.hp = 4
      this.qi = 2

      this.addSkill('聚气', ()=> {this.qi += 1}, '增加 1 点气', 'self')
    } else {
      this.hp = 3
      this.qi = 1

      this.addSkill('聚气', ()=> {this.qi += 1}, '增加 1 点气', 'self')
    }

    if (lv >= 1) {
      this.addSkill('防御', ()=> {this.defence = 1}, '抵挡 1 伤害', 'self')
    }

    if (lv >= 1) {
      this.addSkill('斩击', (enemies)=> {
        enemies[0].hp -= 1     // TODO: enemy 以后也有可能会有防御技能
      }, '消耗 1 气，对单体敌人造成 1 伤害', 'enemy', 1)
    }

  }
}
