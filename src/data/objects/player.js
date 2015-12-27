import GameObject from '../game_object.js'

export default class Player extends GameObject {
  constructor() {
    super({name: 'player', ascii:'@', info: '玩家', color: '#FFF92B'})
  }
}
