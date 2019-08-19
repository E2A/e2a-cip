import { Model } from '@vuex-orm/core'
import Activity from './Activity'
import Comment from './Comment'

export default class Assessment extends Model {
  static entity = 'assessments'

  static fields () {
    return {
      id: this.increment(),
      best_practice_id: this.number(0),
      activity_id: this.number(0),
      text: this.string(''),
      value: this.string(''),
      activity: this.belongsTo(Activity, 'activity_id'),
      comments: this.hasMany(Comment, 'assessment_id')
    }
  }
}
