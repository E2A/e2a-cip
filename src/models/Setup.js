import { Model } from '@vuex-orm/core'

export default class Setup extends Model {
  static entity = 'setup'

  static fields () {
    return {
      id: this.increment(),
      title: this.string(''),
      countryName: this.attr(null),
      countryCode: this.attr(null),
      role: this.attr(null),
      currencyCode: this.attr(null),
      currencyName: this.attr(null)
    }
  }
}
