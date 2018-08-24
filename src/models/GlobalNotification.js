import { Model } from '@vuex-orm/core'

export default class GlobalNotification extends Model {
  static entity = 'globalnotifications'

  static fields () {
    return {
      id: this.increment(),
      visible: this.boolean(false),
      timeout: this.number(0),
      role: this.string(''),
      message: this.string('')
    }
  }
}
