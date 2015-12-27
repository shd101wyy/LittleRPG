import BattleObject from '../battle_object.js'

export default class LittleGreenMonster extends BattleObject {
  constructor() {
    super({
      name: 'little green monster',
      ascii:'g',
      info: '绿色小妖',
      color: '#5ec38f',
      meetText: ['你遇到了一个愤怒的绿色小妖，它向你冲了过来',
                 '一个绿色小妖挡住了你前进的路，你决定和他战斗到底'],
      movable: true,
      hp: 2,
      qi: 1})

    this.isEnemy = true
    this.hp = 2
    this.qi = 1

    this.addSkill({ skillName: '聚气',
                    func: ()=> {
                      this.qi += 1
                      console.addHistory('绿色小妖憋足了气，获得了 1 气')
                    },
                    info: '聚集 1 气',
                    qi: 1})
    this.addSkill({ skillName: '撞击',
                    func: (enemies)=> {
                            this.qi -= 1
                            let damage = 1
                            if (enemies[0].defence) {
                              enemies[0].defence -= damage
                              console.addHistory(`绿色小妖向 ${enemies[0].info} 发起了撞击，但是被防了下来`)
                            } else {
                              enemies[0].hp -= damage
                              console.addHistory(`绿色小妖向 ${enemies[0].info} 发起了撞击，成功撞到了对方，造车了 1 伤害`)
                            }
                          },
                    info: '消耗 1 气，对单体敌人造成 1 伤害',
                    mode: 'enemy',
                    targetNum: 1,
                    qi: 1})
  }
}
