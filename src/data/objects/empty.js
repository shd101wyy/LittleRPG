import GameObject from '../game_object.js'

export default class Empty extends GameObject {
  constructor() {
    super({
      name: 'empty',
      ascii:'.',
      info: '空地',
      color: '#89be9f',
      meetText: ['你来到了一片空地，这里什么也没有',
                 '你来到了一片空地，这里很空旷，你感到有一丝凄凉',
                 '你的眼前空荡荡的什么也没有'],
      movable: true})
  }
}
