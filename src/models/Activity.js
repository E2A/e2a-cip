import { Model } from '@vuex-orm/core'
import Assessment from './Assessment'
import Recommendation from './Recommendation'

export default class Activity extends Model {
  static entity = 'activities'

  static fields () {
    return {
      id: this.increment(),
      activityNumber: this.string(''),
      text: this.string(''),
      budget: this.number(0),
      youthCentric: this.boolean(false),
      type: this.string(''),
      assessments: this.hasMany(Assessment, 'activity_id'),
      recommendations: this.hasMany(Recommendation, 'activity_id')
    }
  }

  /**
  * Get a shortened activity text
  */
  get shortText () {
    const length = 75 // character limit
    const ending = '...' // delimiter
    var str = this.text // init text

    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending
    } else {
      return str
    }
  }
}
