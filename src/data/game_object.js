export default class GameObject{
  constructor(props = {name: 'empty', ascii:'.', info: '空地', color: '#89be9f', movable: true}) {
    this.name = props.name
    this.ascii = props.ascii
    this.info = props.info
    this.color = props.color
    this.meetText = props.meetText
    this.movable = props.movable
  }
}
