import GameObject from '../game_object.js'

export default class LittleGreenMonster extends GameObject {
  constructor() {
    super({
      name: 'little green monster',
      ascii:'g',
      info: '绿色小妖',
      color: '#5ec38f',
      meetText: ['你遇到了一个愤怒的绿色小妖，它向你冲了过来',
                 '一个绿色小妖挡住了你前进的路，你决定和他战斗到底'],
      movable: true})

    this.isEnemy = true
    this.hp = 2
    this.qi = 1

    this.skills = [
      {skillName: '聚气', func: ()=> {this.qi += 1}, info: '聚集 1 气'},
      {skillName: '撞击', func: (enemy)=> {
        this.damage = 1
        if (enemy.defence) {
          enemy.defence -= damage
        } else {
          enemy.hp -= damage
        }
      }, info: '消耗 1 气，对单体敌人造成 1 伤害'}
    ]
  }
}
