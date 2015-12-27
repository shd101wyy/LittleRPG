import GameObject from '../game_object.js'

export default class Tree extends GameObject {
  constructor() {
    super({
      name: 'tree',
      ascii:'♣︎',
      info: '树',
      color: '#518566',
      meetText: ['一棵树阻挡住了你前进的道路, 你因此退了回来',
                 '你的眼前屹立了一棵巨大无比的树，把路给封住了'],
      movable: false})
  }
}
