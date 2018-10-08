import { Model } from '@vuex-orm/core'

export default class GlobalRecommendation extends Model {
  static entity = 'globalrecommendations'

  static fields () {
    return {
      id: this.increment(),
      text: this.string('')
    }
  }
}
