import BattleObject from '../battle_object.js'
export default class Swordman extends BattleObject{
  constructor(lv) {
    super({name: 'player', ascii:'@', info: '玩家', color: '#FFF92B'})

    this.careerName = "swordman"
    this.careerInfo = "剑客"

    this.hp = 1
    this.qi = 1

    this.setLevel(lv)
  }

  setLevel(lv) {
    if (lv >= 30) { // 满级了
      this.hp = 10
      this.qi = 4

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 4
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 4 气', '成功聚到 4 气'].randomPick())
                      },
                      info: '增加 4 点气',
                      mode: 'self',
                      qi: 0})
    } else if (lv >= 25) {
      this.hp = 8
      this.qi = 4

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 3
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 3 气', '成功聚到 3 气'].randomPick())
                      },
                      info: '增加 3 点气',
                      mode: 'self',
                      qi: 0})
    } else if (lv >= 20) {
      this.hp = 7
      this.qi = 3

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 3
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 3 气', '成功聚到 3 气'].randomPick())
                      },
                      info: '增加 3 点气',
                      mode: 'self',
                      qi: 0})
    } else if (lv >= 15) {
      this.hp = 6
      this.qi = 3

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 2
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 2 气', '成功聚到 2 气'].randomPick())
                      },
                      info: '增加 2 点气',
                      mode: 'self',
                      qi: 0})
    } else if (lv >= 10) {
      this.hp = 5
      this.qi = 2

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 2
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 2 气', '成功聚到 2 气'].randomPick())
                      },
                      info: '增加 2 点气',
                      mode: 'self',
                      qi: 0})
    } else if (lv >= 5) {
      this.hp = 4
      this.qi = 2

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 1
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 1 气', '成功聚到 1 气'].randomPick())
                      },
                      info: '增加 1 点气',
                      mode: 'self',
                      qi: 0})
    } else {
      this.hp = 3
      this.qi = 1

      this.addSkill({ skillName: '聚气',
                      func: ()=> {
                        this.qi += 1
                        console.addHistory(['你聚精会神，气沉丹田，聚到了 1 气', '成功聚到 1 气'].randomPick())
                      },
                      info: '增加 1 点气',
                      mode: 'self',
                      qi: 0})
    }

    if (lv >= 1) {
      this.addSkill({ skillName: '防御',
                      func: ()=> {
                        this.defence = 1
                        console.addHistory(['你对你的身体进行了防御，将可以抵挡住 1 伤害', '你拼命护住了你的脸，将可以抵挡 1 伤害'].randomPick())
                      },
                      info: '抵挡 1 伤害',
                      mode: 'self',
                      qi: 0})
    }

    if (lv >= 1) {
      console.log('enter here')
      this.addSkill({ skillName: '斩击',
                      func: (enemies)=> {
                        this.qi -= 1
                        enemies[0].hp -= 1     // TODO: enemy 以后也有可能会有防御技能
                        console.addHistory([`你向 ${enemies[0].info} 施展了 斩击，成功击中对方，造成了 1 点伤害`,
                                            `你华丽的一个转身，将剑顺势砍了出去，成功地击中了 ${enemies[0].info}，对他造成了 1 点伤害`].randomPick())
                      },
                      info: '消耗 1 气，对单体敌人造成 1 伤害',
                      mode: 'enemy',
                      targetNum: 1,
                      qi: 1})
    }

  }
}
