import { Model } from '@vuex-orm/core'

export default class CountryIndicator extends Model {
  static entity = 'countryindicators'

  static fields () {
    return {
      id: this.increment(),
      indicatorId: this.number(0),
      countryCode: this.attr(null),
      indicatorName: this.string(''),
      indicatorValue: this.attr(null)
    }
  }
}
