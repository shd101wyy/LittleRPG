import GameObject from '../game_object.js'

export default class EvilKnight extends GameObject {
  constructor() {
    super({
      name: 'evil knight',
      ascii:'K',
      info: '邪恶骑士',
      color: '#853e11',
      meetText: ['你遇到了一个邪恶的骑士，他轻蔑的看了你一眼，拔出了他的剑',
                 '一个邪恶骑士挡在了你的面前，你和他进入了战斗'],
      movable: true})

    this.isEnemy = true
    this.hp = 5
    this.energy = 3
  }
}
