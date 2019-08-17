import { Model } from '@vuex-orm/core'
import Assessment from './Assessment'

export default class Comment extends Model {
  static entity = 'comments'

  static fields () {
    return {
      id: this.increment(),
      comment_id: this.number(0),
      assessment_id: this.number(0),
      text: this.string(''),
      assessment: this.belongsTo(Assessment, 'assessment_id')
    }
  }
}
