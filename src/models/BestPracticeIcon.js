import { Model } from '@vuex-orm/core'
import Activity from './Activity'

export default class BestPracticeIcon extends Model {
  static entity = 'bestpracticeicons'

  static fields () {
    return {
      id: this.increment(),
      flyout: this.boolean(false),
      activity_id: this.number(0),
      activity: this.belongsTo(Activity, 'activity_id'),
      best_practice_id: this.number(0)
    }
  }
}
