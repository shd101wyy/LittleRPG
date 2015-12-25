import GameObject from '../game_object.js'

export default class StoneWall extends GameObject {
  constructor() {
    super({
      name: 'stone_wall',
      ascii:'#',
      info: '石墙',
      color: '#616362',
      meetText: ['你撞上了一面石头做的墙，被弹了回来',
                 '你盯着一堵石墙，不知所措，无法通过',
                 '一面墙堵在了前面，你退了回来'],
      movable: false})
  }
}
